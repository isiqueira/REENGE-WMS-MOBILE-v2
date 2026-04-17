import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

import { BasePageService } from '../../../core/base-page.service';
import { ShippingService } from '../shipping.service';

@Component({
  selector: 'app-shipping-conference',
  templateUrl: './shipping-conference.page.html',
  styleUrls: ['./shipping-conference.page.scss'],
  standalone: false,
})
export class ShippingConferencePage implements OnInit {

  @ViewChild('identifier') identifierInput!: ElementRef;

  public task: any;
  public fieldsVisible: boolean = false;
  public conferenceIdentifier: string = '';
  public isReadonly: boolean = false;
  public totalConference: number = 0;

  public vehicle: any = {};

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private basePage: BasePageService,
    private shippingService: ShippingService,
  ) {}

  ngOnInit() {
    this.task = history.state['task_object'];
  }

  ionViewDidEnter() {
    this.instantiateCommon();
  }

  goBack() {
    this.navCtrl.navigateBack('/shipping-tasks');
  }

  instantiateCommon() {
    this.fieldsVisible = false;
    this.totalConference = this.task.Total;
    this.getVehicles();
  }

  clearCollect() {
    this.conferenceIdentifier = '';
    this.isReadonly = false;
    setTimeout(() => {
      this.identifierInput?.nativeElement?.focus();
    }, 500);
  }

  onChangeIdentifier() {
    if (this.conferenceIdentifier !== null) {
      if (this.conferenceIdentifier.toString().indexOf('*') !== -1) {
        this.isReadonly = true;
        this.conferenceIdentifier = this.conferenceIdentifier.replace('*', '');
        this.saveConference();
      }
    }
  }

  checkBlur() {
    this.identifierInput?.nativeElement?.focus();
  }

  async getVehicles() {
    await this.basePage.newLoading();
    this.shippingService.getVehicles({ orderId: this.task.OrderId }).subscribe({
      next: async (data: any) => {
        await this.basePage.dismissLoading();
        if (!data || data.length === 0) {
          await this.basePage.newAlert('Atenção', 'Erro ao obter veículos!');
          return;
        }
        this.vehicle.AlternativesVehicles = data;
        if (data.length === 1) {
          this.vehicle.Vehicle = data[0].VehicleNumber;
          this.vehicle.VehicleId = data[0].Id;
          this.getVehicleTrucks();
        } else {
          this.showPromptVehicles();
        }
      },
      error: async (err: any) => {
        await this.basePage.dismissLoading();
        await this.basePage.newAlert('Atenção', err?.error?.Detail?.message || 'Erro ao obter veículos.');
      },
    });
  }

  async showPromptVehicles() {
    const inputs: any[] = this.vehicle.AlternativesVehicles.map((v: any) => ({
      type: 'radio',
      label: v.Plate || v.VehicleNumber,
      value: v.Id,
    }));

    const alert = await this.alertCtrl.create({
      header: 'Selecione o Veículo',
      inputs,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { this.goBack(); },
        },
        {
          text: 'Confirmar',
          handler: (selectedId: any) => {
            if (!selectedId) {
              this.basePage.newToast('Veículo não identificado!');
              this.showPromptVehicles();
              return;
            }
            const selected = this.vehicle.AlternativesVehicles.find((v: any) => v.Id === selectedId);
            this.vehicle.Vehicle = selected?.Plate;
            this.vehicle.VehicleId = selectedId;
            this.getVehicleTrucks();
          },
        },
      ],
    });
    await alert.present();
  }

  async getVehicleTrucks() {
    await this.basePage.newLoading();
    this.shippingService.getVehicleTruck({ orderVehicleId: this.vehicle.VehicleId }).subscribe({
      next: async (data: any) => {
        await this.basePage.dismissLoading();
        if (!data || data.length === 0) {
          await this.basePage.newAlert('Atenção', 'Erro ao obter carretas!');
          return;
        }
        this.vehicle.AlternativesVehicleTrucks = data;
        if (data.length === 1) {
          this.vehicle.VehicleTruck = data[0].TruckNumber;
          this.vehicle.VehicleTruckId = data[0].Id;
          this.fieldsVisible = true;
          setTimeout(() => {
            this.identifierInput?.nativeElement?.focus();
          }, 800);
        } else {
          this.showPromptVehicleTrucks();
        }
      },
      error: async (err: any) => {
        await this.basePage.dismissLoading();
        await this.basePage.newAlert('Atenção', err?.error?.Detail?.message || 'Erro ao obter carretas.');
      },
    });
  }

  async showPromptVehicleTrucks() {
    const inputs: any[] = this.vehicle.AlternativesVehicleTrucks.map((t: any) => ({
      type: 'radio',
      label: t.Plate || t.TruckNumber,
      value: t.Id,
    }));

    const alert = await this.alertCtrl.create({
      header: 'Selecione a Carreta',
      inputs,
      buttons: [
        {
          text: 'Voltar',
          role: 'cancel',
          handler: () => { this.showPromptVehicles(); },
        },
        {
          text: 'Confirmar',
          handler: (selectedId: any) => {
            if (!selectedId) {
              this.basePage.newToast('Carreta não identificada!');
              this.showPromptVehicleTrucks();
              return;
            }
            const selected = this.vehicle.AlternativesVehicleTrucks.find((t: any) => t.Id === selectedId);
            this.vehicle.VehicleTruck = selected?.Plate;
            this.vehicle.VehicleTruckId = selectedId;
            this.fieldsVisible = true;
            setTimeout(() => {
              this.identifierInput?.nativeElement?.focus();
            }, 800);
          },
        },
      ],
    });
    await alert.present();
  }

  async saveConference() {
    await this.basePage.newLoading();
    this.shippingService.conferenceItem({
      identifier: this.conferenceIdentifier,
      orderId: this.task.OrderId,
      vehicleTruckId: this.vehicle.VehicleTruckId,
    }).subscribe({
      next: async (data: any) => {
        await this.basePage.dismissLoading();
        if (data.Error === true) {
          await this.basePage.newAlert('Atenção', data.Message);
          this.clearCollect();
        } else {
          this.totalConference = parseInt(data.Data);
          await this.basePage.newToastSuccess('Item conferido!');
          this.clearCollect();
        }
      },
      error: async (err: any) => {
        await this.basePage.dismissLoading();
        await this.basePage.newAlert('Atenção', err?.error?.Detail?.message || 'Erro ao conferir item.');
        this.clearCollect();
      },
    });
  }
}
