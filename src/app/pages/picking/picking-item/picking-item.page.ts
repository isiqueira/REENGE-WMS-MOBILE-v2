import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { PickingService } from '../picking.service';
import { TypeBarcode } from '../../../enums/enums';

@Component({
  selector: 'app-picking-item',
  templateUrl: 'picking-item.page.html',
  styleUrls: ['picking-item.page.scss'],
  standalone: false,
})
export class PickingItemPage implements OnInit {
  @ViewChild('identifier') identifierInput!: ElementRef;

  public task: any = null;
  public pickingItem: any = {};
  public fieldsVisible: boolean = false;
  public isReadonly: boolean = false;
  public totalCollected: number = 0;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private basePage: BasePageService,
    private pickingService: PickingService,
  ) {}

  ngOnInit(): void {
    this.task = history.state['task_object'];
  }

  ionViewDidEnter(): void {
    this.instantiateCommon();
  }

  goBack(): void {
    this.navCtrl.navigateBack('/picking-tasks');
  }

  instantiateCommon(): void {
    this.pickingItem.Id = this.task.Id;
    this.pickingItem.Identifier = null;
    this.pickingItem.LocalOriginForecastId = this.task.LocalOriginForecastId;
    this.pickingItem.LocalOriginForecastAddress = this.task.LocalOriginForecastAddress;
    this.pickingItem.LocalDestinationForecastId = this.task.LocalDestinationForecastId;
    this.pickingItem.LocalDestinationForecastAddress = this.task.LocalDestinationForecastAddress;
    this.pickingItem.Quantity = 1;
    this.totalCollected = this.task.QuantityOriginReal;
    this.showPickingInfo();
  }

  clearCollect(): void {
    this.pickingItem.Identifier = null;
    this.pickingItem.Quantity = 1;
    this.isReadonly = false;
    setTimeout(() => {
      this.identifierInput?.nativeElement?.focus();
    }, 500);
  }

  onChangeIdentifier(): void {
    if (this.pickingItem.Identifier !== null && this.pickingItem.Identifier.toString().indexOf('*') !== -1) {
      this.isReadonly = true;
      this.pickingItem.Identifier = this.pickingItem.Identifier.replace('*', '');
      if (this.task.SealIdentifier != null && this.pickingItem.Identifier !== this.task.SealIdentifier) {
        this.basePage.newAlert('Atenção', `Palete incorreto! Colete o palete ${this.task.SealIdentifier}`).then(() => {
          this.isReadonly = false;
          this.identifierInput?.nativeElement?.focus();
          this.clearCollect();
        });
      } else {
        this.verifyPresentation();
      }
    }
  }

  checkBlur(): void {
    this.identifierInput?.nativeElement?.focus();
  }

  async showPickingInfo(): Promise<void> {
    let message = '';
    if (this.task.SealIdentifier == null) {
      message = `Local de coleta: <b>${this.task.LocalOriginForecastAddressFormated}</b><br/>
                 Produto: <b>${this.task.ProductDescription}</b><br/>
                 Quantidade: <b>${this.task.QuantityOriginForecast}</b>`;
    } else {
      message = `Local de coleta: <b>${this.task.LocalOriginForecastAddressFormated}</b><br/>
                 Posição: <b>${this.task.SealPalletPosition}</b><br/>
                 Palete: <b>${this.task.SealIdentifier}</b><br/>
                 Produto: <b>${this.task.ProductDescription}</b><br/>
                 Quantidade: <b>${this.task.QuantityOriginForecast}</b>`;
    }

    const alert = await this.alertCtrl.create({
      cssClass: 'prompt-buttons-2',
      header: 'Informações da Coleta',
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'promptCancel',
          handler: () => { this.goBack(); },
        },
        {
          text: 'Confirmar',
          cssClass: 'promptConfirm',
          handler: () => {
            this.basePage.newToastSuccess('Iniciando coleta!').then(() => {
              if (this.pickingService.locationsIsSet) {
                if (this.pickingItem.LocalOriginForecastAddress !== this.pickingService.locationFilter.Location) {
                  this.basePage.newAlert('Atenção', 'Local informado não é o correto para essa tarefa.').then(() => {
                    this.showPromptLocal();
                  });
                } else {
                  this.pickingItem.LocalOriginRealId = this.pickingService.locationFilter.LocationId;
                  this.pickingItem.LocalOriginRealAddress = this.pickingService.locationFilter.Location;
                  this.basePage.newToastSuccess(`Local Confirmado: ${this.pickingItem.LocalOriginRealAddress}`).then(() => {
                    this.fieldsVisible = true;
                    setTimeout(() => { this.identifierInput?.nativeElement?.focus(); }, 800);
                  });
                }
              } else {
                this.showPromptLocal();
              }
            });
          },
        },
      ],
    });
    await alert.present();
  }

  async showPromptLocal(): Promise<void> {
    const barcode = await this.basePage.newGetBarcode(TypeBarcode.LOCATION);
    if (!barcode) {
      this.goBack();
      return;
    }
    this.basePage.newLoading().then(() => {
      this.pickingService.getLocation({ address: barcode }).subscribe({
        next: (data: any) => {
          if (data == null) {
            this.basePage.dismissLoading().then(async () => {
              await this.basePage.newAlert('Atenção', 'Código informado é Inválido.');
              this.showPromptLocal();
            });
          } else {
            this.basePage.dismissLoading().then(async () => {
              if (this.pickingItem.LocalOriginForecastAddress !== barcode) {
                await this.basePage.newAlert('Atenção', 'Local informado não é o correto para essa tarefa.');
                this.showPromptLocal();
              } else {
                this.pickingItem.LocalOriginRealId = data.Id;
                this.pickingItem.LocalOriginRealAddress = data.Address;
                await this.basePage.newToastSuccess(`Local Confirmado: ${this.pickingItem.LocalOriginRealAddress}`);
                this.fieldsVisible = true;
                setTimeout(() => { this.identifierInput?.nativeElement?.focus(); }, 800);
              }
            });
          }
        },
        error: (error: any) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Atenção', error?.Detail?.message || 'Erro ao buscar local.');
          });
        },
      });
    });
  }

  verifyPresentation(): void {
    this.basePage.newLoading().then(() => {
      this.pickingService.verifyPresentation({
        taskTransferId: this.task.Id,
        identifier: this.pickingItem.Identifier,
      }).subscribe({
        next: (data: any) => {
          if (data.Error === true) {
            this.basePage.dismissLoading().then(async () => {
              switch (data.ErrorCode) {
                case 5:
                  await this.basePage.newAlert('Atenção', data.Message);
                  this.pickingItem.Quantity = this.task.SealQuantityAvaiable;
                  this.saveCollect();
                  break;
                default:
                  await this.basePage.newAlert('Atenção', data.Message);
                  this.isReadonly = false;
                  this.identifierInput?.nativeElement?.focus();
                  this.clearCollect();
                  break;
              }
            });
          } else {
            this.basePage.dismissLoading().then(() => {
              this.pickingItem.Quantity = 1;
              this.saveCollect();
            });
          }
        },
        error: (error: any) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Atenção', error?.Detail?.message || 'Erro ao verificar apresentação.');
          });
        },
      });
    });
  }

  saveCollect(): void {
    this.basePage.newLoading().then(() => {
      this.pickingService.updateTaskTransfer({
        taskTransferId: this.task.Id,
        locationId: this.pickingItem.LocalOriginRealId,
        identifier: this.pickingItem.Identifier,
        quantity: this.pickingItem.Quantity,
      }).subscribe({
        next: (data: any) => {
          if (data.Error === true) {
            this.basePage.dismissLoading().then(async () => {
              await this.basePage.newAlert('Atenção', data.Message);
              this.isReadonly = false;
              this.identifierInput?.nativeElement?.focus();
              this.clearCollect();
            });
          } else {
            const message = data.Message == null ? 'Coleta realizada com sucesso!' : data.Message;
            const gapReturn = data.Data;
            this.basePage.dismissLoading().then(async () => {
              if (gapReturn === '0' || gapReturn === '1') {
                await this.basePage.newToastSuccess(message);
                if (gapReturn === '0') {
                  this.goBack();
                } else {
                  this.totalCollected++;
                  this.clearCollect();
                }
              } else {
                await this.basePage.newAlert('Atenção', message);
                this.clearCollect();
              }
            });
          }
        },
        error: (error: any) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Atenção', error?.Detail?.message || 'Erro ao salvar coleta.');
          });
        },
      });
    });
  }
}
