import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { StorageService } from '../storage.service';
import { TypeBarcode } from '../../../enums/enums';

@Component({
  selector: 'app-storage-confirm',
  templateUrl: 'storage-confirm.page.html',
  styleUrls: ['storage-confirm.page.scss'],
  standalone: false,
})
export class StorageConfirmPage {
  public task: any = null;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private basePage: BasePageService,
    private storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.task = history.state['task_object'];
  }

  ionViewDidEnter(): void {
    this.showPromptIdentifier();
  }

  goBack(): void {
    this.navCtrl.navigateBack('/storage-tasks');
  }

  goConclude(): void {
    this.router.navigate(['/storage-conclude'], { state: { task_object: this.task } });
  }

  startStorage(): void {
    this.basePage.newLoading().then(() => {
      this.storageService.startStorage({
        taskListId: this.task.TaskListId,
        identifier: this.task.SealIdentifier,
      }).subscribe({
        next: (data: any) => {
          if (data.Error === true) {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newAlert('Atenção', data.Message);
            });
          } else {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newToastSuccess('Tarefa de armazenagem iniciada!').then(() => {
                this.task.jsonStorage = JSON.parse(data.Data);
                this.goConclude();
              });
            });
          }
        },
        error: (error: any) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Atenção', error?.Detail?.message || 'Erro ao iniciar armazenagem.');
          });
        },
      });
    });
  }

  async showPromptIdentifier(): Promise<void> {
    const barcode = await this.basePage.newGetBarcode(TypeBarcode.SEAL);
    if (!barcode) {
      this.goBack();
      return;
    }
    if (barcode === this.task.SealIdentifier) {
      await this.basePage.newToastSuccess('Item válido');
      this.startStorage();
    } else {
      await this.basePage.newAlert('Atenção', 'Item inválido');
      this.showPromptIdentifier();
    }
  }
}
