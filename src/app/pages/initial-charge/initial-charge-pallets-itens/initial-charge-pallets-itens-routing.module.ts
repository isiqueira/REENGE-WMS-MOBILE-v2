import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialChargePalletsItensPage } from './initial-charge-pallets-itens.page';

const routes: Routes = [{ path: '', component: InitialChargePalletsItensPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InitialChargePalletsItensPageRoutingModule {}
