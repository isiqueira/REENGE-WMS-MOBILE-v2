import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { TransferService } from '../transfer.service';
import { TypeBarcode } from '../../../enums/enums';

@Component({
  selector: 'app-transfer-storage',
  templateUrl: './transfer-storage.page.html',
  styleUrls: ['./transfer-storage.page.scss'],
  standalone: false,
})
export class TransferStoragePage implements OnInit {

  task: any = {};
  transferStorageItem: any = {};

  constructor(
    private navCtrl: NavController,
    private basePage: BasePageService,
    private transferService: TransferService,
  ) {}

  ngOnInit() {
    this.task = history.state['task_object'] || {};
  }

  ionViewDidEnter() {
    this.instantiateCommon();
  }

  goBack() {
    this.navCtrl.navigateBack('/transfer');
  }

  instantiateCommon() {
    this.transferStorageItem.Id = this.task.Id;
    this.transferStorageItem.Identifier = this.task.SealIdentifier;
    this.transferStorageItem.LocalOriginForecastId = this.task.LocalOriginForecastId;
    this.transferStorageItem.LocalOriginForecastAddress = this.task.LocalOriginForecastAddress;
    this.transferStorageItem.LocalDestinationForecastId = this.task.LocalDestinationForecastId;
    this.transferStorageItem.LocalDestinationForecastAddress = this.task.LocalDestinationForecastAddress;
    this.showPromptLocal();
  }

  async showPromptLocal() {
    const barcode = await this.basePage.newGetBarcode(TypeBarcode.LOCATION);
    if (!barcode) {
      this.goBack();
      return;
    }

    await this.basePage.newLoading();
    this.transferService.getLocation({ address: barcode }).subscribe({
      next: async (data) => {
        await this.basePage.dismissLoading();
        if (data == null) {
          await this.basePage.newAlert('Atenção', 'Código informado é Inválido.');
          this.showPromptLocal();
          return;
        }
        this.transferStorageItem.LocalDestinationRealId = data.Id;
        this.transferStorageItem.LocalDestinationRealAddress = data.Address;
        await this.basePage.newToastSuccess(`Local Confirmado: ${this.transferStorageItem.LocalDestinationRealAddress}`);
        this.showPromptIdentifier();
      },
      error: async (err) => {
        await this.basePage.dismissLoading();
        await this.basePage.newAlert('Atenção', err?.error?.Detail?.message || 'Erro ao validar local.');
      },
    });
  }

  async showPromptIdentifier() {
    const barcode = await this.basePage.newGetBarcode(TypeBarcode.SEAL);
    if (!barcode) {
      this.goBack();
      return;
    }

    if (barcode !== this.transferStorageItem.Identifier) {
      await this.basePage.newAlert('Atenção', 'Palete informado inválido!');
      this.showPromptIdentifier();
      return;
    }

    await this.basePage.newLoading();
    this.transferService.storageTransfer({
      taskTransferId: this.task.Id,
      locationRealId: this.transferStorageItem.LocalDestinationRealId,
      identifier: barcode,
    }).subscribe({
      next: async (data) => {
        await this.basePage.dismissLoading();
        if (data.Error === true) {
          await this.basePage.newAlert('Atenção', data.Message);
          this.showPromptIdentifier();
        } else {
          const message = data.Message == null ? 'Transferência realizada com sucesso!' : data.Message;
          await this.basePage.newToastSuccess(message);
          this.goBack();
        }
      },
      error: async (err) => {
        await this.basePage.dismissLoading();
        await this.basePage.newAlert('Atenção', err?.error?.Detail?.message || 'Erro ao armazenar transferência.');
      },
    });
  }
}
