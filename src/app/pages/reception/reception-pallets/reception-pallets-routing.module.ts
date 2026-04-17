import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptionPalletsPage } from './reception-pallets.page';

const routes: Routes = [{ path: '', component: ReceptionPalletsPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceptionPalletsRoutingModule {}
