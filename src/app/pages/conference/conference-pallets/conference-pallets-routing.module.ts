import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConferencePalletsPage } from './conference-pallets.page';

const routes: Routes = [{ path: '', component: ConferencePalletsPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConferencePalletsRoutingModule {}
