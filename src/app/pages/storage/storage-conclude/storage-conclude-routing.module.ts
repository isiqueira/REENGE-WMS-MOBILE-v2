import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StorageConcludePage } from './storage-conclude.page';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: StorageConcludePage }])],
  exports: [RouterModule],
})
export class StorageConcludeRoutingModule {}
