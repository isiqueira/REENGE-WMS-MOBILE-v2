import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { PickingService } from '../picking.service';

@Component({
  selector: 'app-picking-storage-confirm',
  templateUrl: 'picking-storage-confirm.page.html',
  styleUrls: ['picking-storage-confirm.page.scss'],
  standalone: false,
})
export class PickingStorageConfirmPage implements OnInit {
  @ViewChild('identifier') identifierInput!: ElementRef;

  public localIdentifier: string = '';
  public task: any = null;
  public pickingStorageItem: any = {};
  public isReadonly: boolean = false;

  constructor(
    private navCtrl: NavController,
    private basePage: BasePageService,
    private pickingService: PickingService,
  ) {}

  ngOnInit(): void {
    this.task = history.state['task_object'];
  }

  ionViewDidEnter(): void {
    this.instantiateCommon();
  }

  checkBlur(): void {
    this.identifierInput?.nativeElement?.focus();
  }

  instantiateCommon(): void {
    this.pickingStorageItem.Id = this.task.Id;
    this.pickingStorageItem.Identifier = this.task.Identifier;
    this.pickingStorageItem.LocalOriginForecastId = this.task.LocalOriginForecastId;
    this.pickingStorageItem.LocalOriginForecastAddress = this.task.LocalOriginForecastAddress;
    this.pickingStorageItem.LocalDestinationForecastId = this.task.LocalDestinationForecastId;
    this.pickingStorageItem.LocalDestinationForecastAddress = this.task.LocalDestinationForecastAddress;
    setTimeout(() => { this.identifierInput?.nativeElement?.focus(); }, 800);
  }

  goBack(): void {
    this.navCtrl.navigateBack('/picking-tasks');
  }

  onChangeIdentifier(): void {
    if (this.localIdentifier !== null && this.localIdentifier.toString().indexOf('*') !== -1) {
      this.localIdentifier = this.localIdentifier.replace('*', '');
      this.isReadonly = true;

      this.basePage.newLoading().then(() => {
        this.pickingService.getLocation({ address: this.localIdentifier }).subscribe({
          next: (data: any) => {
            if (data == null) {
              this.basePage.dismissLoading().then(async () => {
                await this.basePage.newAlert('Atenção', 'Código informado é Inválido.');
                this.isReadonly = false;
                this.identifierInput?.nativeElement?.focus();
              });
            } else {
              this.basePage.dismissLoading().then(async () => {
                this.pickingStorageItem.LocalDestinationRealId = data.Id;
                this.pickingStorageItem.LocalDestinationRealAddress = data.Address;

                if (this.task.LocalDestinationForecastAddress !== this.pickingStorageItem.LocalDestinationRealAddress) {
                  await this.basePage.newAlert('Atenção', 'Local informado não é o correto para essa tarefa.');
                  this.isReadonly = false;
                  this.identifierInput?.nativeElement?.focus();
                } else {
                  await this.basePage.newToastSuccess(`Local Confirmado: ${this.pickingStorageItem.LocalDestinationRealAddress}`);
                  this.conclude();
                }
              });
            }
          },
          error: (error: any) => {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newAlert('Atenção', error?.Detail?.message || 'Erro ao verificar local.');
              this.isReadonly = false;
              this.identifierInput?.nativeElement?.focus();
            });
          },
        });
      });
    }
  }

  conclude(): void {
    this.basePage.newLoading().then(() => {
      this.pickingService.removeStorage({
        taskTransferId: this.pickingStorageItem.Id,
        locationId: this.pickingStorageItem.LocalDestinationRealId,
        quantity: 1,
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
