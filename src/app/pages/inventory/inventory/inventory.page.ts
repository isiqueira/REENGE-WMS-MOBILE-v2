import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasePageService } from '../../../core/base-page.service';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
  standalone: false,
})
export class InventoryPage implements OnInit {

  inventoryList: any[] = [];
  initialList: any[] = [];

  constructor(
    private router: Router,
    private basePage: BasePageService,
    private inventoryService: InventoryService,
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.getList();
  }

  initializeItems() {
    this.inventoryList = this.initialList;
  }

  getList() {
    this.inventoryService.getOrders().subscribe({
      next: async (data) => {
        this.initialList = data;
        this.initializeItems();
      },
      error: async (err) => {
        await this.basePage.newAlert('Atenção', err?.error?.Detail?.message || 'Erro ao carregar ordens.');
      },
    });
  }

  getItems(event: any) {
    this.initializeItems();
    let val = event.target.value;
    if (val != undefined) val = val.replace('*', '');
    if (val && val.trim().length > 3) {
      this.inventoryList = this.inventoryList.filter((item) =>
        item.Code.toString().toLowerCase().indexOf(val.toLowerCase()) > -1
      );
    }
  }

  goToTaskLists(item: any) {
    this.router.navigate(['/inventory-task-lists'], { state: { order_object: item } });
  }
}
