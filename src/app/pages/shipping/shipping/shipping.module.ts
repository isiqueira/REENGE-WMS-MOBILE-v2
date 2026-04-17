import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../../../shared/shared.module';
import { ShippingRoutingModule } from './shipping-routing.module';
import { ShippingPage } from './shipping.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ShippingRoutingModule,
  ],
  declarations: [ShippingPage],
})
export class ShippingPageModule {}
