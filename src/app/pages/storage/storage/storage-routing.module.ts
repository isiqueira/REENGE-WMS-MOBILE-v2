import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoragePage } from './storage.page';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: StoragePage }])],
  exports: [RouterModule],
})
export class StorageRoutingModule {}
