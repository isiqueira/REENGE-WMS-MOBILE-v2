import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { InitialChargeService } from '../initial-charge.service';
import { TypeBarcode } from '../../../enums/enums';

@Component({
  selector: 'app-initial-charge-pallets-create',
  templateUrl: './initial-charge-pallets-create.page.html',
  styleUrls: ['./initial-charge-pallets-create.page.scss'],
  standalone: false
})
export class InitialChargePalletsCreatePage implements OnInit {

  public palletCreate: any = {};
  public fieldsVisible: boolean = false;
  public initialChargeOrder: any = {};
  public allowMultipleCollect: boolean = false;
  public controlWeight: boolean = false;
  public isReadonly: boolean = false;
  public unitMeasurementAcronym: any = 'UN';
  public jsonForms: any[] = [];
  public inputs: any = {};
  public validationForm: any = {};

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private basePage: BasePageService,
    private initialChargeService: InitialChargeService
  ) {}

  ngOnInit() {
    this.initialChargeOrder = history.state['order_object'] || {};
    this.instantiateCommon();
  }

  clearObj() {
    this.palletCreate = {
      OrderId: null, LocationId: null, Location: '', IsMaster: false, HasChildren: false,
      AllowControlFiscal: false, ControlWeight: false, GrouperAfterImport: false,
      NfeId: null, Grouper: '', TaskListId: null, ProductId: null, Product: '',
      AlternativeProducts: null, ProductPresentationId: null, ProductPresentation: '',
      AlternativesPresentations: null, Quantity: 1, Bulk: 1, QuantityPallets: 1,
      Weight: 0, GrossWeight: 0, ContainerId: null, Container: '', AlternativesContainer: null
    };
  }

  instantiateCommon() {
    this.clearObj();
    this.palletCreate.OrderId = this.initialChargeOrder.order?.Id;
    this.palletCreate.LocationId = this.initialChargeOrder.order?.LocationId;
    this.palletCreate.Location = this.initialChargeOrder.order?.LocationAddress;
    this.palletCreate.AllowControlFiscal = this.initialChargeOrder.order?.OwnerAllowControlFiscal;
    this.palletCreate.TaskListId = this.initialChargeOrder.order?.TaskListId;
    this.palletCreate.NfeId = this.initialChargeOrder.nfe?.Id;
    this.palletCreate.Grouper = this.initialChargeOrder.nfe?.Grouper;
    this.palletCreate.GrouperAfterImport = this.initialChargeOrder.order?.OwnerGrouperAfterImport;
    this.isReadonly = !this.palletCreate.GrouperAfterImport;

    this.basePage.newLoading().then(() => {
      this.initialChargeService.getContainer().subscribe({
        next: (containers) => {
          if (!containers || containers.length === 0) {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newAlert('Atenção', 'Não existem Contenedores cadastrados.').then(() => this.goBack());
            });
            return;
          }
          this.palletCreate.AlternativesContainer = containers;
          this.initialChargeService.getOrderProducts({
            orderId: this.palletCreate.OrderId,
            nfeId: this.palletCreate.NfeId
          }).subscribe({
            next: (products) => {
              this.basePage.dismissLoading().then(() => {
                if (!products || products.length === 0) {
                  this.basePage.newAlert('Atenção', 'Não existem Produtos para esta ordem!').then(() => this.goBack());
                  return;
                }
                this.palletCreate.AlternativeProducts = products;
                this.showPromptLocal();
              });
            },
            error: (err) => {
              this.basePage.dismissLoading().then(() => {
                this.basePage.newAlert('Erro', err?.error?.Detail?.message || 'Erro ao carregar produtos.');
              });
            }
          });
        },
        error: (err) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Erro', err?.error?.Detail?.message || 'Erro ao carregar contenedores.');
          });
        }
      });
    });
  }

  goBack() {
    this.navCtrl.back();
  }

  async showPromptLocal() {
    const barcode = await this.basePage.newGetBarcode(TypeBarcode.Local);
    if (!barcode) { this.goBack(); return; }
    await this.basePage.newLoading();
    this.initialChargeService.getLocation({ address: barcode }).subscribe({
      next: (data) => {
        this.basePage.dismissLoading().then(() => {
          if (!data) {
            this.basePage.newAlert('Atenção', 'Código informado é Inválido.').then(() => this.showPromptLocal());
            return;
          }
          this.palletCreate.LocationId = data.Id;
          this.palletCreate.Location = data.Address;
          this.showPromptContainer();
        });
      },
      error: (err) => {
        this.basePage.dismissLoading().then(() => {
          this.basePage.newAlert('Erro', err?.error?.Detail?.message || 'Erro ao validar local.');
        });
      }
    });
  }

  async showPromptContainer() {
    const selected = await this.basePage.newGetBarcode(TypeBarcode.Container, this.palletCreate);
    if (!selected) { this.goBack(); return; }
    if (selected === null || selected === undefined) {
      await this.basePage.newToast('Container não identificado!');
      this.showPromptContainer();
      return;
    }
    this.palletCreate.AlternativesContainer.forEach((elem: any) => {
      if (elem.Id === selected) this.palletCreate.Container = elem.Description;
    });
    await this.basePage.newToastSuccess(`Container: ${this.palletCreate.Container}`);
    this.palletCreate.ContainerId = selected;
    this.palletCreate.IsMaster = true;
    if (this.palletCreate.AllowControlFiscal) {
      this.showPromptProduto();
    } else {
      this.showPromptProductOthers();
    }
  }

  async showPromptProduto() {
    const barcode = await this.basePage.newGetBarcode(TypeBarcode.PRODUCT, this.palletCreate);
    if (!barcode) { this.goBack(); return; }
    await this.basePage.newLoading();
    this.initialChargeService.getProduct({ code: barcode }).subscribe({
      next: (data) => {
        this.basePage.dismissLoading().then(() => {
          if (!data) {
            this.basePage.newAlert('Atenção', 'Código informado é Inválido.').then(() => this.showPromptProduto());
            return;
          }
          this.basePage.newToastSuccess(`Produto: ${data.Description}`).then(() => {
            this.palletCreate.Product = data;
            this.palletCreate.ProductId = data.Id;
            this.palletCreate.ProductName = data.Description;
            this.palletCreate.ControlWeight = data.ControlWeight;
            this.jsonForms = JSON.parse(data.StockParam || '[]');
            this.allowMultipleCollect = data.AllowMultipleCollect;
            this.controlWeight = data.ControlWeight;
            this.unitMeasurementAcronym = data.UnitMeasurementAcronym;
            this.getPresentations();
          });
        });
      },
      error: (err) => {
        this.basePage.dismissLoading().then(() => {
          this.basePage.newAlert('Erro', err?.error?.Detail?.message || 'Erro ao buscar produto.');
        });
      }
    });
  }

  async showPromptProductOthers() {
    const selected = await this.basePage.newGetBarcode(TypeBarcode.AlternativeProducts, this.palletCreate);
    if (!selected) {
      if (this.palletCreate.AllowControlFiscal) this.showPromptProduto();
      else this.goBack();
      return;
    }
    await this.basePage.newLoading();
    this.initialChargeService.getProduct({ code: selected }).subscribe({
      next: (data) => {
        this.basePage.dismissLoading().then(() => {
          if (!data) {
            this.basePage.newAlert('Atenção', 'Código informado é Inválido.').then(() => {
              if (this.palletCreate.AllowControlFiscal) this.showPromptProduto();
              else this.showPromptProductOthers();
            });
            return;
          }
          this.palletCreate.Product = data;
          this.palletCreate.ProductId = data.Id;
          this.palletCreate.ProductName = data.Description;
          this.palletCreate.ControlWeight = data.ControlWeight;
          this.jsonForms = JSON.parse(data.StockParam || '[]');
          this.allowMultipleCollect = data.AllowMultipleCollect;
          this.controlWeight = data.ControlWeight;
          this.unitMeasurementAcronym = data.UnitMeasurementAcronym;
          this.basePage.newToastSuccess(`Produto: ${this.palletCreate.ProductName}`).then(() => {
            this.getPresentations();
          });
        });
      },
      error: (err) => {
        this.basePage.dismissLoading().then(() => {
          this.basePage.newAlert('Erro', err?.error?.Detail?.message || 'Erro ao buscar produto.');
        });
      }
    });
  }

  getPresentations() {
    this.basePage.newLoading().then(() => {
      this.initialChargeService.getPresentations({ productId: this.palletCreate.ProductId }).subscribe({
        next: (data) => {
          this.basePage.dismissLoading().then(() => {
            if (!data || data.length === 0) {
              this.basePage.newAlert('Erro', 'Erro ao obter apresentações do produto!').then(() => {
                if (this.palletCreate.AllowControlFiscal) this.showPromptProduto();
                else this.showPromptProductOthers();
              });
              return;
            }
            this.palletCreate.AlternativesPresentations = data;
            this.showPromptPresentation();
          });
        },
        error: (err) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Erro', err?.error?.Detail?.message || 'Erro ao obter apresentações.');
          });
        }
      });
    });
  }

  async showPromptPresentation() {
    const selected = await this.basePage.newGetBarcode(TypeBarcode.ProductPresentation, this.palletCreate);
    if (!selected) {
      if (this.palletCreate.AllowControlFiscal) this.showPromptProduto();
      else this.showPromptProductOthers();
      return;
    }
    if (selected === null || selected === undefined) {
      await this.basePage.newToast('Apresentação não identificada!');
      this.showPromptPresentation();
      return;
    }
    this.palletCreate.AlternativesPresentations.forEach((elem: any) => {
      if (elem.Id === selected) {
        this.palletCreate.ProductPresentation = elem.Description;
        this.palletCreate.Quantity = elem.BaseUnitQuantity;
      }
    });
    await this.basePage.newToastSuccess(`Apresentação: ${this.palletCreate.ProductPresentation}`);
    this.palletCreate.ProductPresentationId = selected;
    if (this.allowMultipleCollect) {
      this.palletCreate.HasChildren = true;
      this.savePallet();
    } else {
      this.palletCreate.HasChildren = false;
      this.fieldsVisible = true;
    }
  }

  copyQuantity() {
    const quantity = this.palletCreate.Quantity ?? 1;
    this.palletCreate.Weight = quantity;
    this.palletCreate.GrossWeight = quantity;
    this.basePage.newToastSuccess('Valor copiado!');
  }

  async checkValidate() {
    // Validate dynamic fields
    for (const elem of (this.jsonForms || [])) {
      const val = this.inputs[elem.Id];
      if (elem.Required && (typeof val === 'undefined' || val === '' || val === 0)) {
        await this.basePage.newToast(`Campo ${elem.DisplayText} deve ser preenchido!`);
        return;
      }
    }
    await this.basePage.newToastSuccess('Formulário validado com sucesso! Salvando...');
    this.fieldsVisible = false;
    this.showConfirmSave();
  }

  async showConfirmSave() {
    const quantity = this.palletCreate.Quantity ?? 1;
    const quantityPallets = this.palletCreate.QuantityPallets ?? 1;
    const weight = this.palletCreate.Weight ?? 1;
    let message = '';
    if (this.controlWeight) {
      message = `Confirma a criação de <b>${quantityPallets}</b> Palete(s) pesando <b>${weight}</b> cada? Total: <b>${quantityPallets * weight}</b>`;
    } else {
      message = `Confirma a criação de <b>${quantityPallets}</b> Palete(s) com <b>${quantity}(${this.unitMeasurementAcronym})</b> cada? Total: <b>${quantityPallets * quantity}</b>`;
    }
    const confirmed = await this.basePage.newConfirm('Confirmar criação?', message);
    if (confirmed) {
      this.savePallet();
    } else {
      this.fieldsVisible = true;
    }
  }

  savePallet() {
    this.basePage.newLoading().then(() => {
      if (this.allowMultipleCollect) {
        this.initialChargeService.createPallet({
          orderId: this.palletCreate.OrderId,
          taskListId: this.palletCreate.TaskListId,
          locationId: this.palletCreate.LocationId,
          nfeId: this.palletCreate.NfeId,
          grouper: this.palletCreate.Grouper,
          isMaster: this.palletCreate.IsMaster,
          hasChildren: this.palletCreate.HasChildren,
          productId: this.palletCreate.ProductId ?? 0,
          productPresentationId: this.palletCreate.ProductPresentationId ?? 0,
          quantity: this.palletCreate.Quantity ?? 0,
          containerId: this.palletCreate.ContainerId,
          stockParam: JSON.stringify(this.inputs),
          parentId: 0, identifier: ''
        }).subscribe({
          next: (data) => {
            this.basePage.dismissLoading().then(() => {
              if (data?.Error) {
                this.clearObj(); this.fieldsVisible = false;
                this.basePage.newAlert('Erro', data.Message).then(() => this.goBack());
              } else {
                this.basePage.newToastSuccess('Palete criado com sucesso!').then(() => {
                  this.clearObj(); this.fieldsVisible = false;
                  const returnPallet = data?.Data ? JSON.parse(data.Data) : null;
                  if (returnPallet?.HasChildren) {
                    this.goPalletItens(returnPallet);
                  } else {
                    this.goBack();
                  }
                });
              }
            });
          },
          error: (err) => {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newAlert('Erro', err?.error?.Detail?.message || 'Erro ao criar palete.');
            });
          }
        });
      } else {
        this.initialChargeService.createPalletBySampling({
          orderId: this.palletCreate.OrderId,
          taskListId: this.palletCreate.TaskListId,
          locationId: this.palletCreate.LocationId,
          nfeId: this.palletCreate.NfeId,
          grouper: this.palletCreate.Grouper,
          isMaster: this.palletCreate.IsMaster,
          hasChildren: (this.palletCreate.Bulk ?? 1) > 1,
          productId: this.palletCreate.ProductId ?? 0,
          productPresentationId: this.palletCreate.ProductPresentationId ?? 0,
          quantity: this.palletCreate.Quantity ?? 1,
          bulk: this.palletCreate.Bulk ?? 1,
          quantityPallets: this.palletCreate.QuantityPallets ?? 1,
          containerId: this.palletCreate.ContainerId,
          stockParam: JSON.stringify(this.inputs),
          parentId: 0, identifier: '',
          weight: this.palletCreate.Weight ?? 1,
          grossWeight: this.palletCreate.GrossWeight ?? 1
        }).subscribe({
          next: (data) => {
            this.basePage.dismissLoading().then(() => {
              if (data?.Error) {
                this.clearObj(); this.fieldsVisible = false;
                this.basePage.newAlert('Erro', data.Message).then(() => this.goBack());
              } else {
                this.basePage.newToastSuccess('Palete criado com sucesso!').then(() => {
                  this.clearObj(); this.fieldsVisible = false;
                  this.goBack();
                });
              }
            });
          },
          error: (err) => {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newAlert('Erro', err?.error?.Detail?.message || 'Erro ao criar palete.');
            });
          }
        });
      }
    });
  }

  goPalletItens(pallet: any) {
    const taskObject = { palletInfo: pallet, initialChargeOrder: this.initialChargeOrder };
    this.router.navigate(['/initial-charge-pallets-itens'], { state: { task_object: taskObject } });
  }
}
