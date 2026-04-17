import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialChargePalletsItensCreateUnitaryPage } from './initial-charge-pallets-itens-create-unitary.page';

const routes: Routes = [{ path: '', component: InitialChargePalletsItensCreateUnitaryPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InitialChargePalletsItensCreateUnitaryPageRoutingModule {}
