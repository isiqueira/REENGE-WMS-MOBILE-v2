import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { InitialChargeService } from '../initial-charge.service';

@Component({
  selector: 'app-initial-charge-pallets-itens',
  templateUrl: './initial-charge-pallets-itens.page.html',
  styleUrls: ['./initial-charge-pallets-itens.page.scss'],
  standalone: false
})
export class InitialChargePalletsItensPage implements OnInit {

  @ViewChild('searchBar') searchBar: any;

  public pallet: any = {};
  public hasFiscalControl: boolean = false;
  public palletItensList: any[] = [];
  public initialList: any[] = [];
  public isearchBar: string | null = null;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private basePage: BasePageService,
    private initialChargeService: InitialChargeService
  ) {}

  ngOnInit() {
    this.pallet = history.state['task_object'] || {};
    this.hasFiscalControl = this.pallet.initialChargeOrder?.order?.OwnerAllowControlFiscal;
  }

  ionViewDidEnter() {
    this.isearchBar = null;
    this.getList();
  }

  initializeItems() {
    this.palletItensList = [...this.initialList];
  }

  getList() {
    this.basePage.newLoading().then(() => {
      this.initialChargeService.getPalletsItens({
        identifier: this.pallet.palletInfo?.Identifier
      }).subscribe({
        next: (data) => {
          this.basePage.dismissLoading().then(() => {
            this.initialList = data || [];
            this.initializeItems();
          });
        },
        error: (err) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Erro', err?.error?.Detail?.message || 'Erro ao carregar itens.');
          });
        }
      });
    });
  }

  getItems(event: any) {
    this.initializeItems();
    let val = event.target.value;
    if (val != undefined) val = val.replace('*', '');
    if (val && val.trim().length > 3) {
      this.palletItensList = this.palletItensList.filter(item =>
        item.ProductDescription.toString().toLowerCase().indexOf(val.toLowerCase()) > -1
      );
    }
  }

  goCreatePalletItem() {
    this.pallet.palletInfo.Quantity = this.pallet.palletInfo.Quantity < this.palletItensList.length
      ? this.palletItensList.length
      : this.pallet.palletInfo.Quantity;
    this.router.navigate(['/initial-charge-pallets-itens-create-unitary'], {
      state: { task_object: this.pallet }
    });
  }

  print(item: any) {
    this.basePage.newLoading().then(() => {
      this.initialChargeService.printSeal({ identifier: item.Identifier }).subscribe({
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
    });
  }
}
