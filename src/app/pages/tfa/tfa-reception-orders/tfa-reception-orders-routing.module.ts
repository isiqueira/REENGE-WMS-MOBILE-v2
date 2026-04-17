import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TfaReceptionOrdersPage } from './tfa-reception-orders.page';

const routes: Routes = [{ path: '', component: TfaReceptionOrdersPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TfaReceptionOrdersPageRoutingModule {}
