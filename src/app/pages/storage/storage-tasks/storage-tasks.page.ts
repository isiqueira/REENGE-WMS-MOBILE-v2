import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-storage-tasks',
  templateUrl: 'storage-tasks.page.html',
  styleUrls: ['storage-tasks.page.scss'],
  standalone: false,
})
export class StorageTasksPage {
  @ViewChild('searchBar') vsearchBar: any;

  public isearchBar: string = '';
  public storageTaskList: any = null;
  public storageTasks: any[] = [];
  public initialList: any[] = [];

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private basePage: BasePageService,
    private storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.storageTaskList = history.state['tasklist_object'];
  }

  ionViewDidEnter(): void {
    this.isearchBar = '';
    this.getList();
  }

  initializeItems(): void {
    this.storageTasks = this.initialList;
  }

  formatingLocal(address: string): string {
    if (!address) return '';
    return address.replace(/-/g, ' - ');
  }

  getList(): void {
    if (!this.storageTaskList) return;
    this.basePage.newLoading().then(() => {
      this.storageService.getStoragesTasks({ taskListId: this.storageTaskList.Id }).subscribe({
        next: (data: any) => {
          const items = data || [];
          items.forEach((element: any, idx: number) => {
            items[idx].LocalOriginForecastAddressFormated = this.formatingLocal(element.LocalOriginForecastAddress);
            items[idx].LocalDestinationForecastAddressFormated = this.formatingLocal(element.LocalDestinationForecastAddress);
          });
          this.basePage.dismissLoading().then(() => {
            this.initialList = items;
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
    if (val && val.trim().length > 3) {
      this.storageTasks = this.storageTasks.filter((item) =>
        item.SealIdentifier.toString().toLowerCase().includes(val.toLowerCase()),
      );
    }
  }

  goStorage(item: any): void {
    this.router.navigate(['/storage-confirm'], { state: { task_object: item } });
  }
}
