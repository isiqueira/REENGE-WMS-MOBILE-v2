import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InitialChargePalletsCreatePageRoutingModule } from './initial-charge-pallets-create-routing.module';
import { InitialChargePalletsCreatePage } from './initial-charge-pallets-create.page';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, InitialChargePalletsCreatePageRoutingModule],
  declarations: [InitialChargePalletsCreatePage]
})
export class InitialChargePalletsCreatePageModule {}
