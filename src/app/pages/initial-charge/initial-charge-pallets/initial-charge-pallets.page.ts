import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { InitialChargeService } from '../initial-charge.service';
import { TypeBarcode } from '../../../enums/enums';

@Component({
  selector: 'app-initial-charge-pallets',
  templateUrl: './initial-charge-pallets.page.html',
  styleUrls: ['./initial-charge-pallets.page.scss'],
  standalone: false
})
export class InitialChargePalletsPage implements OnInit {

  public initialChargeOrder: any = {};
  public palletList: any[] = [];
  public printerItem: any = {};

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private basePage: BasePageService,
    private initialChargeService: InitialChargeService
  ) {}

  ngOnInit() {
    this.initialChargeOrder = history.state['initial_order_object'] || {};
  }

  ionViewDidEnter() {
    this.getList();
  }

  getList() {
    this.basePage.newLoading().then(() => {
      this.initialChargeService.getPalletsByOrderNfe({
        orderId: this.initialChargeOrder.order?.Id,
        nfeId: this.initialChargeOrder.nfe?.Id
      }).subscribe({
        next: (data) => {
          this.basePage.dismissLoading().then(() => {
            this.palletList = data || [];
          });
        },
        error: (err) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Erro', err?.error?.Detail?.message || 'Erro ao carregar paletes.');
          });
        }
      });
    });
  }

  goCreate() {
    this.router.navigate(['/initial-charge-pallets-create'], {
      state: { order_object: this.initialChargeOrder }
    });
  }

  goPalletItens(pallet: any) {
    const taskObject = { palletInfo: pallet, initialChargeOrder: this.initialChargeOrder };
    this.router.navigate(['/initial-charge-pallets-itens'], { state: { task_object: taskObject } });
  }

  async print(pallet: any) {
    await this.basePage.newLoading();
    this.initialChargeService.getPrinters().subscribe({
      next: async (printers) => {
        await this.basePage.dismissLoading();
        if (!printers || printers.length === 0) {
          this.basePage.newAlert('Atenção', 'Não existem impressoras cadastradas.');
          return;
        }
        this.printerItem.AlternativesPrinters = printers;
        const selected = await this.basePage.newGetBarcode(TypeBarcode.Printer, this.printerItem);
        if (!selected) return;
        printers.forEach((elem: any) => {
          if (elem.Id === selected) this.printerItem.Printer = elem.ConnectPrinterName;
        });
        await this.basePage.newToastSuccess(`Impressora: ${this.printerItem.Printer}`);
        this.printerItem.PrinterId = selected;
        await this.basePage.newLoading();
        this.initialChargeService.printSealMaster({
          identifier: pallet.Identifier,
          printerId: this.printerItem.PrinterId,
          printChildrens: true
        }).subscribe({
          next: (data) => {
            this.basePage.dismissLoading().then(() => {
              if (data?.Error) {
                this.basePage.newAlert('Erro', data.Message);
              } else {
                this.basePage.newToastSuccess('Etiqueta impressa com sucesso!');
              }
            });
          },
          error: (err) => {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newAlert('Erro', err?.error?.Detail?.message || 'Erro ao imprimir.');
            });
          }
        });
      },
      error: (err) => {
        this.basePage.dismissLoading().then(() => {
          this.basePage.newAlert('Erro', err?.error?.Detail?.message || 'Erro ao carregar impressoras.');
        });
      }
    });
  }

  async deletePallet(pallet: any) {
    const confirmed = await this.basePage.newConfirm('Deletar Palete', `Deseja deletar o palete ${pallet.Identifier}?`);
    if (!confirmed) return;
    await this.basePage.newLoading();
    this.initialChargeService.deletePallet({ identifier: pallet.Identifier }).subscribe({
      next: (data) => {
        this.basePage.dismissLoading().then(() => {
          if (data?.Error) {
            this.basePage.newAlert('Erro', data.Message);
          } else {
            this.basePage.newToastSuccess('Palete deletado com sucesso!');
            this.getList();
          }
        });
      },
      error: (err) => {
        this.basePage.dismissLoading().then(() => {
          this.basePage.newAlert('Erro', err?.error?.Detail?.message || 'Erro ao deletar palete.');
        });
      }
    });
  }
}
