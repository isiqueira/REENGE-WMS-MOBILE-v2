import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { ReceptionService } from '../../reception/reception.service';

@Component({
  selector: 'app-tfa-reception-orders',
  templateUrl: './tfa-reception-orders.page.html',
  styleUrls: ['./tfa-reception-orders.page.scss'],
  standalone: false
})
export class TfaReceptionOrdersPage implements OnInit {

  public orderList: any[] = [];
  public initialList: any[] = [];
  public isearchBar: string | null = null;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private basePage: BasePageService,
    private receptionService: ReceptionService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.isearchBar = null;
    this.getList();
  }

  getList() {
    this.basePage.newLoading().then(() => {
      this.receptionService.getOrders().subscribe({
        next: (data) => {
          this.basePage.dismissLoading().then(() => {
            this.initialList = data || [];
            this.orderList = [...this.initialList];
          });
        },
        error: (err) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Erro', err?.error?.Detail?.message || 'Erro ao carregar ordens.');
          });
        }
      });
    });
  }

  initializeItems() {
    this.orderList = [...this.initialList];
  }

  getItems(event: any) {
    this.initializeItems();
    let val = event.target.value;
    if (val != undefined) val = val.replace('*', '');
    if (val && val.trim().length > 0) {
      this.orderList = this.orderList.filter(item =>
        item.Code.toString().toLowerCase().indexOf(val.toLowerCase()) > -1
      );
    }
  }

  goNfes(order: any) {
    this.router.navigate(['/tfa-nfes'], { state: { order_object: order } });
  }
}
