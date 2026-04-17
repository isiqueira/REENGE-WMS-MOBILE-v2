import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../../../shared/shared.module';
import { ShippingConferenceRoutingModule } from './shipping-conference-routing.module';
import { ShippingConferencePage } from './shipping-conference.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ShippingConferenceRoutingModule,
  ],
  declarations: [ShippingConferencePage],
})
export class ShippingConferencePageModule {}
