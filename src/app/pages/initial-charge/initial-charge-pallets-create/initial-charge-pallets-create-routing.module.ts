import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialChargePalletsCreatePage } from './initial-charge-pallets-create.page';

const routes: Routes = [{ path: '', component: InitialChargePalletsCreatePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InitialChargePalletsCreatePageRoutingModule {}
