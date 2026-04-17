import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialChargeNfesPage } from './initial-charge-nfes.page';

const routes: Routes = [{ path: '', component: InitialChargeNfesPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InitialChargeNfesPageRoutingModule {}
