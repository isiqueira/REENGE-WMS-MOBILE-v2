import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { InitialChargeService } from '../initial-charge.service';
import { TypeBarcode } from '../../../enums/enums';

@Component({
  selector: 'app-initial-charge-nfes',
  templateUrl: './initial-charge-nfes.page.html',
  styleUrls: ['./initial-charge-nfes.page.scss'],
  standalone: false
})
export class InitialChargeNfesPage implements OnInit {

  public order: any = {};
  public nfeList: any[] = [];
  public initialList: any[] = [];
  public isearchBar: string | null = null;
  public printerItem: any = {};
  public printChildrens: boolean = true;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private basePage: BasePageService,
    private initialChargeService: InitialChargeService
  ) {}

  ngOnInit() {
    this.order = history.state['order_object'] || {};
  }

  ionViewDidEnter() {
    this.isearchBar = null;
    this.getList();
  }

  getList() {
    this.basePage.newLoading().then(() => {
      this.initialChargeService.getNfeForOrder({ orderId: this.order.Id }).subscribe({
        next: (data) => {
          this.basePage.dismissLoading().then(() => {
            this.initialList = data || [];
            this.nfeList = [...this.initialList];
          });
        },
        error: (err) => {
          this.basePage.dismissLoading().then(() => {
            this.basePage.newAlert('Erro', err?.error?.Detail?.message || 'Erro ao carregar NFes.');
          });
        }
      });
    });
  }

  initializeItems() {
    this.nfeList = [...this.initialList];
  }

  getItems(event: any) {
    this.initializeItems();
    let val = event.target.value;
    if (val != undefined) val = val.replace('*', '');
    if (val && val.trim().length > 0) {
      this.nfeList = this.nfeList.filter(item =>
        item.Grouper.toString().toLowerCase().indexOf(val.toLowerCase()) > -1
      );
    }
  }

  goPallets(nfe: any) {
    const initialOrderObject = { order: this.order, nfe };
    this.router.navigate(['/initial-charge-pallets'], { state: { initial_order_object: initialOrderObject } });
  }

  async print(nfe: any) {
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
        this.initialChargeService.printNfe({
          orderId: this.order.Id,
          nfeId: nfe.Id,
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
}
