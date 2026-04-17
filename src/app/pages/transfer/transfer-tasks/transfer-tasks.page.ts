import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BasePageService } from '../../../core/base-page.service';
import { TransferService } from '../transfer.service';

@Component({
  selector: 'app-transfer-tasks',
  templateUrl: './transfer-tasks.page.html',
  styleUrls: ['./transfer-tasks.page.scss'],
  standalone: false,
})
export class TransferTasksPage implements OnInit {

  order: any = {};
  transferTasksList: any[] = [];
  initialList: any[] = [];

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private basePage: BasePageService,
    private transferService: TransferService,
  ) {}

  ngOnInit() {
    this.order = history.state['order_object'] || {};
  }

  ionViewDidEnter() {
    this.getList();
  }

  initializeItems() {
    this.transferTasksList = this.initialList;
  }

  getList() {
    this.transferService.getTransfers({ orderId: this.order.Id }).subscribe({
      next: async (data) => {
        this.initialList = data;
        this.initializeItems();
      },
      error: async (err) => {
        await this.basePage.newAlert('Atenção', err?.error?.Detail?.message || 'Erro ao carregar tarefas.');
      },
    });
  }

  getItems(event: any) {
    this.initializeItems();
    let val = event.target.value;
    if (val != undefined) val = val.replace('*', '');
    if (val && val.trim().length > 3) {
      this.transferTasksList = this.transferTasksList.filter((item) =>
        item.Code.toString().toLowerCase().indexOf(val.toLowerCase()) > -1
      );
    }
  }

  goToActions(item: any) {
    this.router.navigate(['/transfer-actions'], { state: { task_object: item } });
  }
}
