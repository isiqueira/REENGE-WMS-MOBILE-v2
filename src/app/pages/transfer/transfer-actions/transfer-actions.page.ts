import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BasePageService } from '../../../core/base-page.service';
import { TransferService } from '../transfer.service';

@Component({
  selector: 'app-transfer-actions',
  templateUrl: './transfer-actions.page.html',
  styleUrls: ['./transfer-actions.page.scss'],
  standalone: false,
})
export class TransferActionsPage implements OnInit {

  task: any = {};

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private basePage: BasePageService,
    private transferService: TransferService,
  ) {}

  ngOnInit() {
    this.task = history.state['task_object'] || {};
  }

  goBack() {
    this.navCtrl.navigateBack('/transfer-tasks');
  }

  async getTask() {
    await this.basePage.newLoading();
    this.transferService.getTaskTransfer({ taskTransferId: this.task.Id }).subscribe({
      next: async (data) => {
        await this.basePage.dismissLoading();
        if (data == null) {
          await this.basePage.newAlert('Atenção', 'Não existem mais itens para coleta');
        } else {
          this.router.navigate(['/transfer-collect'], { state: { task_object: data } });
        }
      },
      error: async (err) => {
        await this.basePage.dismissLoading();
        await this.basePage.newAlert('Atenção', err?.error?.Detail?.message || 'Erro ao buscar tarefa.');
      },
    });
  }

  goCollect() {
    this.getTask();
  }

  goStorage() {
    this.router.navigate(['/transfer-storage'], { state: { task_object: this.task } });
  }
}
