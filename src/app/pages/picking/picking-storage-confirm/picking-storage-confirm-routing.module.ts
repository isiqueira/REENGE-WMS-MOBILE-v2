import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PickingStorageConfirmPage } from './picking-storage-confirm.page';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: PickingStorageConfirmPage }])],
  exports: [RouterModule],
})
export class PickingStorageConfirmRoutingModule {}
