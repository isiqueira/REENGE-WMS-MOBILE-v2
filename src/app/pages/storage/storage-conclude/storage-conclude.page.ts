import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-storage-conclude',
  templateUrl: 'storage-conclude.page.html',
  styleUrls: ['storage-conclude.page.scss'],
  standalone: false,
})
export class StorageConcludePage implements OnInit {
  @ViewChild('identifier') identifierInput!: ElementRef;

  public localIdentifier: string = '';
  public task: any = null;
  public storageItem: any = {};
  public fieldsVisible: boolean = false;
  public isReadonly: boolean = false;
  public jsonStorage: any = null;
  public tableStorage: string = '';

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private basePage: BasePageService,
    private storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.task = history.state['task_object'];
    if (this.task) {
      this.jsonStorage = this.task.jsonStorage;
      this.instantiateCommon();
      this.drawPalletzation();
    }
  }

  ionViewDidEnter(): void {}

  ionViewDidLoad(): void {
    setTimeout(() => {
      this.identifierInput?.nativeElement?.focus();
    }, 800);
  }

  instantiateCommon(): void {
    this.storageItem.Id = this.task.Id;
    this.storageItem.Identifier = this.task.SealIdentifier;
    this.storageItem.LocalOriginForecastId = this.task.LocalOriginForecastId;
    this.storageItem.LocalOriginForecastAddress = this.task.LocalOriginForecastAddress;
    this.storageItem.LocalDestinationForecastId = this.task.LocalDestinationForecastId;
    this.storageItem.LocalDestinationForecastAddress = this.task.LocalDestinationForecastAddress;
  }

  drawPalletzation(): void {
    let tableStorage = '';
    (this.jsonStorage || []).forEach((element: any) => {
      const max = element.Max;
      const put = element.Put;
      const used = element.Used;
      let drawPut = false;

      tableStorage += '<div class="row">';
      for (let i = 1; i <= max; i++) {
        if (i <= used) {
          tableStorage += '<div class="col storage-col storage-pallet used-pallet"></div>';
        } else {
          if (put && !drawPut) {
            tableStorage += '<div class="col storage-col storage-pallet put-pallet animation-border-pulsate-success"></div>';
            drawPut = true;
          } else {
            tableStorage += '<div class="col storage-col"></div>';
          }
        }
      }
      tableStorage += '</div>';
    });

    this.tableStorage = tableStorage;
    this.fieldsVisible = true;
  }

  onChangeIdentifier(): void {
    if (this.localIdentifier !== null && this.localIdentifier.toString().indexOf('*') !== -1) {
      this.localIdentifier = this.localIdentifier.replace('*', '');
      this.isReadonly = true;

      this.basePage.newLoading().then(() => {
        this.storageService.getLocation({ address: this.localIdentifier }).subscribe({
          next: (data: any) => {
            if (data == null) {
              this.basePage.dismissLoading().then(async () => {
                await this.basePage.newAlert('Atenção', 'Código informado é Inválido.');
                this.isReadonly = false;
                this.identifierInput?.nativeElement?.focus();
              });
            } else {
              this.basePage.dismissLoading().then(async () => {
                this.storageItem.LocalDestinationRealId = data.Id;
                this.storageItem.LocalDestinationRealAddress = data.Address;

                if (this.task.LocalDestinationForecastAddress !== this.storageItem.LocalDestinationRealAddress) {
                  const confirm = await this.alertCtrl.create({
                    cssClass: 'prompt-buttons-2',
                    header: 'Locais divergentes!',
                    message: 'O local que você esta confirmando é diferente do local que foi programado. Deseja continuar?',
                    buttons: [
                      {
                        text: 'Não',
                        cssClass: 'promptCancel',
                        handler: () => {
                          this.isReadonly = false;
                          this.identifierInput?.nativeElement?.focus();
                        },
                      },
                      {
                        text: 'Sim',
                        cssClass: 'promptConfirm',
                        handler: () => {
                          this.basePage.newToastSuccess(`Local Confirmado: ${this.storageItem.LocalDestinationRealAddress}`).then(() => {
                            this.conclude();
                          });
                        },
                      },
                    ],
                  });
                  await confirm.present();
                } else {
                  await this.basePage.newToastSuccess(`Local Confirmado: ${this.storageItem.LocalDestinationRealAddress}`);
                  this.conclude();
                }
              });
            }
          },
          error: (error: any) => {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newAlert('Atenção', error?.Detail?.message || 'Erro ao verificar local.');
            });
          },
        });
      });
    }
  }

  checkBlur(): void {
    this.identifierInput?.nativeElement?.focus();
  }

  goBack(): void {
    this.navCtrl.navigateBack('/storage-tasks');
  }

  conclude(): void {
    this.basePage.newLoading().then(() => {
      this.storageService.setStoraged({
        taskId: this.storageItem.Id,
        identifier: this.storageItem.Identifier,
        locationRealId: this.storageItem.LocalDestinationRealId,
      }).subscribe({
        next: (data: any) => {
          if (data.Error === true) {
            this.basePage.dismissLoading().then(async () => {
              await this.basePage.newAlert('Atenção', data.Message);
              this.isReadonly = false;
              this.identifierInput?.nativeElement?.focus();
            });
          } else {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newToastSuccess('Armazenagem realizada com sucesso!').then(() => {
                this.goBack();
              });
            });
          }
        },
        error: (error: any) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Atenção', error?.Detail?.message || 'Erro ao armazenar.');
            this.isReadonly = false;
            this.identifierInput?.nativeElement?.focus();
          });
        },
      });
    });
  }
}
