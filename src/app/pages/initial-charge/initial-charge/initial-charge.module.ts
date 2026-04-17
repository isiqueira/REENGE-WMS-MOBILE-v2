import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InitialChargePageRoutingModule } from './initial-charge-routing.module';
import { InitialChargePage } from './initial-charge.page';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, InitialChargePageRoutingModule],
  declarations: [InitialChargePage]
})
export class InitialChargePageModule {}
