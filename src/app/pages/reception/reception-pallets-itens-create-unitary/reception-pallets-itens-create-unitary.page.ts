import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { ReceptionService } from '../reception.service';
import { TypeBarcode } from '../../../enums/enums';

export interface PalletItemCreate {
  OrderId?: number;
  TaskListId?: number;
  NfeId?: number;
  SealParentId?: number;
  SealParentIdentifier?: string;
  LocationId?: number;
  Location?: string;
  Product?: any;
  ProductId?: number;
  ProductJson?: any;
  ProductName?: string;
  AlternativeProducts?: any;
  UrlImg?: string;
  ProductPresentationId?: number;
  ProductPresentation?: string;
  AlternativesPresentations?: any;
  ContainerId?: number;
  Quantity?: number;
  Grouper?: string;
  Identifier?: string;
  OrderType?: number;
}

export interface PrinterItem {
  Identifier?: string;
  AlternativesPrinters?: any;
  PrinterId?: number;
  Printer?: string;
}

@Component({
  selector: 'app-reception-pallets-itens-create-unitary',
  templateUrl: 'reception-pallets-itens-create-unitary.page.html',
  styleUrls: ['reception-pallets-itens-create-unitary.page.scss'],
  standalone: false,
})
export class ReceptionPalletsItensCreateUnitaryPage implements OnInit {
  @ViewChild('identifierInput') identifierInput!: ElementRef<HTMLIonInputElement>;

  public itemCreate: PalletItemCreate = {};
  public sealMaster: any = null;
  public hasFiscalControl: boolean = false;
  public totalCollected: number = 0;
  public validRegex: RegExp | null = null;
  public isReadonly: boolean = false;
  public printerItem: PrinterItem = {};
  public printChildrens: boolean = false;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private basePage: BasePageService,
    private receptionService: ReceptionService,
  ) {
    const nav = this.router.getCurrentNavigation();
    this.sealMaster = nav?.extras?.state?.['task_object'] ?? history.state?.task_object;
    if (this.sealMaster) {
      this.hasFiscalControl =
        this.sealMaster.receptionOrder?.order?.OwnerAllowControlFiscal ?? false;
      const regex = this.sealMaster.receptionOrder?.order?.OwnerOwnerTagRegex;
      if (regex != null && regex !== undefined) {
        this.validRegex = new RegExp(regex);
      }
    }
  }

  ngOnInit(): void {}

  ionViewDidEnter(): void {
    this.clearObj();
    this.instantiateCommon();
  }

  goBack(): void {
    this.navCtrl.navigateBack('/reception-pallets-itens');
  }

  clearObj(): void {
    this.itemCreate.OrderId = undefined;
    this.itemCreate.OrderType = undefined;
    this.itemCreate.TaskListId = undefined;
    this.itemCreate.NfeId = undefined;
    this.itemCreate.SealParentId = undefined;
    this.itemCreate.SealParentIdentifier = '';
    this.itemCreate.LocationId = undefined;
    this.itemCreate.Location = '';
    this.itemCreate.ProductId = undefined;
    this.itemCreate.Product = '';
    this.itemCreate.ProductName = '';
    this.itemCreate.AlternativeProducts = null;
    this.itemCreate.ProductPresentationId = undefined;
    this.itemCreate.ProductPresentation = '';
    this.itemCreate.AlternativesPresentations = null;
    this.itemCreate.UrlImg = '';
    this.itemCreate.ContainerId = undefined;
    this.itemCreate.Quantity = 0;
    this.itemCreate.Identifier = '';
    this.itemCreate.Grouper = '';
  }

  instantiateCommon(): void {
    if (!this.sealMaster) return;
    this.itemCreate.OrderId = this.sealMaster.receptionOrder.order.Id;
    this.itemCreate.OrderType = this.sealMaster.receptionOrder.order.OrderType;
    this.itemCreate.TaskListId = this.sealMaster.receptionOrder.order.TaskListId;
    this.itemCreate.NfeId = this.sealMaster.palletInfo.NfeId;
    this.itemCreate.LocationId = this.sealMaster.receptionOrder.order.LocationId;
    this.itemCreate.Location = this.sealMaster.receptionOrder.order.LocationAddress;
    this.itemCreate.SealParentId = this.sealMaster.palletInfo.Id;
    this.itemCreate.SealParentIdentifier = this.sealMaster.palletInfo.Identifier;
    this.itemCreate.ContainerId = this.sealMaster.palletInfo.ContainerId;
    this.itemCreate.Grouper = this.sealMaster.palletInfo.Grouper;
    this.itemCreate.ProductId = this.sealMaster.palletInfo.ProductId;
    this.itemCreate.ProductName = this.sealMaster.palletInfo.ProductDescription;
    this.itemCreate.ProductPresentationId = this.sealMaster.palletInfo.ProductPresentationId;
    this.itemCreate.ProductPresentation = this.sealMaster.palletInfo.ProductPresentationDescription;
    this.itemCreate.Quantity = 1;
    this.totalCollected = this.sealMaster.palletInfo.Quantity;
    this.clearByFiscal();
  }

  clearByFiscal(): void {
    if (this.hasFiscalControl) {
      this.itemCreate.Quantity = 0;
    } else {
      this.itemCreate.Quantity = 1;
      this.itemCreate.Identifier = '';
    }
    this.isReadonly = false;
    this.focusIdentifier();
  }

  focusIdentifier(): void {
    setTimeout(() => {
      if (this.identifierInput) {
        (this.identifierInput as any).setFocus?.();
      }
    }, 500);
  }

  onChangeIdentifier(): void {
    if (this.itemCreate.Identifier != null) {
      if (this.itemCreate.Identifier.toString().indexOf('*') !== -1) {
        this.isReadonly = true;
        this.itemCreate.Identifier = this.itemCreate.Identifier.replace('*', '');

        if (this.validRegex !== null && this.validRegex !== undefined) {
          if (this.validRegex.test(this.itemCreate.Identifier)) {
            this.savePalletItem();
          } else {
            this.basePage
              .newAlert('Erro', 'Erro na leitura ou etiqueta com um formato inválido!')
              .then(() => this.clearByFiscal());
          }
        } else {
          this.savePalletItem();
        }
      }
    }
  }

  checkBlur(): void {
    this.focusIdentifier();
  }

  savePalletItem(): void {
    this.basePage.newLoading().then(() => {
      this.receptionService
        .createSealProduct({
          orderId: this.itemCreate.OrderId,
          orderType: this.itemCreate.OrderType,
          taskListId: this.itemCreate.TaskListId,
          locationId: this.itemCreate.LocationId,
          nfeId: this.itemCreate.NfeId,
          grouper: this.itemCreate.Grouper,
          isMaster: false,
          hasChildren: false,
          productId: this.itemCreate.ProductId,
          productPresentationId: this.itemCreate.ProductPresentationId,
          quantity: this.itemCreate.Quantity,
          containerId: this.itemCreate.ContainerId,
          stockParam: {},
          parentId: this.itemCreate.SealParentId,
          identifier: this.itemCreate.Identifier,
        })
        .subscribe({
          next: (data: any) => {
            if (data.Error === true) {
              this.basePage.dismissLoading().then(() => {
                this.basePage.newAlert('Atenção', data.Message).then(() => {
                  this.clearByFiscal();
                });
              });
            } else {
              this.basePage.dismissLoading().then(() => {
                this.totalCollected++;
                this.basePage.newToastSuccess('Item criado com sucesso!').then(() => {
                  this.clearByFiscal();
                });
              });
            }
          },
          error: (error: any) => {
            this.basePage.dismissLoading().then(() => {
              this.basePage
                .newAlert('Erro', error?.Detail?.message || 'Erro ao criar item.')
                .then(() => this.clearByFiscal());
            });
          },
        });
    });
  }

  storage(): void {
    this.basePage.newLoading().then(() => {
      this.receptionService
        .releasePalletForStorage({ sealId: this.itemCreate.SealParentId })
        .subscribe({
          next: (data: any) => {
            if (data.Error === true) {
              this.basePage.dismissLoading().then(() => {
                this.basePage.newAlert('Atenção', data.Message);
              });
            } else {
              this.basePage.dismissLoading().then(() => {
                this.basePage.newToastSuccess('Palete enviado para o armazenamento').then(() => {
                  this.goBack();
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

  print(): void {
    this.printerItem.Identifier = this.itemCreate.SealParentIdentifier;
    this.printChildrens = false;
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
            this.basePage.newToast(error?.Detail?.message || 'Erro ao obter impressoras.');
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
        .printSeal({
          identifier: this.printerItem.Identifier,
          printerId: this.printerItem.PrinterId,
          printChildrens: this.printChildrens,
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
