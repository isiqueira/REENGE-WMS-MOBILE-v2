import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConferencePalletsItensPage } from './conference-pallets-itens.page';

const routes: Routes = [{ path: '', component: ConferencePalletsItensPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConferencePalletsItensRoutingModule {}
