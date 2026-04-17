import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BasePageService } from '../../../core/base-page.service';
import { LocationConsultingService } from '../location-consulting.service';
import { TypeBarcode } from '../../../enums/enums';

@Component({
  selector: 'app-location-consulting',
  templateUrl: './location-consulting.page.html',
  styleUrls: ['./location-consulting.page.scss'],
  standalone: false
})
export class LocationConsultingPage implements OnInit {

  public location: any = {};
  public stocks: any[] = [];
  public seals: any[] = [];
  public fieldsVisible: boolean = false;

  constructor(
    private navCtrl: NavController,
    private basePage: BasePageService,
    private locationConsultingService: LocationConsultingService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.showPromptLocal();
  }

  async showPromptLocal() {
    const barcode = await this.basePage.newGetBarcode(TypeBarcode.Local);
    if (!barcode) { this.navCtrl.back(); return; }
    await this.basePage.newLoading();
    this.locationConsultingService.getLocationConsulting({ address: barcode }).subscribe({
      next: (data) => {
        this.basePage.dismissLoading().then(() => {
          this.location = data?.Location || {};
          this.stocks = data?.Stocks || [];
          this.seals = data?.Seals || [];
          this.fieldsVisible = true;
        });
      },
      error: (err) => {
        this.basePage.dismissLoading().then(() => {
          this.basePage.newAlert('Erro', err?.error?.Detail?.message || 'Erro ao consultar local.').then(() => {
            this.showPromptLocal();
          });
        });
      }
    });
  }
}
