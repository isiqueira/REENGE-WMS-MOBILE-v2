import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';

import { BasePageService } from '../../../core/base-page.service';
import { StuffingService } from '../stuffing.service';
import { TypeBarcode } from '../../../enums/enums';

@Component({
  selector: 'app-stuffing-conference',
  templateUrl: './stuffing-conference.page.html',
  styleUrls: ['./stuffing-conference.page.scss'],
  standalone: false,
})
export class StuffingConferencePage implements OnInit {

  @ViewChild('identifier') identifierInput!: ElementRef;

  public task: any;
  public conferenceIdentifier: string = '';
  public isReadonly: boolean = false;
  public totalConference: number = 0;

  constructor(
    private navCtrl: NavController,
    private basePage: BasePageService,
    private stuffingService: StuffingService,
  ) {}

  ngOnInit() {
    this.task = history.state['task_object'];
    if (this.task) {
      this.task.Address = this.task.LocationAddress;
      this.task.AddressFormated = this.task.LocationAddressFormated;
    }
  }

  ionViewDidEnter() {
    this.instantiateCommon();
    setTimeout(() => {
      this.identifierInput?.nativeElement?.focus();
    }, 800);
  }

  goBack() {
    this.navCtrl.navigateBack('/stuffing-tasks');
  }

  instantiateCommon() {
    this.totalConference = this.task.Total;
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
        this.validMultipleConference();
      }
    }
  }

  checkBlur() {
    if (!this.task?.TaskListOrderOwnerAllowMultipleConference) {
      this.identifierInput?.nativeElement?.focus();
    }
  }

  validMultipleConference() {
    if (!this.task.TaskListOrderOwnerAllowMultipleConference) {
      this.saveConference();
    } else {
      this.showPromptLocal();
    }
  }

  async showPromptLocal() {
    const barcode = await this.basePage.newGetBarcode(TypeBarcode.LOCATION);
    if (!barcode) {
      this.clearCollect();
      return;
    }
    if (barcode !== this.task.TaskListOrderCode) {
      await this.basePage.newAlert('Atenção', 'Código informado é Inválido.');
      this.showPromptLocal();
      return;
    }
    await this.basePage.newToastSuccess('Local Confirmado');
    this.saveConference();
  }

  async saveConference() {
    await this.basePage.newLoading();
    this.stuffingService.conferenceItem({
      identifier: this.conferenceIdentifier,
      orderId: this.task.OrderId,
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
