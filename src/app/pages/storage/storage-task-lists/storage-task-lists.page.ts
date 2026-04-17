import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-storage-task-lists',
  templateUrl: 'storage-task-lists.page.html',
  styleUrls: ['storage-task-lists.page.scss'],
  standalone: false,
})
export class StorageTaskListsPage {
  @ViewChild('searchBar') vsearchBar: any;

  public isearchBar: string = '';
  public storageOrder: any = null;
  public storageTaskLists: any[] = [];
  public initialList: any[] = [];

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private basePage: BasePageService,
    private storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.storageOrder = history.state['order_object'];
  }

  ionViewDidEnter(): void {
    this.isearchBar = '';
    this.getList();
  }

  goBack(): void {
    this.navCtrl.navigateBack('/storage');
  }

  initializeItems(): void {
    this.storageTaskLists = this.initialList;
  }

  getList(): void {
    if (!this.storageOrder) return;
    this.basePage.newLoading().then(() => {
      this.storageService.getStoragesByOrder({ orderId: this.storageOrder.Id }).subscribe({
        next: (data: any) => {
          this.basePage.dismissLoading().then(() => {
            this.initialList = data || [];
            this.initializeItems();
          });
        },
        error: (error: any) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Atenção', error?.Detail?.message || 'Erro ao carregar tarefas.');
          });
        },
      });
    });
  }

  getItems(event: any): void {
    this.initializeItems();
    let val: string = event.target.value || '';
    val = val.replace('*', '');
    if (val && val.trim().length > 2) {
      this.storageTaskLists = this.storageTaskLists.filter((item) =>
        item.OrderCode.toString().toLowerCase().includes(val.toLowerCase()),
      );
    }
  }

  goToStorageTasks(item: any): void {
    this.router.navigate(['/storage-tasks'], { state: { tasklist_object: item } });
  }
}
