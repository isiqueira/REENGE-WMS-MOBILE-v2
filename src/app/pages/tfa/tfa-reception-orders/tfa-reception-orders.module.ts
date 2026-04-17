import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TfaReceptionOrdersPageRoutingModule } from './tfa-reception-orders-routing.module';
import { TfaReceptionOrdersPage } from './tfa-reception-orders.page';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, TfaReceptionOrdersPageRoutingModule],
  declarations: [TfaReceptionOrdersPage]
})
export class TfaReceptionOrdersPageModule {}
