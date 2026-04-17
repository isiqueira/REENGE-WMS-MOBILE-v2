import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BasePageService } from '../../../core/base-page.service';
import { TransferService } from '../transfer.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
  standalone: false,
})
export class TransferPage implements OnInit {

  @ViewChild('identifier') identifierInput!: ElementRef;

  seal: any = { Identifier: '' };
  transferList: any[] = [];
  initialList: any[] = [];
  isReadonly = false;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private basePage: BasePageService,
    private transferService: TransferService,
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.getList();
    this.clearObj();
    setTimeout(() => {
      this.identifierInput?.nativeElement?.focus();
    }, 800);
  }

  clearObj() {
    this.seal.Identifier = '';
  }

  goBack() {
    this.navCtrl.navigateBack('/home');
  }

  onChangeIdentifier() {
    if (this.seal.Identifier != null) {
      if (this.seal.Identifier.toString().indexOf('*') !== -1) {
        this.isReadonly = true;
        this.seal.Identifier = this.seal.Identifier.replace('*', '');
        this.sendToTransfer();
      }
    }
  }

  initializeItems() {
    this.transferList = this.initialList;
  }

  getList() {
    this.transferService.getSealsToTransfer().subscribe({
      next: async (data) => {
        this.initialList = data;
        this.initializeItems();
      },
      error: async (err) => {
        await this.basePage.newAlert('Atenção', err?.error?.Detail?.message || 'Erro ao carregar lista.');
      },
    });
  }

  goToStorage(item: any) {
    this.router.navigate(['/transfer-storage'], { state: { task_object: item } });
  }

  clear() {
    this.clearObj();
    this.isReadonly = false;
    this.beginPrompts();
  }

  beginPrompts() {
    setTimeout(() => {
      this.identifierInput?.nativeElement?.focus();
    }, 500);
  }

  async sendToTransfer() {
    await this.basePage.newLoading();
    this.transferService.sealToTransfer({ identifier: this.seal.Identifier }).subscribe({
      next: async (data) => {
        await this.basePage.dismissLoading();
        if (data.Error === true) {
          await this.basePage.newAlert('Atenção', data.Message);
          this.clear();
        } else {
          await this.basePage.newToastSuccess('Item criado com sucesso!');
          this.clear();
          this.getList();
        }
      },
      error: async (err) => {
        await this.basePage.dismissLoading();
        await this.basePage.newAlert('Atenção', err?.error?.Detail?.message || 'Erro ao transferir.');
        this.clear();
      },
    });
  }
}
