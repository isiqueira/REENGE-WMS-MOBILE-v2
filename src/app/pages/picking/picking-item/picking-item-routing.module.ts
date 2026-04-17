import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PickingItemPage } from './picking-item.page';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: PickingItemPage }])],
  exports: [RouterModule],
})
export class PickingItemRoutingModule {}
