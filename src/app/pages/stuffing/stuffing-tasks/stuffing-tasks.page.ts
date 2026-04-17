import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

import { BasePageService } from '../../../core/base-page.service';
import { StuffingService } from '../stuffing.service';

@Component({
  selector: 'app-stuffing-tasks',
  templateUrl: './stuffing-tasks.page.html',
  styleUrls: ['./stuffing-tasks.page.scss'],
  standalone: false,
})
export class StuffingTasksPage implements OnInit {

  public taskList: any;
  public stuffingTasksList: any[] = [];
  public initialList: any[] = [];
  public searchTerm: string = '';

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private basePage: BasePageService,
    private stuffingService: StuffingService,
  ) {}

  ngOnInit() {
    this.taskList = history.state['tasklist_object'];
  }

  ionViewDidEnter() {
    this.searchTerm = '';
    this.getList();
  }

  goBack() {
    this.navCtrl.navigateBack('/stuffing');
  }

  formatingLocal(address: string): string {
    if (!address) return '';
    const parts = address.split('-');
    return parts.join(' - ');
  }

  async getList() {
    await this.basePage.newLoading();
    this.stuffingService.getStuffingTaskCounts({ tasklistId: this.taskList?.Id }).subscribe({
      next: async (data: any) => {
        await this.basePage.dismissLoading();
        data.forEach((element: any, idx: number) => {
          data[idx].LocationAddressFormated = this.formatingLocal(element.LocationAddress);
        });
        this.initialList = data;
        this.stuffingTasksList = data;
      },
      error: async (err: any) => {
        await this.basePage.dismissLoading();
        await this.basePage.newAlert('Atenção', err?.error?.Detail?.message || 'Erro ao carregar tarefas.');
      },
    });
  }

  filterList(event: any) {
    this.stuffingTasksList = this.initialList;
    let val = event.target.value;
    if (val !== undefined) {
      val = val.replace('*', '');
    }
    if (val && val.trim().length > 3) {
      this.stuffingTasksList = this.stuffingTasksList.filter((item) =>
        item.ProductDescription.toString().toLowerCase().indexOf(val.toLowerCase()) > -1
      );
    }
  }

  async goToStuffingConference(item: any) {
    item.OrderId = this.taskList.OrderId;
    await this.basePage.newLoading();
    this.stuffingService.startConference({ taskConferenceId: item.Id }).subscribe({
      next: async (data: any) => {
        await this.basePage.dismissLoading();
        if (data.Error === true) {
          await this.basePage.newAlert('Atenção', data.Message);
        } else {
          this.router.navigate(['/stuffing-conference'], { state: { task_object: item } });
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
    this.stuffingService.finishConference({ taskId: item.Id }).subscribe({
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
