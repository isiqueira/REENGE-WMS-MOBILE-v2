import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShippingTasksPage } from './shipping-tasks.page';

const routes: Routes = [{ path: '', component: ShippingTasksPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShippingTasksRoutingModule {}
