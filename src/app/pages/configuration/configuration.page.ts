import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BasePageService } from '../../core/base-page.service';
import { TypeBarcode } from '../../enums/enums';
import { ConfigurationService } from './configuration.service';

@Component({
  selector: 'app-configuration',
  templateUrl: 'configuration.page.html',
  standalone: false,
})
export class ConfigurationPage implements OnInit {
  readonly ACTION_PICKING = 'Picking';

  constructor(
    private navCtrl: NavController,
    private basePage: BasePageService,
    public configService: ConfigurationService,
  ) {}

  ngOnInit(): void {}

  goBack(): void {
    this.navCtrl.navigateBack('/dash');
  }

  async showPromptLocation(action: string): Promise<void> {
    const barcode = await this.basePage.newGetBarcode(TypeBarcode.LOCATION);
    if (!barcode) return;

    await this.basePage.newLoading();
    this.configService.getLocation({ address: barcode }).subscribe({
      next: async (data: any) => {
        await this.basePage.dismissLoading();
        if (!data) {
          await this.basePage.newAlert('Erro', 'Código informado é Inválido.');
          await this.showPromptLocation(action);
        } else {
          this.setLocation(action, data.Id, data.Address);
        }
      },
      error: async (error: any) => {
        await this.basePage.dismissLoading();
        await this.basePage.newAlert('Erro', error?.error?.Detail?.message || 'Erro.');
      },
    });
  }

  setLocation(action: string, id: number, address: string): void {
    if (action === this.ACTION_PICKING) {
      this.configService.pickingLocation.LocationId = id;
      this.configService.pickingLocation.Location = address;
      this.configService.pickingLocationIsSet = true;
    }
  }

  resetLocation(action: string): void {
    if (action === this.ACTION_PICKING) {
      this.configService.pickingLocation = {};
      this.configService.pickingLocationIsSet = false;
    }
  }

  onChangeToggle(_action: string): void {
    // intentionally empty
  }
}
