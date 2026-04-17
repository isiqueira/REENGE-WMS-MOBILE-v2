import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { PickingService } from '../picking.service';
import { TypeBarcode } from '../../../enums/enums';

@Component({
  selector: 'app-picking-task-lists',
  templateUrl: 'picking-task-lists.page.html',
  styleUrls: ['picking-task-lists.page.scss'],
  standalone: false,
})
export class PickingTaskListsPage {
  @ViewChild('searchBar') vsearchBar: any;

  public isearchBar: string = '';
  public pickingOrder: any = null;
  public pickingTaskLists: any[] = [];
  public initialList: any[] = [];

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private basePage: BasePageService,
    public pickingService: PickingService,
  ) {}

  ngOnInit(): void {
    this.pickingOrder = history.state['tasklist_object'];
  }

  ionViewDidEnter(): void {
    this.isearchBar = '';
    this.getList();
  }

  goBack(): void {
    this.navCtrl.navigateBack('/picking');
  }

  initializeItems(): void {
    this.pickingTaskLists = this.initialList;
  }

  getList(): void {
    if (!this.pickingOrder) return;
    this.basePage.newLoading().then(() => {
      this.pickingService.getPickingsByOrder({ orderId: this.pickingOrder.Id }).subscribe({
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
      this.pickingTaskLists = this.pickingTaskLists.filter((item) =>
        item.OrderCode.toString().toLowerCase().includes(val.toLowerCase()),
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
  }

  goToPickingTasks(item: any): void {
    if (!this.pickingOrder.OwnerPickingByOperator) {
      this.basePage.newLoading().then(() => {
        this.pickingService.verifyOperator({ taskListId: item.Id }).subscribe({
          next: (data: any) => {
            if (data.Error === true) {
              this.basePage.dismissLoading().then(async () => {
                await this.basePage.newAlert('Atenção', data.Message);
                this.getList();
              });
            } else {
              this.basePage.dismissLoading().then(() => {
                this.router.navigate(['/picking-tasks'], { state: { tasklist_object: item } });
              });
            }
          },
          error: (error: any) => {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newAlert('Atenção', error?.Detail?.message || 'Erro ao verificar operador.');
            });
          },
        });
      });
    }
  }
}
