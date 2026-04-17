import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PickingPage } from './picking.page';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: PickingPage }])],
  exports: [RouterModule],
})
export class PickingRoutingModule {}
