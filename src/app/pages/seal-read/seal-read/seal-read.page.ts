import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { SealReadService } from '../seal-read.service';
import { TypeBarcode } from '../../../enums/enums';

@Component({
  selector: 'app-seal-read',
  templateUrl: './seal-read.page.html',
  styleUrls: ['./seal-read.page.scss'],
  standalone: false
})
export class SealReadPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private basePage: BasePageService,
    private sealReadService: SealReadService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.showPromptIdentifier();
  }

  goBack() {
    this.navCtrl.back();
  }

  async showPromptIdentifier() {
    const barcode = await this.basePage.newGetBarcode(TypeBarcode.SEAL);
    if (!barcode) {
      this.goBack();
      return;
    }
    const seal = barcode;
    await this.basePage.newLoading();
    this.sealReadService.readSeal({ identifier: seal }).subscribe({
      next: async (data) => {
        await this.basePage.dismissLoading();
        if (data == null) {
          await this.basePage.newAlert('Atenção', 'Código informado é Inválido.');
          this.showPromptIdentifier();
        } else {
          await this.basePage.newToastSuccess(`${seal} foi lido com sucesso!`);
          this.showPromptIdentifier();
        }
      },
      error: async (err) => {
        await this.basePage.dismissLoading();
        this.basePage.newToast(err?.error?.Detail?.message || 'Erro ao ler selo.');
      }
    });
  }
}
