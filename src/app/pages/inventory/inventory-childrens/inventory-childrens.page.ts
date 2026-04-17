import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-inventory-childrens',
  templateUrl: './inventory-childrens.page.html',
  styleUrls: ['./inventory-childrens.page.scss'],
  standalone: false,
})
export class InventoryChildrensPage implements OnInit {

  @ViewChild('identifier') identifierInput!: ElementRef;

  inventoryItem: any = {};
  inventoryTaskList: any = {};
  master: any = {};
  inventoryChildrens: any[] = [];
  initialList: any[] = [];
  isReadonly = false;

  constructor(
    private navCtrl: NavController,
    private basePage: BasePageService,
    private inventoryService: InventoryService,
  ) {}

  ngOnInit() {
    const obj = history.state['object'] || {};
    this.inventoryTaskList = obj.TaskList || {};
    this.master = obj.Master || {};
  }

  ionViewDidEnter() {
    this.getList();
    this.instantiateCommon();
  }

  instantiateCommon() {
    this.inventoryItem.Identifier = null;
    this.inventoryItem.TaskListId = this.inventoryTaskList.Id;
    this.inventoryItem.LocationId = this.inventoryTaskList.LocationId;
  }

  clearCollect() {
    this.inventoryItem.Identifier = null;
    this.isReadonly = false;
    setTimeout(() => {
      this.identifierInput?.nativeElement?.focus();
    }, 500);
  }

  onChangeIdentifier() {
    if (this.inventoryItem.Identifier !== null) {
      if (this.inventoryItem.Identifier.toString().indexOf('*') !== -1) {
        this.isReadonly = true;
        this.inventoryItem.Identifier = this.inventoryItem.Identifier.replace('*', '');
        this.saveItem();
      }
    }
  }

  checkBlur() {
    this.identifierInput?.nativeElement?.focus();
  }

  goBack() {
    this.navCtrl.navigateBack('/inventory-masters');
  }

  initializeItems() {
    this.inventoryChildrens = this.initialList;
  }

  getList() {
    this.inventoryService.getChildrensByMaster({
      taskListId: this.inventoryTaskList.Id,
      sealMasterId: this.master.Id,
    }).subscribe({
      next: async (data) => {
        this.initialList = data;
        this.initializeItems();
      },
      error: async (err) => {
        await this.basePage.newAlert('Atenção', err?.error?.Detail?.message || 'Erro ao carregar filhos.');
      },
    });
  }

  async saveItem() {
    await this.basePage.newLoading();
    this.inventoryService.addInventoryItem({
      taskListId: this.inventoryItem.TaskListId,
      locationId: this.inventoryItem.LocationId,
      identifier: this.inventoryItem.Identifier,
    }).subscribe({
      next: async (data) => {
        await this.basePage.dismissLoading();
        if (data.Error === true) {
          await this.basePage.newAlert('Atenção', data.Message);
          this.clearCollect();
        } else {
          await this.basePage.newAlert('Atenção', 'Item adicionado com sucesso!');
          this.clearCollect();
          this.getList();
        }
      },
      error: async (err) => {
        await this.basePage.dismissLoading();
        await this.basePage.newAlert('Atenção', err?.error?.Detail?.message || 'Erro ao adicionar item.');
      },
    });
  }

  async removeItem(item: any) {
    await this.basePage.newLoading();
    this.inventoryService.removeInventoryItem({
      taskListId: this.inventoryTaskList.Id,
      locationId: this.inventoryTaskList.LocationId,
      identifier: item.Identifier,
    }).subscribe({
      next: async (data) => {
        await this.basePage.dismissLoading();
        if (data.Error === true) {
          await this.basePage.newAlert('Atenção', data.Message);
          this.clearCollect();
        } else {
          await this.basePage.newAlert('Atenção', 'Item removido com sucesso!');
          this.clearCollect();
          this.getList();
        }
      },
      error: async (err) => {
        await this.basePage.dismissLoading();
        await this.basePage.newAlert('Atenção', err?.error?.Detail?.message || 'Erro ao remover item.');
      },
    });
  }
}
