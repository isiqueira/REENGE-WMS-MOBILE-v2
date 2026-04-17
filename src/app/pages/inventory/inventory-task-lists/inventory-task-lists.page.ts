import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BasePageService } from '../../../core/base-page.service';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-inventory-task-lists',
  templateUrl: './inventory-task-lists.page.html',
  styleUrls: ['./inventory-task-lists.page.scss'],
  standalone: false,
})
export class InventoryTaskListsPage implements OnInit {

  inventoryOrder: any = {};
  inventoryTaskLists: any[] = [];
  initialList: any[] = [];

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private basePage: BasePageService,
    private inventoryService: InventoryService,
  ) {}

  ngOnInit() {
    this.inventoryOrder = history.state['order_object'] || {};
  }

  ionViewDidEnter() {
    this.getList();
  }

  initializeItems() {
    this.inventoryTaskLists = this.initialList;
  }

  getList() {
    this.inventoryService.getInventoriesByOrder({ orderId: this.inventoryOrder.Id }).subscribe({
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
    if (val && val.trim().length > 2) {
      this.inventoryTaskLists = this.inventoryTaskLists.filter((item) =>
        item.Id.toString().toLowerCase().indexOf(val.toLowerCase()) > -1
      );
    }
  }

  async goToInventoryMasters(item: any) {
    await this.basePage.newLoading();
    this.inventoryService.verifyReadyForInventory({ taskListId: item.Id }).subscribe({
      next: async (data) => {
        await this.basePage.dismissLoading();
        if (data.Error === true) {
          await this.basePage.newAlert('Atenção', data.Message);
        } else {
          await this.basePage.newToastSuccess('Tarefa disponivel para inventariar!');
          this.router.navigate(['/inventory-masters'], { state: { tasklist_object: item } });
        }
      },
      error: async (err) => {
        await this.basePage.dismissLoading();
        await this.basePage.newAlert('Atenção', err?.error?.Detail?.message || 'Erro ao verificar tarefa.');
      },
    });
  }
}
