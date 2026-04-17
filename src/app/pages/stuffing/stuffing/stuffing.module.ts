import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../../../shared/shared.module';
import { StuffingRoutingModule } from './stuffing-routing.module';
import { StuffingPage } from './stuffing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    StuffingRoutingModule,
  ],
  declarations: [StuffingPage],
})
export class StuffingPageModule {}
