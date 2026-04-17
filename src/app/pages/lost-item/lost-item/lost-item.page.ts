import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { LostItemService } from '../lost-item.service';

@Component({
  selector: 'app-lost-item',
  templateUrl: './lost-item.page.html',
  styleUrls: ['./lost-item.page.scss'],
  standalone: false
})
export class LostItemPage implements OnInit {

  public isearchBar: string | null = null;
  public lostItemList: any = [];
  public initialList: any = [];

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private basePage: BasePageService,
    private lostItemService: LostItemService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.isearchBar = null;
    this.getList();
  }

  goToDevolution(item: any) {
    this.router.navigate(['/lost-item-devolution'], { state: { item_object: item } });
  }

  initializeItems() {
    this.lostItemList = this.initialList;
  }

  goBack() {
    this.navCtrl.back();
  }

  getList() {
    this.basePage.newLoading().then(() => {
      this.lostItemService.getLostItens().subscribe({
        next: (data) => {
          this.basePage.dismissLoading().then(() => {
            this.initialList = data || [];
            this.initializeItems();
            if (!data || data.length === 0) {
              this.basePage.newToast('Nenhum item perdido.');
            }
          });
        },
        error: (err) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Erro', err?.error?.Detail?.message || 'Erro ao carregar itens.');
          });
        }
      });
    });
  }

  getItems(event: any) {
    this.initializeItems();
    let val = event.target?.value;
    if (val != undefined) val = val.replace('*', '');
    if (val && val.trim().length > 3) {
      this.lostItemList = this.lostItemList.filter((item: any) => {
        return (item.Grouper.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }
}
