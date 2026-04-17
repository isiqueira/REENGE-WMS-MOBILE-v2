import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { SealConsultingService } from '../seal-consulting.service';
import { TypeBarcode } from '../../../enums/enums';

@Component({
  selector: 'app-seal-consulting',
  templateUrl: './seal-consulting.page.html',
  styleUrls: ['./seal-consulting.page.scss'],
  standalone: false
})
export class SealConsultingPage implements OnInit {

  public seal: any = {};
  public sealChildrens: any[] = [];
  public fieldsVisible: boolean = false;
  public printerItem: any = {};
  public printChildrens: boolean = false;

  constructor(
    private navCtrl: NavController,
    private basePage: BasePageService,
    private sealConsultingService: SealConsultingService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.showPromptIdentifier();
  }

  async showPromptIdentifier() {
    const barcode = await this.basePage.newGetBarcode(TypeBarcode.SEAL);
    if (!barcode) { this.navCtrl.back(); return; }
    await this.basePage.newLoading();
    this.sealConsultingService.getSealDetail({ identifier: barcode }).subscribe({
      next: (data) => {
        this.basePage.dismissLoading().then(() => {
          this.seal = data;
          this.basePage.newToastSuccess(barcode).then(() => {
            if (this.seal.HasChildren) {
              this.sealConsultingService.getChildrens({ identifier: barcode }).subscribe({
                next: (childrens) => {
                  this.sealChildrens = childrens || [];
                  this.fieldsVisible = true;
                },
                error: () => { this.fieldsVisible = true; }
              });
            } else {
              this.fieldsVisible = true;
            }
          });
        });
      },
      error: (err) => {
        this.basePage.dismissLoading().then(() => {
          this.basePage.newAlert('Erro', err?.error?.Detail?.message || 'Erro ao consultar selo.').then(() => {
            this.showPromptIdentifier();
          });
        });
      }
    });
  }

  async print() {
    this.printerItem.Identifier = this.seal.Identifier;
    this.printChildrens = false;
    await this.getPrinters();
  }

  async printThisChildrens() {
    this.printerItem.Identifier = this.seal.Identifier;
    this.printChildrens = true;
    await this.getPrinters();
  }

  async printSon(item: any) {
    this.printerItem.Identifier = item.Identifier;
    this.printChildrens = false;
    await this.getPrinters();
  }

  async getPrinters() {
    await this.basePage.newLoading();
    this.sealConsultingService.getPrinters().subscribe({
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
        this.sealConsultingService.printSeal({
          identifier: this.printerItem.Identifier,
          printerId: this.printerItem.PrinterId,
          printChildrens: this.printChildrens
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
