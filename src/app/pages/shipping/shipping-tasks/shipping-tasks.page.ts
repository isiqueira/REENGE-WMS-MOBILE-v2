import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

import { BasePageService } from '../../../core/base-page.service';
import { ShippingService } from '../shipping.service';

@Component({
  selector: 'app-shipping-tasks',
  templateUrl: './shipping-tasks.page.html',
  styleUrls: ['./shipping-tasks.page.scss'],
  standalone: false,
})
export class ShippingTasksPage implements OnInit {

  public taskList: any;
  public shippingTasksList: any[] = [];
  public initialList: any[] = [];
  public searchTerm: string = '';

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private basePage: BasePageService,
    private shippingService: ShippingService,
  ) {}

  ngOnInit() {
    this.taskList = history.state['tasklist_object'];
  }

  ionViewDidEnter() {
    this.searchTerm = '';
    this.getList();
  }

  goBack() {
    this.navCtrl.navigateBack('/shipping');
  }

  formatingLocal(address: string): string {
    if (!address) return '';
    const parts = address.split('-');
    return parts.join(' - ');
  }

  async getList() {
    await this.basePage.newLoading();
    this.shippingService.getShippingTaskCounts({ tasklistId: this.taskList?.Id }).subscribe({
      next: async (data: any) => {
        await this.basePage.dismissLoading();
        data.forEach((element: any, idx: number) => {
          data[idx].LocationAddressFormated = this.formatingLocal(element.LocationAddress);
        });
        this.initialList = data;
        this.shippingTasksList = data;
      },
      error: async (err: any) => {
        await this.basePage.dismissLoading();
        await this.basePage.newAlert('Atenção', err?.error?.Detail?.message || 'Erro ao carregar tarefas.');
      },
    });
  }

  filterList(event: any) {
    this.shippingTasksList = this.initialList;
    let val = event.target.value;
    if (val !== undefined) {
      val = val.replace('*', '');
    }
    if (val && val.trim().length > 3) {
      this.shippingTasksList = this.shippingTasksList.filter((item) =>
        item.ProductDescription.toString().toLowerCase().indexOf(val.toLowerCase()) > -1
      );
    }
  }

  async goToShippingConference(item: any) {
    item.OrderId = this.taskList.OrderId;
    await this.basePage.newLoading();
    this.shippingService.startConference({ taskConferenceId: item.Id }).subscribe({
      next: async (data: any) => {
        await this.basePage.dismissLoading();
        if (data.Error === true) {
          await this.basePage.newAlert('Atenção', data.Message);
        } else {
          this.router.navigate(['/shipping-conference'], { state: { task_object: item } });
        }
      },
      error: async (err: any) => {
        await this.basePage.dismissLoading();
        await this.basePage.newAlert('Atenção', err?.error?.Detail?.message || 'Erro ao iniciar conferência.');
      },
    });
  }

  async conclude(item: any) {
    await this.basePage.newLoading();
    this.shippingService.finishConference({ taskId: item.Id }).subscribe({
      next: async (data: any) => {
        await this.basePage.dismissLoading();
        if (data.Error === true) {
          await this.basePage.newAlert('Atenção', data.Message);
        } else {
          await this.basePage.newToastSuccess('Conferência finalizada com sucesso!');
          this.getList();
        }
      },
      error: async (err: any) => {
        await this.basePage.dismissLoading();
        await this.basePage.newAlert('Atenção', err?.error?.Detail?.message || 'Erro ao finalizar conferência.');
      },
    });
  }
}
