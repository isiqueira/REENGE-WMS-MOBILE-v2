import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { PickingService } from '../picking.service';
import { TypeBarcode } from '../../../enums/enums';

@Component({
  selector: 'app-picking-tasks',
  templateUrl: 'picking-tasks.page.html',
  styleUrls: ['picking-tasks.page.scss'],
  standalone: false,
})
export class PickingTasksPage {
  @ViewChild('searchBar') vsearchBar: any;

  public isearchBar: string = '';
  public taskList: any = null;
  public pickingTasksList: any[] = [];
  public initialList: any[] = [];

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private basePage: BasePageService,
    public pickingService: PickingService,
  ) {}

  ngOnInit(): void {
    this.taskList = history.state['tasklist_object'];
  }

  ionViewDidEnter(): void {
    this.isearchBar = '';
    this.getList();
  }

  goBack(): void {
    this.navCtrl.navigateBack('/picking-task-lists');
  }

  initializeItems(): void {
    this.pickingTasksList = this.initialList;
  }

  formatingLocal(address: string): string {
    if (!address) return '';
    return address.replace(/-/g, ' - ');
  }

  getList(): void {
    if (!this.taskList) return;
    this.basePage.newLoading().then(() => {
      this.pickingService.getPickingTasks({ tasklistId: this.taskList.Id }).subscribe({
        next: (data: any) => {
          const items = data || [];
          items.forEach((element: any, idx: number) => {
            items[idx].LocalOriginForecastAddressFormated = this.formatingLocal(element.LocalOriginForecastAddress);
            items[idx].LocalDestinationForecastAddressFormated = this.formatingLocal(element.LocalDestinationForecastAddress);
          });
          this.initialList = items;
          this.initializeItems();
          this.basePage.dismissLoading().then(() => {
            if (this.pickingService.locationsIsSet) {
              this.isearchBar = this.pickingService.locationFilter.Location;
              this.filterList();
            }
          });
        },
        error: (error: any) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Atenção', error?.Detail?.message || 'Erro ao carregar coletas.');
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
      this.pickingTasksList = this.pickingTasksList.filter((item) =>
        item.ProductDescription.toString().toLowerCase().includes(val.toLowerCase()) ||
        item.LocalOriginForecastAddress.toString().toLowerCase().includes(val.toLowerCase()),
      );
    }
  }

  filterList(): void {
    this.initializeItems();
    let val = this.pickingService.locationFilter.Location;
    if (val != undefined) val = val.replace('*', '');
    if (val) {
      this.pickingTasksList = this.pickingTasksList.filter((item) =>
        item.ProductDescription.toString().toLowerCase().includes(val.toLowerCase()) ||
        item.LocalOriginForecastAddress.toString().toLowerCase().includes(val.toLowerCase()),
      );
    }
  }

  async setPickingLocation(): Promise<void> {
    const barcode = await this.basePage.newGetBarcode(TypeBarcode.LOCATION);
    if (!barcode) {
      this.goBack();
      return;
    }
    this.basePage.newLoading().then(() => {
      this.pickingService.getLocation({ address: barcode }).subscribe({
        next: (data: any) => {
          if (data == null) {
            this.basePage.dismissLoading().then(async () => {
              await this.basePage.newAlert('Atenção', 'Código informado é Inválido.');
              this.setPickingLocation();
            });
          } else {
            this.basePage.dismissLoading().then(() => {
              this.pickingService.locationFilter.LocationId = data.Id;
              this.pickingService.locationFilter.Location = data.Address;
              this.pickingService.locationsIsSet = true;
              this.isearchBar = this.pickingService.locationFilter.Location;
              this.filterList();
            });
          }
        },
        error: (error: any) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Atenção', error?.Detail?.message || 'Erro ao buscar local.');
          });
        },
      });
    });
  }

  resetPickingLocation(): void {
    this.pickingService.locationFilter = {};
    this.pickingService.locationsIsSet = false;
    this.isearchBar = '';
    this.filterList();
  }

  async showQuantityError(item: any): Promise<void> {
    const c = await this.basePage.newConfirm('Atenção!', 'Foi coletado uma quantidade menor que o previsto, deseja continuar?');
    if (c) {
      this.router.navigate(['/picking-storage-confirm'], { state: { task_object: item } });
    }
  }

  goToStoragePicking(item: any): void {
    if (item.QuantityOriginForecast > item.QuantityOriginReal) {
      this.showQuantityError(item);
    } else {
      this.router.navigate(['/picking-storage-confirm'], { state: { task_object: item } });
    }
  }

  goToPickingTasks(item: any): void {
    if (item.QuantityOriginForecast === item.QuantityOriginReal) {
      this.router.navigate(['/picking-storage-confirm'], { state: { task_object: item } });
    } else {
      this.basePage.newLoading().then(() => {
        this.pickingService.startPickingTask({ taskTransferId: item.Id }).subscribe({
          next: (data: any) => {
            if (data.Error === true) {
              this.basePage.dismissLoading().then(() => {
                this.basePage.newAlert('Atenção', data.Message);
              });
            } else {
              this.basePage.dismissLoading().then(() => {
                this.router.navigate(['/picking-item'], { state: { task_object: item } });
              });
            }
          },
          error: (error: any) => {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newAlert('Atenção', error?.Detail?.message || 'Erro ao iniciar tarefa.');
            });
          },
        });
      });
    }
  }
}
