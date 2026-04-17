import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { TfaService } from '../tfa.service';
import { ReceptionService } from '../../reception/reception.service';

@Component({
  selector: 'app-tfa-nfes',
  templateUrl: './tfa-nfes.page.html',
  styleUrls: ['./tfa-nfes.page.scss'],
  standalone: false
})
export class TfaNfesPage implements OnInit {

  public order: any = {};
  public nfeList: any[] = [];
  public initialList: any[] = [];
  public isearchBar: string | null = null;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private basePage: BasePageService,
    private tfaService: TfaService,
    private receptionService: ReceptionService
  ) {}

  ngOnInit() {
    this.order = history.state['order_object'] || {};
  }

  ionViewDidEnter() {
    this.isearchBar = null;
    this.getList();
  }

  getList() {
    this.basePage.newLoading().then(() => {
      this.receptionService.getNfeForOrder({ orderId: this.order.Id }).subscribe({
        next: (data) => {
          this.basePage.dismissLoading().then(() => {
            this.initialList = data || [];
            this.nfeList = [...this.initialList];
          });
        },
        error: (err) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Erro', err?.error?.Detail?.message || 'Erro ao carregar NFes.');
          });
        }
      });
    });
  }

  initializeItems() {
    this.nfeList = [...this.initialList];
  }

  getItems(event: any) {
    this.initializeItems();
    let val = event.target.value;
    if (val != undefined) val = val.replace('*', '');
    if (val && val.trim().length > 0) {
      this.nfeList = this.nfeList.filter(item =>
        item.Grouper.toString().toLowerCase().indexOf(val.toLowerCase()) > -1
      );
    }
  }

  createByNfe(nfe: any) {
    this.basePage.newLoading().then(() => {
      this.tfaService.createTfaByNfe({ orderId: this.order.Id, nfeId: nfe.Id }).subscribe({
        next: (data) => {
          this.basePage.dismissLoading().then(() => {
            const tfaObject = data?.Data ? JSON.parse(data.Data) : data;
            this.router.navigate(['/tfa-create-by-nfe'], { state: { tfa_object: tfaObject } });
          });
        },
        error: (err) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Erro', err?.error?.Detail?.message || 'Erro ao criar TFA por NFe.');
          });
        }
      });
    });
  }
}
