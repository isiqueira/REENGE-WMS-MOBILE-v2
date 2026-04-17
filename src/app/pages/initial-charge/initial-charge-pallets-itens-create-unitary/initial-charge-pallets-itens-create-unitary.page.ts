import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { InitialChargeService } from '../initial-charge.service';
import { TypeBarcode } from '../../../enums/enums';
import { BarcodeFocusService } from '../../../core/barcode-focus.service';

@Component({
  selector: 'app-initial-charge-pallets-itens-create-unitary',
  templateUrl: './initial-charge-pallets-itens-create-unitary.page.html',
  styleUrls: ['./initial-charge-pallets-itens-create-unitary.page.scss'],
  standalone: false
})
export class InitialChargePalletsItensCreateUnitaryPage implements OnInit {

  @ViewChild('identifierInput') identifierInputRef!: ElementRef;

  public itemCreate: any = {};
  public sealMaster: any = {};
  public hasFiscalControl: boolean = false;
  public isReadonly: boolean = false;
  public totalCollected: number = 0;
  public validRegex: any = null;
  public printerItem: any = {};
  public printChildrens: boolean = false;

  constructor(
    private navCtrl: NavController,
    private basePage: BasePageService,
    private initialChargeService: InitialChargeService,
    private barcodeFocusService: BarcodeFocusService
  ) {}

  ngOnInit() {
    this.sealMaster = history.state['task_object'] || {};
    this.hasFiscalControl = this.sealMaster.initialChargeOrder?.order?.OwnerAllowControlFiscal;
    const regex = this.sealMaster.initialChargeOrder?.order?.OwnerOwnerTagRegex;
    if (regex) this.validRegex = new RegExp(regex);
  }

  ionViewDidEnter() {
    this.clearObj();
    this.instantiateCommon();
  }

  ionViewDidLoad() {
    this.focusFire();
  }

  focusFire() {
    setTimeout(() => {
      if (this.identifierInputRef?.nativeElement) {
        this.identifierInputRef.nativeElement.focus();
      }
    }, 500);
  }

  clearObj() {
    this.itemCreate = {
      OrderId: null, OrderType: null, TaskListId: null, NfeId: null,
      SealParentId: null, SealParentIdentifier: '', LocationId: null, Location: '',
      ProductId: null, Product: '', ProductName: '', AlternativeProducts: null,
      ProductPresentationId: null, ProductPresentation: '', AlternativesPresentations: null,
      UrlImg: '', ContainerId: null, Quantity: 0, Identifier: '', Grouper: ''
    };
  }

  instantiateCommon() {
    this.itemCreate.OrderId = this.sealMaster.initialChargeOrder?.order?.Id;
    this.itemCreate.OrderType = this.sealMaster.initialChargeOrder?.order?.OrderType;
    this.itemCreate.TaskListId = this.sealMaster.initialChargeOrder?.order?.TaskListId;
    this.itemCreate.NfeId = this.sealMaster.palletInfo?.NfeId;
    this.itemCreate.LocationId = this.sealMaster.palletInfo?.LocationId;
    this.itemCreate.Location = this.sealMaster.palletInfo?.LocationAddress;
    this.itemCreate.SealParentId = this.sealMaster.palletInfo?.Id;
    this.itemCreate.SealParentIdentifier = this.sealMaster.palletInfo?.Identifier;
    this.itemCreate.ContainerId = this.sealMaster.palletInfo?.ContainerId;
    this.itemCreate.Grouper = this.sealMaster.palletInfo?.Grouper;
    this.itemCreate.ProductId = this.sealMaster.palletInfo?.ProductId;
    this.itemCreate.ProductName = this.sealMaster.palletInfo?.ProductDescription;
    this.itemCreate.ProductPresentationId = this.sealMaster.palletInfo?.ProductPresentationId;
    this.itemCreate.ProductPresentation = this.sealMaster.palletInfo?.ProductPresentationDescription;
    this.totalCollected = this.sealMaster.palletInfo?.Quantity ?? 0;
    this.clearByFiscal();
  }

  clearByFiscal() {
    this.itemCreate.Quantity = this.hasFiscalControl ? 0 : 1;
    this.itemCreate.Identifier = '';
    this.isReadonly = false;
    this.focusFire();
  }

  onChangeIdentifier() {
    if (this.itemCreate.Identifier != null) {
      if (this.itemCreate.Identifier.toString().indexOf('*') !== -1) {
        this.isReadonly = true;
        this.itemCreate.Identifier = this.itemCreate.Identifier.replace('*', '');
        if (this.validRegex) {
          if (this.validRegex.test(this.itemCreate.Identifier)) {
            this.savePalletItem();
          } else {
            this.basePage.newAlert('Erro', 'Erro na leitura ou etiqueta com um formato inválido!').then(() => {
              this.clearByFiscal();
            });
          }
        } else {
          this.savePalletItem();
        }
      }
    }
  }

  checkBlur() {
    this.focusFire();
  }

  savePalletItem() {
    this.basePage.newLoading().then(() => {
      this.initialChargeService.createSealProduct({
        orderId: this.itemCreate.OrderId,
        orderType: this.itemCreate.OrderType,
        taskListId: this.itemCreate.TaskListId,
        locationId: this.itemCreate.LocationId,
        nfeId: this.itemCreate.NfeId,
        grouper: this.itemCreate.Grouper,
        isMaster: false, hasChildren: false,
        productId: this.itemCreate.ProductId,
        productPresentationId: this.itemCreate.ProductPresentationId,
        quantity: this.itemCreate.Quantity,
        containerId: this.itemCreate.ContainerId,
        stockParam: {},
        parentId: this.itemCreate.SealParentId,
        identifier: this.itemCreate.Identifier
      }).subscribe({
        next: (data) => {
          this.basePage.dismissLoading().then(() => {
            if (data?.Error) {
              this.basePage.newAlert('Erro', data.Message).then(() => this.clearByFiscal());
            } else {
              this.totalCollected++;
              this.basePage.newToastSuccess('Item criado com sucesso!').then(() => this.clearByFiscal());
            }
          });
        },
        error: (err) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Erro', err?.error?.Detail?.message || 'Erro ao criar item.').then(() => this.clearByFiscal());
          });
        }
      });
    });
  }

  async print() {
    this.printerItem.Identifier = this.itemCreate.SealParentIdentifier;
    this.printChildrens = false;
    await this.basePage.newLoading();
    this.initialChargeService.getPrinters().subscribe({
      next: async (printers) => {
        await this.basePage.dismissLoading();
        if (!printers || printers.length === 0) {
          this.basePage.newAlert('Atenção', 'Não existem impressoras.');
          return;
        }
        this.printerItem.AlternativesPrinters = printers;
        const selected = await this.basePage.newGetBarcode(TypeBarcode.Printer, this.printerItem);
        if (!selected) return;
        printers.forEach((elem: any) => {
          if (elem.Id === selected) this.printerItem.Printer = elem.ConnectPrinterName;
        });
        await this.basePage.newToastSuccess(`Impressora: ${this.printerItem.Printer}`);
        this.printerItem.PrinterId = selected;
        await this.basePage.newLoading();
        this.initialChargeService.printSeal({
          identifier: this.printerItem.Identifier,
          printerId: this.printerItem.PrinterId,
          printChildrens: this.printChildrens
        }).subscribe({
          next: (data) => {
            this.basePage.dismissLoading().then(() => {
              if (data?.Error) {
                this.basePage.newAlert('Erro', data.Message);
              } else {
                this.basePage.newToastSuccess('Etiqueta impressa com sucesso!');
              }
            });
          },
          error: (err) => {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newAlert('Erro', err?.error?.Detail?.message || 'Erro ao imprimir.');
            });
          }
        });
      },
      error: (err) => {
        this.basePage.dismissLoading().then(() => {
          this.basePage.newAlert('Erro', err?.error?.Detail?.message || 'Erro ao carregar impressoras.');
        });
      }
    });
  }
}
