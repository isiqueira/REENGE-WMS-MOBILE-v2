import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InitialChargeNfesPageRoutingModule } from './initial-charge-nfes-routing.module';
import { InitialChargeNfesPage } from './initial-charge-nfes.page';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, InitialChargeNfesPageRoutingModule],
  declarations: [InitialChargeNfesPage]
})
export class InitialChargeNfesPageModule {}
