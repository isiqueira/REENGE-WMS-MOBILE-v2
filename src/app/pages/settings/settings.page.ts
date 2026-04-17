import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  standalone: false,
})
export class SettingsPage {
  constructor(private navCtrl: NavController) {}

  goBack(): void {
    this.navCtrl.navigateBack('/dash');
  }
}
