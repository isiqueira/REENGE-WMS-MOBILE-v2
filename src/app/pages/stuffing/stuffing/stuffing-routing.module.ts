import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StuffingPage } from './stuffing.page';

const routes: Routes = [{ path: '', component: StuffingPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StuffingRoutingModule {}
