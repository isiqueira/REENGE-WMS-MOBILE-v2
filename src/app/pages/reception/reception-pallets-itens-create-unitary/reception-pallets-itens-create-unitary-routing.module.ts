import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptionPalletsItensCreateUnitaryPage } from './reception-pallets-itens-create-unitary.page';

const routes: Routes = [{ path: '', component: ReceptionPalletsItensCreateUnitaryPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceptionPalletsItensCreateUnitaryRoutingModule {}
