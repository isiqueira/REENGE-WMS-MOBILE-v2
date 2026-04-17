import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { ReceptionService } from '../reception.service';

@Component({
  selector: 'app-reception-pallets-itens',
  templateUrl: 'reception-pallets-itens.page.html',
  styleUrls: ['reception-pallets-itens.page.scss'],
  standalone: false,
})
export class ReceptionPalletsItensPage implements OnInit {
  public isearchBar: string = '';
  public receptionPalletsItensList: any[] = [];
  public initialList: any[] = [];
  public pallet: any = null;
  public hasFiscalControl: boolean = false;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private basePage: BasePageService,
    private receptionService: ReceptionService,
  ) {
    const nav = this.router.getCurrentNavigation();
    this.pallet = nav?.extras?.state?.['task_object'] ?? history.state?.task_object;
    if (this.pallet) {
      this.hasFiscalControl = this.pallet.receptionOrder?.order?.OwnerAllowControlFiscal ?? false;
    }
  }

  ngOnInit(): void {}

  ionViewDidEnter(): void {
    this.isearchBar = '';
    this.getList();
  }

  initializeItems(): void {
    this.receptionPalletsItensList = this.initialList;
  }

  goBack(): void {
    this.navCtrl.navigateBack('/reception-pallets');
  }

  goCreatePalletItem(): void {
    if (this.pallet) {
      const currentCount = this.receptionPalletsItensList?.length ?? 0;
      this.pallet.palletInfo.Quantity =
        this.pallet.palletInfo.Quantity < currentCount
          ? currentCount
          : this.pallet.palletInfo.Quantity;
    }
    this.router.navigate(['/reception-pallets-itens-create-unitary'], {
      state: { task_object: this.pallet },
    });
  }

  getList(): void {
    if (!this.pallet) return;
    this.basePage.newLoading().then(() => {
      this.receptionService
        .getPalletsItens({ identifier: this.pallet.palletInfo.Identifier })
        .subscribe({
          next: (data: any) => {
            this.basePage.dismissLoading().then(() => {
              this.initialList = data || [];
              this.initializeItems();
            });
          },
          error: (error: any) => {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newAlert(
                'Erro',
                error?.Detail?.message || 'Erro ao carregar itens.',
              );
            });
          },
        });
    });
  }

  getItems(event: any): void {
    this.initializeItems();
    let val: string = event.target.value || '';
    val = val.replace('*', '');
    if (val && val.trim().length > 3) {
      this.receptionPalletsItensList = this.receptionPalletsItensList.filter((item) =>
        item.ProductDescription.toString().toLowerCase().includes(val.toLowerCase()),
      );
    }
  }

  print(item: any): void {
    this.basePage.newLoading().then(() => {
      this.receptionService.printSeal({ identifier: item.Identifier }).subscribe({
        next: (data: any) => {
          if (data.Error === true) {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newAlert('Erro de Impressão', data.Message);
            });
          } else {
            this.basePage.dismissLoading().then(() => {
              this.basePage.newToastSuccess('Etiqueta impressa com sucesso');
            });
          }
        },
        error: (error: any) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Erro', error?.Detail?.message || 'Erro ao imprimir.');
          });
        },
      });
    });
  }
}
