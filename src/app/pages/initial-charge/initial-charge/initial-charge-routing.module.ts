import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialChargePage } from './initial-charge.page';

const routes: Routes = [{ path: '', component: InitialChargePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InitialChargePageRoutingModule {}
