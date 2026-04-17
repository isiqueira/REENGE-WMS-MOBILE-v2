import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { PickingService } from '../picking.service';

@Component({
  selector: 'app-picking',
  templateUrl: 'picking.page.html',
  styleUrls: ['picking.page.scss'],
  standalone: false,
})
export class PickingPage {
  @ViewChild('searchBar') vsearchBar: any;

  public isearchBar: string = '';
  public pickingOrdersList: any[] = [];
  public initialList: any[] = [];

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private basePage: BasePageService,
    private pickingService: PickingService,
  ) {}

  ngOnInit(): void {}

  ionViewDidEnter(): void {
    this.isearchBar = '';
    this.getList();
  }

  initializeItems(): void {
    this.pickingOrdersList = this.initialList;
  }

  getList(): void {
    this.basePage.newLoading().then(() => {
      this.pickingService.getPickingsOrders().subscribe({
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
    if (val && val.trim().length > 2) {
      this.pickingOrdersList = this.pickingOrdersList.filter((item) =>
        item.OrderCode.toString().toLowerCase().includes(val.toLowerCase()),
      );
    }
  }

  goToPickingTaskLists(item: any): void {
    this.router.navigate(['/picking-task-lists'], { state: { tasklist_object: item } });
  }
}
