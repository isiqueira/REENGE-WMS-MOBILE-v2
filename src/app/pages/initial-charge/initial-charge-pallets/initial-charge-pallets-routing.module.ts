import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialChargePalletsPage } from './initial-charge-pallets.page';

const routes: Routes = [{ path: '', component: InitialChargePalletsPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InitialChargePalletsPageRoutingModule {}
