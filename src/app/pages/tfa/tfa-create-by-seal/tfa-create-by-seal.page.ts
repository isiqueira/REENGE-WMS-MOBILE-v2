import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { TfaService } from '../tfa.service';

@Component({
  selector: 'app-tfa-create-by-seal',
  templateUrl: './tfa-create-by-seal.page.html',
  styleUrls: ['./tfa-create-by-seal.page.scss'],
  standalone: false
})
export class TfaCreateBySealPage implements OnInit {

  public tfaCreate: any = {};

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private basePage: BasePageService,
    private tfaService: TfaService
  ) {}

  ngOnInit() {
    this.tfaCreate = history.state['tfa_object'] || {};
  }

  cancel() {
    this.navCtrl.back();
  }

  async ok() {
    await this.basePage.newLoading();
    if (this.tfaCreate.Id && this.tfaCreate.Id !== 0) {
      this.tfaService.editTfaBySeal(this.tfaCreate).subscribe({
        next: () => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newToastSuccess('TFA atualizado com sucesso!').then(() => {
              this.navCtrl.back();
            });
          });
        },
        error: (err) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Erro', err?.error?.Detail?.message || 'Erro ao editar TFA.');
          });
        }
      });
    } else {
      this.tfaService.saveTfaBySeal(this.tfaCreate).subscribe({
        next: (data) => {
          this.basePage.dismissLoading().then(() => {
            const tfaData = data?.Data ? JSON.parse(data.Data) : data;
            this.showGoAddPictures(tfaData);
          });
        },
        error: (err) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Erro', err?.error?.Detail?.message || 'Erro ao salvar TFA.');
          });
        }
      });
    }
  }

  async showGoAddPictures(tfaData: any) {
    const confirmed = await this.basePage.newConfirm('Adicionar Fotos', 'Deseja adicionar fotos ao TFA?');
    if (confirmed) {
      this.router.navigate(['/tfa-pictures'], {
        state: { tfaCreate_object: { tfaCreate: tfaData, pictureList: [] } }
      });
    } else {
      await this.basePage.newToastSuccess('TFA salvo com sucesso!');
      this.navCtrl.back();
    }
  }
}
