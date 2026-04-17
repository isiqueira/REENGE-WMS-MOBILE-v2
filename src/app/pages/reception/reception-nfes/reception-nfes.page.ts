import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { ReceptionService } from '../reception.service';
import { TypeBarcode } from '../../../enums/enums';

export interface PrinterItem {
  AlternativesPrinters?: any;
  PrinterId?: number;
  Printer?: string;
  NfeId?: number;
  OrderId?: number;
}

@Component({
  selector: 'app-reception-nfes',
  templateUrl: 'reception-nfes.page.html',
  styleUrls: ['reception-nfes.page.scss'],
  standalone: false,
})
export class ReceptionNfesPage implements OnInit {
  public isearchBar: string = '';
  public nfesList: any[] = [];
  public initialList: any[] = [];
  public order: any = null;
  public AllowControlFiscal: boolean = false;

  public printerItem: PrinterItem = {};

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private basePage: BasePageService,
    private receptionService: ReceptionService,
  ) {
    const nav = this.router.getCurrentNavigation();
    this.order = nav?.extras?.state?.['order_object'] ?? history.state?.order_object;
    if (this.order) {
      this.AllowControlFiscal = this.order.OwnerAllowControlFiscal;
    }
  }

  ngOnInit(): void {}

  ionViewDidEnter(): void {
    this.isearchBar = '';
    this.getList();
  }

  initializeItems(): void {
    this.nfesList = this.initialList;
  }

  goBack(): void {
    this.navCtrl.navigateBack('/reception');
  }

  goPallets(item: any): void {
    const reception_object = { order: this.order, nfe: item };
    this.router.navigate(['/reception-pallets'], { state: { reception_object } });
  }

  getList(): void {
    if (!this.order) return;
    this.basePage.newLoading().then(() => {
      this.receptionService.getNfeForOrder({ orderId: this.order.Id }).subscribe({
        next: (data: any) => {
          this.basePage.dismissLoading().then(() => {
            this.initialList = data || [];
            this.initializeItems();
            if (!data || data.length === 0) {
              this.basePage.newToast('Nenhuma NFe em aberto para esta ordem.');
            }
          });
        },
        error: (error: any) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Erro', error?.Detail?.message || 'Erro ao carregar NFes.');
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
      this.nfesList = this.nfesList.filter((item) =>
        item.Grouper.toString().toLowerCase().includes(val.toLowerCase()),
      );
    }
  }

  conclude(item: any): void {
    this.basePage.newLoading().then(() => {
      this.receptionService
        .releaseNfeForStorage({ orderId: this.order.Id, nfeId: item.Id })
        .subscribe({
          next: (data: any) => {
            if (data.Error === true) {
              this.basePage.dismissLoading().then(() => {
                this.basePage.newAlert('Atenção', data.Message).then(() => {
                  this.getList();
                });
              });
            } else {
              this.basePage.dismissLoading().then(() => {
                this.basePage.newToastSuccess('NFe enviada para o armazenamento').then(() => {
                  this.getList();
                });
              });
            }
          },
          error: (error: any) => {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newAlert(
                'Erro',
                error?.Detail?.message || 'Erro ao armazenar NFe.',
              );
            });
          },
        });
    });
  }

  print(item: any): void {
    this.printerItem.NfeId = item.Id;
    this.printerItem.OrderId = this.order.Id;
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
    const selectedId = await this.basePage.newGetBarcode(
      TypeBarcode.ALL,
      this.printerItem,
    );
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
        .printNfe({
          orderId: this.printerItem.OrderId,
          nfeId: this.printerItem.NfeId,
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
              this.basePage.newAlert(
                'Erro',
                error?.Detail?.message || 'Erro ao imprimir.',
              );
            });
          },
        });
    });
  }
}
