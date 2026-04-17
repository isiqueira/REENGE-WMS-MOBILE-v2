import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { TfaService } from '../tfa.service';
import { ReceptionService } from '../../reception/reception.service';
import { TypeBarcode } from '../../../enums/enums';

@Component({
  selector: 'app-tfa',
  templateUrl: './tfa.page.html',
  styleUrls: ['./tfa.page.scss'],
  standalone: false
})
export class TfaPage implements OnInit {

  public tfaList: any[] = [];
  public initialList: any[] = [];
  public isearchBar: string | null = null;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private basePage: BasePageService,
    private tfaService: TfaService,
    private receptionService: ReceptionService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.isearchBar = null;
    this.getList();
  }

  getList() {
    this.basePage.newLoading().then(() => {
      this.tfaService.getTfaList().subscribe({
        next: (data) => {
          this.basePage.dismissLoading().then(() => {
            this.initialList = data || [];
            this.tfaList = [...this.initialList];
          });
        },
        error: (err) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Erro', err?.error?.Detail?.message || 'Erro ao carregar TFAs.');
          });
        }
      });
    });
  }

  initializeItems() {
    this.tfaList = [...this.initialList];
  }

  getItems(event: any) {
    this.initializeItems();
    let val = event.target.value;
    if (val != undefined) val = val.replace('*', '');
    if (val && val.trim().length > 0) {
      this.tfaList = this.tfaList.filter(item =>
        item.Id.toString().toLowerCase().indexOf(val.toLowerCase()) > -1
      );
    }
  }

  async goPictures(item: any) {
    await this.basePage.newLoading();
    this.tfaService.getPictureByTfaId({ tfaId: item.Id }).subscribe({
      next: (data) => {
        this.basePage.dismissLoading().then(() => {
          this.router.navigate(['/tfa-pictures'], {
            state: { tfaCreate_object: { tfaCreate: item, pictureList: data || [] } }
          });
        });
      },
      error: (err) => {
        this.basePage.dismissLoading().then(() => {
          this.basePage.newAlert('Erro', err?.error?.Detail?.message || 'Erro ao carregar imagens.');
        });
      }
    });
  }

  async createBySeal() {
    const barcode = await this.basePage.newGetBarcode(TypeBarcode.SEAL);
    if (!barcode) return;
    await this.basePage.newLoading();
    this.tfaService.getFieldsBySealId({ sealIdentifier: barcode }).subscribe({
      next: (data) => {
        this.basePage.dismissLoading().then(() => {
          this.tfaService.getTfaFailureTypes().subscribe({
            next: (failureTypes) => {
              this.router.navigate(['/tfa-create-by-seal'], {
                state: { tfa_object: { ...data, TfaFailureTypes: failureTypes } }
              });
            },
            error: () => {
              this.router.navigate(['/tfa-create-by-seal'], {
                state: { tfa_object: data }
              });
            }
          });
        });
      },
      error: (err) => {
        this.basePage.dismissLoading().then(() => {
          this.basePage.newAlert('Erro', err?.error?.Detail?.message || 'Erro ao buscar dados do selo.');
        });
      }
    });
  }

  goReceptionOrders() {
    this.router.navigate(['/tfa-reception-orders']);
  }
}
