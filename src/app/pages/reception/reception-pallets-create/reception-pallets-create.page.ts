import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { ReceptionService } from '../reception.service';
import { TypeBarcode } from '../../../enums/enums';

export interface PalletCreate {
  OrderId?: number;
  TaskListId?: number;
  NfeId?: number;
  Grouper?: string;
  LocationId?: number;
  Location?: string;
  AllowControlFiscal?: boolean;
  ControlWeight?: boolean;
  GrouperAfterImport?: boolean;
  IsMaster?: boolean;
  HasChildren?: boolean;
  Method?: string;
  ProductId?: number;
  Product?: any;
  ProductName?: string;
  AlternativeProducts?: any;
  ProductPresentationId?: number;
  ProductPresentation?: string;
  AlternativesPresentations?: any;
  Quantity?: number;
  Bulk?: number;
  QuantityPallets?: number;
  Weight?: number;
  GrossWeight?: number;
  ContainerId?: number;
  Container?: string;
  AlternativesContainer?: any;
  Vehicle?: string;
  VehicleId?: number;
  AlternativesVehicles?: any;
  VehicleTruck?: string;
  VehicleTruckId?: number;
  AlternativesVehicleTrucks?: any;
  Identifier?: string;
  ExpiredDate?: string | null;
}

export interface ValidationJsonForm {
  Error?: boolean;
  Message?: string;
}

@Component({
  selector: 'app-reception-pallets-create',
  templateUrl: 'reception-pallets-create.page.html',
  styleUrls: ['reception-pallets-create.page.scss'],
  standalone: false,
})
export class ReceptionPalletsCreatePage implements OnInit {
  public palletCreate: PalletCreate = {};
  public fieldsVisible: boolean = false;
  public receptionOrder: any = null;
  public isMaster: boolean = false;
  public allowPackingList: boolean = false;
  public controlWeight: boolean = false;
  public isReadonly: boolean = false;
  public unitMeasurementAcronym: any = 'UN';
  public hasPacking: boolean = false;
  public jsonForms: any[] = [];
  public inputs: any = {};
  public validationForm: ValidationJsonForm = {};

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private basePage: BasePageService,
    private receptionService: ReceptionService,
  ) {
    const nav = this.router.getCurrentNavigation();
    this.receptionOrder =
      nav?.extras?.state?.['reception_object'] ?? history.state?.reception_object;
  }

  ngOnInit(): void {
    localStorage.setItem('hideKeyboard-sessionWms', 'true');
    this.instantiateCommon();
  }

  ionViewDidLeave(): void {
    localStorage.setItem('hideKeyboard-sessionWms', 'true');
  }

  goBack(): void {
    localStorage.setItem('hideKeyboard-sessionWms', 'true');
    this.navCtrl.navigateBack('/reception-pallets');
  }

  clearObj(): void {
    this.palletCreate.OrderId = undefined;
    this.palletCreate.LocationId = undefined;
    this.palletCreate.Location = '';
    this.palletCreate.IsMaster = false;
    this.palletCreate.HasChildren = false;
    this.palletCreate.AllowControlFiscal = false;
    this.palletCreate.ControlWeight = false;
    this.palletCreate.GrouperAfterImport = false;
    this.palletCreate.NfeId = undefined;
    this.palletCreate.Grouper = '';
    this.palletCreate.TaskListId = undefined;
    this.palletCreate.ProductId = undefined;
    this.palletCreate.Product = '';
    this.palletCreate.AlternativeProducts = null;
    this.palletCreate.ProductPresentationId = undefined;
    this.palletCreate.ProductPresentation = '';
    this.palletCreate.AlternativesPresentations = null;
    this.palletCreate.Quantity = 1;
    this.palletCreate.Bulk = 1;
    this.palletCreate.QuantityPallets = 1;
    this.palletCreate.Weight = 0;
    this.palletCreate.GrossWeight = 0;
    this.palletCreate.ContainerId = undefined;
    this.palletCreate.Container = '';
    this.palletCreate.AlternativesContainer = null;
    this.palletCreate.VehicleId = undefined;
    this.palletCreate.Vehicle = '';
    this.palletCreate.AlternativesVehicles = null;
    this.palletCreate.VehicleTruckId = undefined;
    this.palletCreate.VehicleTruck = '';
    this.palletCreate.AlternativesVehicleTrucks = null;
    this.palletCreate.Identifier = '';
    this.palletCreate.ExpiredDate = null;
    this.allowPackingList = false;
    this.isMaster = false;
  }

  instantiateCommon(): void {
    this.clearObj();
    if (!this.receptionOrder) return;
    this.palletCreate.OrderId = this.receptionOrder.order.Id;
    this.palletCreate.LocationId = this.receptionOrder.order.LocationId;
    this.palletCreate.Location = this.receptionOrder.order.LocationAddress;
    this.palletCreate.AllowControlFiscal = this.receptionOrder.order.OwnerAllowControlFiscal;
    this.palletCreate.TaskListId = this.receptionOrder.order.TaskListId;
    this.palletCreate.NfeId = this.receptionOrder.nfe.Id;
    this.palletCreate.Grouper = this.receptionOrder.nfe.Grouper;
    this.palletCreate.GrouperAfterImport = this.receptionOrder.order.OwnerGrouperAfterImport;
    this.palletCreate.Identifier = '';
    this.palletCreate.ExpiredDate = null;
    this.allowPackingList = this.receptionOrder.order.OwnerAllowPackingList;
    this.isReadonly = !this.palletCreate.GrouperAfterImport;
    this.getProducts();
  }

  goPalletItens(item: any): void {
    const task_object = { palletInfo: item, receptionOrder: this.receptionOrder };
    this.router.navigate(['/reception-pallets-itens'], { state: { task_object } });
  }

  // ─── Data loaders ─────────────────────────────────────────────────────────────

  getProducts(): void {
    this.basePage.newLoading().then(() => {
      this.receptionService
        .getOrderProducts({
          orderId: this.palletCreate.OrderId,
          nfeId: this.palletCreate.NfeId,
        })
        .subscribe({
          next: (data: any) => {
            if (!data || data.length === 0) {
              this.basePage.dismissLoading().then(() => {
                this.basePage
                  .newAlert('Atenção', 'Não existem Produtos para esta ordem!')
                  .then(() => this.goBack());
              });
            } else {
              this.basePage.dismissLoading().then(() => {
                this.palletCreate.AlternativeProducts = data;
                this.getVehicles();
              });
            }
          },
          error: (error: any) => {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newAlert(
                'Erro',
                error?.Detail?.message || 'Erro ao obter produtos.',
              );
            });
          },
        });
    });
  }

  getVehicles(): void {
    this.basePage.newLoading().then(() => {
      this.receptionService
        .getVehicles({ orderId: this.palletCreate.OrderId })
        .subscribe({
          next: (data: any) => {
            if (!data || data.length === 0) {
              this.basePage.dismissLoading().then(() => {
                this.basePage
                  .newAlert('Erro', 'Erro ao obter veiculos!')
                  .then(() => {});
              });
            } else {
              this.palletCreate.AlternativesVehicles = data;
              if (data.length === 1) {
                this.palletCreate.Vehicle = data[0].VehicleNumber;
                this.palletCreate.VehicleId = data[0].Id;
                this.basePage.dismissLoading().then(() => this.getVehicleTrucks());
              } else {
                this.basePage.dismissLoading().then(() => this.showPromptVehicles());
              }
            }
          },
          error: (error: any) => {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newAlert('Erro', error?.Detail?.message || 'Erro ao obter veículos.');
            });
          },
        });
    });
  }

  getVehicleTrucks(): void {
    this.basePage.newLoading().then(() => {
      this.receptionService
        .getVehicleTruck({ orderVehicleId: this.palletCreate.VehicleId })
        .subscribe({
          next: (data: any) => {
            if (!data || data.length === 0) {
              this.basePage.dismissLoading().then(() => {
                this.basePage
                  .newAlert('Erro', 'Erro ao obter carretas!')
                  .then(() => {});
              });
            } else {
              this.palletCreate.AlternativesVehicleTrucks = data;
              if (data.length === 1) {
                this.palletCreate.VehicleTruck = data[0].TruckNumber;
                this.palletCreate.VehicleTruckId = data[0].Id;
                this.basePage.dismissLoading().then(() => this.showPromptLocal());
              } else {
                this.basePage.dismissLoading().then(() => this.showPromptVehicleTrucks());
              }
            }
          },
          error: (error: any) => {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newAlert('Erro', error?.Detail?.message || 'Erro ao obter carretas.');
            });
          },
        });
    });
  }

  getPresentations(): void {
    this.basePage.newLoading().then(() => {
      this.receptionService
        .getPresentations({ productId: this.palletCreate.ProductId })
        .subscribe({
          next: (data: any) => {
            if (!data || data.length === 0) {
              this.basePage.dismissLoading().then(() => {
                this.basePage
                  .newAlert('Erro', 'Erro ao obter apresentações do produto!')
                  .then(() => this.showPromptProductOthers());
              });
            } else {
              this.palletCreate.AlternativesPresentations = data;
              this.basePage.dismissLoading().then(() => this.showPromptPresentation());
            }
          },
          error: (error: any) => {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newAlert(
                'Erro',
                error?.Detail?.message || 'Erro ao obter apresentações.',
              );
            });
          },
        });
    });
  }

  getContainerPresentations(): void {
    this.basePage.newLoading().then(() => {
      this.receptionService
        .getContainerPresentations({
          productPresentationId: this.palletCreate.ProductPresentationId,
        })
        .subscribe({
          next: (data: any) => {
            if (!data || data.length === 0) {
              this.basePage.dismissLoading().then(() => {
                this.basePage
                  .newAlert(
                    'Atenção',
                    'Não existem Contenedores cadastrados para esta apresentação do produto.',
                  )
                  .then(() => this.showPromptPresentation());
              });
            } else {
              this.palletCreate.AlternativesContainer = data;
              this.basePage.dismissLoading().then(() => this.showPromptContainer());
            }
          },
          error: (error: any) => {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newAlert(
                'Erro',
                error?.Detail?.message || 'Erro ao obter contenedores.',
              );
            });
          },
        });
    });
  }

  // ─── Prompts ──────────────────────────────────────────────────────────────────

  async showPromptVehicles(): Promise<void> {
    const selectedId = await this.basePage.newGetBarcode(
      TypeBarcode.ALL,
      this.palletCreate,
    );
    if (selectedId === null) {
      this.goBack();
      return;
    }
    const found = this.palletCreate.AlternativesVehicles?.find(
      (e: any) => String(e.Id) === String(selectedId),
    );
    if (!found) {
      await this.basePage.newToast('Veículo não identificado!');
      this.showPromptVehicles();
      return;
    }
    this.palletCreate.Vehicle = found.Plate;
    this.palletCreate.VehicleId = found.Id;
    await this.basePage.newToastSuccess(`Veículo: ${this.palletCreate.Vehicle}`);
    this.getVehicleTrucks();
  }

  async showPromptVehicleTrucks(): Promise<void> {
    const selectedId = await this.basePage.newGetBarcode(
      TypeBarcode.ALL,
      this.palletCreate,
    );
    if (selectedId === null) {
      this.showPromptVehicles();
      return;
    }
    const found = this.palletCreate.AlternativesVehicleTrucks?.find(
      (e: any) => String(e.Id) === String(selectedId),
    );
    if (!found) {
      await this.basePage.newToast('Carreta não identificada!');
      this.showPromptVehicleTrucks();
      return;
    }
    this.palletCreate.VehicleTruck = found.Plate;
    this.palletCreate.VehicleTruckId = found.Id;
    await this.basePage.newToastSuccess(`Carreta: ${this.palletCreate.VehicleTruck}`);
    this.showPromptLocal();
  }

  async showPromptLocal(): Promise<void> {
    const barcode = await this.basePage.newGetBarcode(TypeBarcode.LOCATION, {
      Address: this.palletCreate.Location,
    });
    if (barcode === null) {
      this.goBack();
      return;
    }
    this.basePage.newLoading().then(() => {
      this.receptionService.getLocation({ address: barcode }).subscribe({
        next: (data: any) => {
          if (!data) {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newAlert('Atenção', 'Código informado é Inválido.').then(() => {
                this.showPromptLocal();
              });
            });
          } else {
            this.basePage.dismissLoading().then(() => {
              this.palletCreate.LocationId = data.Id;
              this.palletCreate.Location = data.Address;
              this.showPromptProductOthers();
            });
          }
        },
        error: (error: any) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Erro', error?.Detail?.message || 'Erro ao obter local.');
          });
        },
      });
    });
  }

  async showPromptContainer(): Promise<void> {
    const selectedId = await this.basePage.newGetBarcode(
      TypeBarcode.CONTAINER,
      this.palletCreate,
    );
    if (selectedId === null) {
      this.goBack();
      return;
    }
    const found = this.palletCreate.AlternativesContainer?.find(
      (e: any) => String(e.Id) === String(selectedId),
    );
    if (!found) {
      await this.basePage.newToast('Container não identificado!');
      this.showPromptContainer();
      return;
    }
    this.palletCreate.Container = found.Description || found.Container;
    this.palletCreate.ContainerId = found.ContainerId;
    await this.basePage.newToast(`Container: ${this.palletCreate.Container}`);

    if (!this.isMaster) {
      this.palletCreate.HasChildren = true;
      this.savePallet();
    } else {
      this.basePage.newLoading().then(() => {
        this.receptionService
          .verifyHasPacking({
            orderId: this.palletCreate.OrderId,
            nfeId: this.palletCreate.NfeId,
            productId: this.palletCreate.ProductId,
          })
          .subscribe({
            next: (data: any) => {
              if (!data || data.length === 0) {
                this.basePage.dismissLoading().then(() => {
                  this.basePage
                    .newAlert('Erro', 'Erro ao verificar romaneio!')
                    .then(() => this.showPromptProductOthers());
                });
              } else if (data.Error === true) {
                this.basePage.dismissLoading().then(() => {
                  // No packing list — show form fields
                  this.palletCreate.HasChildren = false;
                  this.hasPacking = false;
                  localStorage.setItem(
                    'hideKeyboard-sessionWms',
                    this.isReadonly ? 'true' : 'false',
                  );
                  this.fieldsVisible = true;
                });
              } else {
                this.basePage.dismissLoading().then(() => {
                  this.hasPacking = true;
                  this.showPromptIdentifier();
                });
              }
            },
            error: (error: any) => {
              this.basePage.dismissLoading().then(() => {
                this.basePage.newAlert(
                  'Erro',
                  error?.Detail?.message || 'Erro ao verificar romaneio.',
                );
              });
            },
          });
      });
    }
  }

  async showPromptProductOthers(): Promise<void> {
    const selectedId = await this.basePage.newGetBarcode(
      TypeBarcode.PRODUCT,
      this.palletCreate,
    );
    if (selectedId === null) {
      this.goBack();
      return;
    }
    this.basePage.newLoading().then(() => {
      this.receptionService.getProduct({ code: selectedId }).subscribe({
        next: (data: any) => {
          if (!data) {
            this.basePage.dismissLoading().then(() => {
              this.basePage
                .newAlert('Atenção', 'Código informado é Inválido.')
                .then(() => this.showPromptProductOthers());
            });
          } else {
            this.palletCreate.Product = data;
            this.palletCreate.ProductId = data.Id;
            this.palletCreate.ProductName = data.Description;
            this.palletCreate.ControlWeight = data.ControlWeight;
            this.jsonForms = data.StockParam ? JSON.parse(data.StockParam) : [];
            this.controlWeight = data.ControlWeight;
            this.unitMeasurementAcronym = data.UnitMeasurementAcronym;
            this.basePage.dismissLoading().then(() => {
              this.basePage
                .newToastSuccess(`Produto: ${this.palletCreate.ProductName}`)
                .then(() => this.getPresentations());
            });
          }
        },
        error: (error: any) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Erro', error?.Detail?.message || 'Erro ao obter produto.');
          });
        },
      });
    });
  }

  async showPromptPresentation(): Promise<void> {
    const selectedId = await this.basePage.newGetBarcode(
      TypeBarcode.ALL,
      this.palletCreate,
    );
    if (selectedId === null) {
      this.showPromptProductOthers();
      return;
    }
    const found = this.palletCreate.AlternativesPresentations?.find(
      (e: any) => String(e.Id) === String(selectedId),
    );
    if (!found) {
      await this.basePage.newToast('Apresentação não identificada!');
      this.showPromptPresentation();
      return;
    }
    this.palletCreate.ProductPresentationId = found.Id;
    this.palletCreate.ProductPresentation = found.Description;
    this.palletCreate.Quantity = found.BaseUnitQuantity;
    this.isMaster = found.IsMaster;
    await this.basePage.newToastSuccess(`Apresentação: ${this.palletCreate.ProductPresentation}`);
    this.getContainerPresentations();
  }

  async showPromptIdentifier(): Promise<void> {
    const barcode = await this.basePage.newGetBarcode(TypeBarcode.SEAL);
    if (barcode === null) {
      this.goBack();
      return;
    }
    this.basePage.newLoading().then(() => {
      this.receptionService
        .verifyPackingIdentifier({
          orderId: this.palletCreate.OrderId,
          nfeId: this.palletCreate.NfeId,
          productId: this.palletCreate.ProductId,
          identifier: barcode,
        })
        .subscribe({
          next: (data: any) => {
            if (!data) {
              this.basePage.dismissLoading().then(() => {
                this.basePage
                  .newAlert('Atenção', 'Código informado é Inválido.')
                  .then(() => this.showPromptIdentifier());
              });
            } else if (data.Error === true) {
              this.basePage.dismissLoading().then(() => {
                this.basePage
                  .newAlert('Atenção', data.Message)
                  .then(() => this.showPromptIdentifier());
              });
            } else {
              this.basePage.dismissLoading().then(() => {
                const res = JSON.parse(data.Data);
                this.palletCreate.Identifier = barcode;
                this.palletCreate.Quantity = res.Quantity;
                this.palletCreate.ExpiredDate = res.ExpiredDate?.substr(0, 10) || null;
                this.basePage
                  .newToastSuccess(`Identificador: ${this.palletCreate.Identifier}`)
                  .then(() => {
                    this.palletCreate.HasChildren = false;
                    localStorage.setItem(
                      'hideKeyboard-sessionWms',
                      this.isReadonly ? 'true' : 'false',
                    );
                    this.fieldsVisible = true;
                  });
              });
            }
          },
          error: (error: any) => {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newToast(error?.Detail?.message || 'Erro ao verificar identificador.');
            });
          },
        });
    });
  }

  // ─── Form / Save ─────────────────────────────────────────────────────────────

  copyQuantity(): void {
    const quantity = this.palletCreate.Quantity ?? 1;
    this.palletCreate.Weight = quantity;
    this.palletCreate.GrossWeight = quantity;
    this.basePage.newToastSuccess('Valor copiado!');
  }

  validationClean(): void {
    this.validationForm.Error = false;
    this.validationForm.Message = '';
  }

  validateDynamics(): Promise<ValidationJsonForm> {
    return new Promise((resolve, reject) => {
      this.validationClean();
      if (!this.jsonForms || this.jsonForms.length === 0) {
        resolve(this.validationForm);
        return;
      }
      this.jsonForms.forEach((elem) => {
        const validate = this.inputs[elem.Id];
        if (
          elem.Required &&
          (typeof validate === 'undefined' || validate === '' || validate === ' ' || validate === 0)
        ) {
          this.validationForm.Error = true;
          this.validationForm.Message = `Campo ${elem.DisplayText} deve ser preenchido!`;
        }
        if (elem.Min != null && elem.Min !== 0) {
          if (
            elem.DataTypeName === 'Number' &&
            typeof validate !== 'undefined' &&
            validate < elem.Min
          ) {
            this.validationForm.Error = true;
            this.validationForm.Message = `Campo ${elem.DisplayText} deve ser maior que ${elem.Min}!`;
          } else if (
            elem.DataTypeName !== 'Number' &&
            typeof validate !== 'undefined' &&
            validate.length < elem.Min
          ) {
            this.validationForm.Error = true;
            this.validationForm.Message = `Campo ${elem.DisplayText} deve ter o tamanho mínimo de ${elem.Min}!`;
          }
        }
        if (elem.Max != null && elem.Max !== 0) {
          if (
            elem.DataTypeName === 'Number' &&
            typeof validate !== 'undefined' &&
            validate > elem.Max
          ) {
            this.validationForm.Error = true;
            this.validationForm.Message = `Campo ${elem.DisplayText} deve ser menor que ${elem.Max}!`;
          } else if (
            elem.DataTypeName !== 'Number' &&
            typeof validate !== 'undefined' &&
            validate.length > elem.Max
          ) {
            this.validationForm.Error = true;
            this.validationForm.Message = `Campo ${elem.DisplayText} deve ter o tamanho máximo de ${elem.Max}!`;
          }
        }
        if (elem.RegEx != null && typeof validate !== 'undefined' && !validate.match(elem.RegEx)) {
          this.validationForm.Error = true;
          this.validationForm.Message = `Campo ${elem.DisplayText} deve ter o padrão correto!`;
        }
        resolve(this.validationForm);
      }, reject);
    });
  }

  checkValidate(): void {
    this.basePage.newLoading().then(() => {
      this.validateDynamics()
        .then((data) => {
          if (!data) {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newAlert('Erro', 'Erro ao validar o formulário');
            });
          } else if (data.Error) {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newAlert('Validação', data.Message || 'Erro de validação.');
            });
          } else {
            this.basePage.dismissLoading().then(() => {
              this.basePage
                .newToastSuccess('Formulário validado com sucesso! Salvando...')
                .then(() => {
                  this.fieldsVisible = false;
                  this.showConfirmSave();
                });
            });
          }
        })
        .catch((error: any) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Erro', error || 'Erro ao validar formulário.');
          });
        });
    });
  }

  async showConfirmSave(): Promise<void> {
    const quantity = this.palletCreate.Quantity ?? 1;
    const weight = this.palletCreate.Weight ?? 0;
    const quantityPallets = this.palletCreate.QuantityPallets ?? 1;

    let message = '';
    if (this.controlWeight) {
      message = `Você confirma a criação:<br> - De <b>${quantityPallets}</b> Palete(s)<br> - Pesando <b>${weight}</b> cada Palete<br> <b>Totalizando ${quantityPallets * weight}</b>?`;
    } else {
      message = `Você confirma a criação:<br> - De <b>${quantityPallets}</b> Palete(s)<br> - Com <b>${quantity}(${this.unitMeasurementAcronym})</b> cada Palete<br> <b>Totalizando ${quantityPallets * quantity}</b>?`;
    }

    const confirmed = await this.basePage.newConfirm('Confirmar a criação?', message);
    if (confirmed) {
      this.savePallet();
    } else {
      this.fieldsVisible = true;
    }
  }

  async showPromptContinueOrBack(): Promise<void> {
    const confirmed = await this.basePage.newConfirm(
      'Continuar?',
      'Deseja continuar criando com o mesmo produto, doca e carreta?',
      'Continuar',
      'Não',
    );
    if (confirmed) {
      await this.basePage.newToast('Continuar com o mesmo produto');
      this.palletCreate.Weight = 0;
      this.palletCreate.GrossWeight = 0;
      if (this.hasPacking) {
        this.fieldsVisible = false;
        this.showPromptIdentifier();
      } else {
        this.fieldsVisible = true;
      }
    } else {
      await this.basePage.newToast('Retornando a tela de paletes');
      this.clearObj();
      this.fieldsVisible = false;
      this.goBack();
    }
  }

  savePallet(): void {
    this.basePage.newLoading().then(() => {
      if (!this.isMaster) {
        this.receptionService
          .createPallet({
            orderId: this.palletCreate.OrderId,
            taskListId: this.palletCreate.TaskListId,
            locationId: this.palletCreate.LocationId,
            nfeId: this.palletCreate.NfeId,
            grouper: this.palletCreate.Grouper,
            isMaster: true,
            hasChildren: this.palletCreate.HasChildren,
            productId: this.palletCreate.ProductId ?? 0,
            productPresentationId: this.palletCreate.ProductPresentationId ?? 0,
            quantity: this.palletCreate.Quantity ?? 0,
            containerId: this.palletCreate.ContainerId,
            stockParam: JSON.stringify(this.inputs),
            parentId: 0,
            identifier: '',
          })
          .subscribe({
            next: (data: any) => {
              if (data.Error === true) {
                this.basePage.dismissLoading().then(() => {
                  this.clearObj();
                  this.fieldsVisible = false;
                  this.basePage.newAlert('Erro', data.Message).then(() => this.goBack());
                });
              } else {
                this.basePage.dismissLoading().then(() => {
                  this.basePage.newToastSuccess('Palete criado com sucesso!').then(() => {
                    this.clearObj();
                    this.fieldsVisible = false;
                    const returnPallet = JSON.parse(data.Data);
                    if (returnPallet.HasChildren) {
                      this.goPalletItens(returnPallet);
                    } else {
                      this.goBack();
                    }
                  });
                });
              }
            },
            error: (error: any) => {
              this.basePage.dismissLoading().then(() => {
                this.basePage.newAlert('Erro', error?.Detail?.message || 'Erro ao criar palete.');
              });
            },
          });
      } else {
        this.receptionService
          .createPalletBySampling({
            orderId: this.palletCreate.OrderId,
            taskListId: this.palletCreate.TaskListId,
            locationId: this.palletCreate.LocationId,
            nfeId: this.palletCreate.NfeId,
            grouper: this.palletCreate.Grouper,
            isMaster: true,
            hasChildren: (this.palletCreate.Bulk ?? 1) > 1,
            productId: this.palletCreate.ProductId ?? 0,
            productPresentationId: this.palletCreate.ProductPresentationId ?? 0,
            quantity: this.palletCreate.Quantity ?? 1,
            bulk: this.palletCreate.Bulk ?? 1,
            quantityPallets: this.palletCreate.QuantityPallets ?? 1,
            containerId: this.palletCreate.ContainerId,
            stockParam: JSON.stringify(this.inputs),
            parentId: 0,
            identifier: this.palletCreate.Identifier,
            weight: this.palletCreate.Weight ?? 1,
            grossWeight: this.palletCreate.GrossWeight ?? 1,
            vehicleTruckId: this.palletCreate.VehicleTruckId,
            expiredDate: this.palletCreate.ExpiredDate,
          })
          .subscribe({
            next: (data: any) => {
              if (data.Error === true) {
                this.basePage.dismissLoading().then(() => {
                  this.clearObj();
                  this.fieldsVisible = false;
                  this.basePage.newAlert('Erro', data.Message).then(() => this.goBack());
                });
              } else {
                this.basePage.dismissLoading().then(() => {
                  this.basePage.newToastSuccess('Palete criado com sucesso!').then(() => {
                    this.fieldsVisible = false;
                    this.showPromptContinueOrBack();
                  });
                });
              }
            },
            error: (error: any) => {
              this.basePage.dismissLoading().then(() => {
                this.basePage.newAlert('Erro', error?.Detail?.message || 'Erro ao criar palete.');
              });
            },
          });
      }
    });
  }
}
