import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InitialChargePalletsPageRoutingModule } from './initial-charge-pallets-routing.module';
import { InitialChargePalletsPage } from './initial-charge-pallets.page';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, InitialChargePalletsPageRoutingModule],
  declarations: [InitialChargePalletsPage]
})
export class InitialChargePalletsPageModule {}
