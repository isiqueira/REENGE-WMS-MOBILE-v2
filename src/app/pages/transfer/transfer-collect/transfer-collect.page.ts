import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { TransferService } from '../transfer.service';
import { TypeBarcode } from '../../../enums/enums';

@Component({
  selector: 'app-transfer-collect',
  templateUrl: './transfer-collect.page.html',
  styleUrls: ['./transfer-collect.page.scss'],
  standalone: false,
})
export class TransferCollectPage implements OnInit {

  task: any = {};
  transferCollectItem: any = {};

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

  instantiateCommon() {
    this.transferCollectItem.Id = this.task.Id;
    this.transferCollectItem.LocalOriginForecastId = this.task.LocalOriginForecastId;
    this.transferCollectItem.LocalOriginForecastAddress = this.task.LocalOriginForecastAddress;
    this.transferCollectItem.LocalDestinationForecastId = this.task.LocalDestinationForecastId;
    this.transferCollectItem.LocalDestinationForecastAddress = this.task.LocalDestinationForecastAddress;
    this.showPickingInfo();
  }

  goBack() {
    this.navCtrl.navigateBack('/transfer-actions');
  }

  async showPickingInfo() {
    const msg = `Local de coleta: <b>${this.task.LocalOriginForecastAddress}</b><br/>` +
      `Produto: <b>${this.task.ProductDescription}</b><br/>` +
      `Quantidade: <b>${this.task.QuantityOriginForecast}</b>`;
    const confirmed = await this.basePage.newConfirm('Informações da Coleta', msg);
    if (!confirmed) {
      this.goBack();
      return;
    }
    await this.basePage.newToastSuccess('Iniciando coleta!');
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
        if (this.transferCollectItem.LocalOriginForecastAddress !== barcode) {
          await this.basePage.newAlert('Atenção', 'Local informado não é o correto para essa tarefa.');
          this.showPromptLocal();
          return;
        }
        this.transferCollectItem.LocalOriginRealId = data.Id;
        this.transferCollectItem.LocalOriginRealAddress = data.Address;
        await this.basePage.newToastSuccess(`Local Confirmado: ${this.transferCollectItem.LocalOriginRealAddress}`);
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

    await this.basePage.newLoading();
    this.transferService.updateTaskTransfer({
      taskTransferId: this.task.Id,
      locationId: this.transferCollectItem.LocalOriginRealId,
      identifier: barcode,
    }).subscribe({
      next: async (data) => {
        await this.basePage.dismissLoading();
        if (data.Error === true) {
          await this.basePage.newAlert('Atenção', data.Message);
          this.showPromptLocal();
        } else {
          const message = data.Message == null ? 'Coleta realizada com sucesso!' : data.Message;
          await this.basePage.newToastSuccess(message);
          this.goBack();
        }
      },
      error: async (err) => {
        await this.basePage.dismissLoading();
        await this.basePage.newAlert('Atenção', err?.error?.Detail?.message || 'Erro ao atualizar tarefa.');
      },
    });
  }
}
