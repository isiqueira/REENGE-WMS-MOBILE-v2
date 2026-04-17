import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashPage } from './dash.page';

const routes: Routes = [{ path: '', component: DashPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashRoutingModule {}
