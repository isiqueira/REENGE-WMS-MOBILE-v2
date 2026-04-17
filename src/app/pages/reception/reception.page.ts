import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BasePageService } from '../../core/base-page.service';
import { ReceptionService } from './reception.service';

@Component({
  selector: 'app-reception',
  templateUrl: 'reception.page.html',
  styleUrls: ['reception.page.scss'],
  standalone: false,
})
export class ReceptionPage implements OnInit {
  @ViewChild('searchBar') vsearchBar: any;

  public isearchBar: string = '';
  public receptionList: any[] = [];
  public initialList: any[] = [];

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private basePage: BasePageService,
    private receptionService: ReceptionService,
  ) {}

  ngOnInit(): void {}

  ionViewDidEnter(): void {
    this.isearchBar = '';
    this.getList();
  }

  initializeItems(): void {
    this.receptionList = this.initialList;
  }

  getList(): void {
    this.basePage.newLoading().then(() => {
      this.receptionService.getOrders().subscribe({
        next: (data: any) => {
          this.basePage.dismissLoading().then(() => {
            this.initialList = data || [];
            this.initializeItems();
          });
        },
        error: (error: any) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Erro', error?.Detail?.message || 'Erro ao carregar ordens.');
          });
        },
      });
    });
  }

  getItems(event: any): void {
    this.initializeItems();
    let val: string = event.target.value || '';
    val = val.replace('*', '');
    if (val && val.trim().length >= 2) {
      this.receptionList = this.receptionList.filter((item) =>
        item.Code.toString().toLowerCase().includes(val.toLowerCase()),
      );
    }
  }

  goNfes(item: any): void {
    this.router.navigate(['/reception-nfes'], { state: { order_object: item } });
  }

  conclude(item: any): void {
    this.basePage.newLoading().then(() => {
      this.receptionService.releaseOrderForStorage({ orderId: item.Id }).subscribe({
        next: (data: any) => {
          if (data.Error === true) {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newAlert('Atenção', data.Message);
            });
          } else {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newToastSuccess('Ordem enviada para o armazenamento').then(() => {
                this.getList();
              });
            });
          }
        },
        error: (error: any) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Erro', error?.Detail?.message || 'Erro ao armazenar ordem.');
          });
        },
      });
    });
  }
}
