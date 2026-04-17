import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-storage',
  templateUrl: 'storage.page.html',
  styleUrls: ['storage.page.scss'],
  standalone: false,
})
export class StoragePage {
  @ViewChild('searchBar') vsearchBar: any;

  public isearchBar: string = '';
  public storageOrdersList: any[] = [];
  public initialList: any[] = [];

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private basePage: BasePageService,
    private storageService: StorageService,
  ) {}

  ngOnInit(): void {}

  ionViewDidEnter(): void {
    this.isearchBar = '';
    this.getList();
  }

  initializeItems(): void {
    this.storageOrdersList = this.initialList;
  }

  getList(): void {
    this.basePage.newLoading().then(() => {
      this.storageService.getStoragesOrders().subscribe({
        next: (data: any) => {
          this.basePage.dismissLoading().then(() => {
            this.initialList = data || [];
            this.initializeItems();
          });
        },
        error: (error: any) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Atenção', error?.Detail?.message || 'Erro ao carregar ordens.');
          });
        },
      });
    });
  }

  getItems(event: any): void {
    this.initializeItems();
    let val: string = event.target.value || '';
    val = val.replace('*', '');
    if (val && val.trim().length > 3) {
      this.storageOrdersList = this.storageOrdersList.filter((item) =>
        item.SealIdentifier.toString().toLowerCase().includes(val.toLowerCase()),
      );
    }
  }

  goToStorageTaskLists(item: any): void {
    this.router.navigate(['/storage-task-lists'], { state: { order_object: item } });
  }
}
