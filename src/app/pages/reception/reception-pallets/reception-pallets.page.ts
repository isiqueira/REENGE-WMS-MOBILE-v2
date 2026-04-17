import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { ReceptionService } from '../reception.service';
import { TypeBarcode } from '../../../enums/enums';

export interface PrinterItem {
  Identifier?: string;
  AlternativesPrinters?: any;
  PrinterId?: number;
  Printer?: string;
}

@Component({
  selector: 'app-reception-pallets',
  templateUrl: 'reception-pallets.page.html',
  styleUrls: ['reception-pallets.page.scss'],
  standalone: false,
})
export class ReceptionPalletsPage implements OnInit {
  public isearchBar: string = '';
  public receptionPalletsList: any[] = [];
  public initialList: any[] = [];
  public receptionOrder: any = null;
  public receptionQuantity: number = 0;
  public AllowControlFiscal: boolean = false;
  public printerItem: PrinterItem = {};

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private basePage: BasePageService,
    private receptionService: ReceptionService,
  ) {
    const nav = this.router.getCurrentNavigation();
    this.receptionOrder =
      nav?.extras?.state?.['reception_object'] ?? history.state?.reception_object;
    if (this.receptionOrder) {
      this.AllowControlFiscal = this.receptionOrder.order?.OwnerAllowControlFiscal;
    }
  }

  ngOnInit(): void {}

  ionViewDidEnter(): void {
    this.isearchBar = '';
    this.receptionQuantity = 0;
    this.getList();
  }

  initializeItems(): void {
    this.receptionPalletsList = this.initialList;
  }

  goBack(): void {
    this.navCtrl.navigateBack('/reception-nfes');
  }

  goCreatePallet(): void {
    this.router.navigate(['/reception-pallets-create'], {
      state: { reception_object: this.receptionOrder },
    });
  }

  goPalletItens(item: any): void {
    if (item.HasChildren) {
      const task_object = { palletInfo: item, receptionOrder: this.receptionOrder };
      this.router.navigate(['/reception-pallets-itens'], { state: { task_object } });
    }
  }

  getList(): void {
    if (!this.receptionOrder) return;
    this.receptionQuantity = 0;
    this.basePage.newLoading().then(() => {
      this.receptionService
        .getPalletsByOrderNfe({
          orderId: this.receptionOrder.order.Id,
          nfeId: this.receptionOrder.nfe.Id,
        })
        .subscribe({
          next: (data: any) => {
            (data || []).forEach((element: any) => {
              this.receptionQuantity += parseFloat(element.Quantity);
              if (
                this.receptionOrder.nfe.Grouper === undefined ||
                this.receptionOrder.nfe.Grouper === null ||
                this.receptionOrder.nfe.Grouper === ''
              ) {
                this.receptionOrder.nfe.Grouper = element.Grouper;
              }
            });
            this.receptionQuantity = Number(this.receptionQuantity.toFixed(4));
            this.basePage.dismissLoading().then(() => {
              this.initialList = data || [];
              this.initializeItems();
            });
          },
          error: (error: any) => {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newAlert(
                'Erro',
                error?.Detail?.message || 'Erro ao carregar paletes.',
              );
            });
          },
        });
    });
  }

  getItems(event: any): void {
    this.initializeItems();
    let val: string = event.target.value || '';
    val = val.replace('*', '');
    if (val && val.trim().length > 3) {
      this.receptionPalletsList = this.receptionPalletsList.filter((item) =>
        item.Identifier.toString().toLowerCase().includes(val.toLowerCase()),
      );
    }
  }

  conclude(item: any): void {
    this.basePage.newLoading().then(() => {
      this.receptionService.releasePalletForStorage({ sealId: item.Id }).subscribe({
        next: (data: any) => {
          if (data.Error === true) {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newAlert('Atenção', data.Message).then(() => {
                this.getList();
              });
            });
          } else {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newToastSuccess('Palete enviado para o armazenamento').then(() => {
                this.getList();
              });
            });
          }
        },
        error: (error: any) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert(
              'Erro',
              error?.Detail?.message || 'Erro ao armazenar palete.',
            );
          });
        },
      });
    });
  }

  deletePallet(item: any): void {
    this.basePage.newLoading().then(() => {
      this.receptionService.deletePallet({ identifier: item.Identifier }).subscribe({
        next: (data: any) => {
          if (data.Error === true) {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newAlert('Atenção', data.Message);
            });
          } else {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newToastSuccess('Palete deletado').then(() => {
                this.getList();
              });
            });
          }
        },
        error: (error: any) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Erro', error?.Detail?.message || 'Erro ao deletar palete.');
          });
        },
      });
    });
  }

  print(item: any): void {
    this.printerItem.Identifier = item.Identifier;
    this.getPrinters();
  }

  getPrinters(): void {
    this.basePage.newLoading().then(() => {
      this.receptionService.getPrinters().subscribe({
        next: (data: any) => {
          if (!data || data.length === 0) {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newAlert('Atenção', 'Não existem impressoras.');
            });
          } else {
            this.printerItem.AlternativesPrinters = data;
            this.basePage.dismissLoading().then(() => {
              this.showPromptPrinter();
            });
          }
        },
        error: (error: any) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert(
              'Erro',
              error?.Detail?.message || 'Erro ao obter impressoras.',
            );
          });
        },
      });
    });
  }

  async showPromptPrinter(): Promise<void> {
    const selectedId = await this.basePage.newGetBarcode(TypeBarcode.ALL, this.printerItem);
    if (selectedId === null) return;

    const selectedPrinter = this.printerItem.AlternativesPrinters?.find(
      (p: any) => String(p.Id) === String(selectedId),
    );
    if (selectedPrinter) {
      this.printerItem.Printer = selectedPrinter.ConnectPrinterName;
      this.printerItem.PrinterId = selectedPrinter.Id;
    }

    await this.basePage.newToastSuccess(`Impressora: ${this.printerItem.Printer}`);

    this.basePage.newLoading().then(() => {
      this.receptionService
        .printSealMaster({
          identifier: this.printerItem.Identifier,
          printerId: this.printerItem.PrinterId,
          printChildrens: true,
        })
        .subscribe({
          next: (data: any) => {
            if (data.Error === true) {
              this.basePage.dismissLoading().then(() => {
                this.basePage.newAlert('Erro de Impressão', data.Message);
              });
            } else {
              this.basePage.dismissLoading().then(() => {
                this.basePage.newToastSuccess('Etiqueta impressa com sucesso');
              });
            }
          },
          error: (error: any) => {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newAlert('Erro', error?.Detail?.message || 'Erro ao imprimir.');
            });
          },
        });
    });
  }
}
