import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptionPalletsCreatePage } from './reception-pallets-create.page';

const routes: Routes = [{ path: '', component: ReceptionPalletsCreatePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceptionPalletsCreateRoutingModule {}
