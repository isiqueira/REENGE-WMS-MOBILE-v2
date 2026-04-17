import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../../../shared/shared.module';
import { ShippingTasksRoutingModule } from './shipping-tasks-routing.module';
import { ShippingTasksPage } from './shipping-tasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ShippingTasksRoutingModule,
  ],
  declarations: [ShippingTasksPage],
})
export class ShippingTasksPageModule {}
