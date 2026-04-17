import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StorageConfirmPage } from './storage-confirm.page';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: StorageConfirmPage }])],
  exports: [RouterModule],
})
export class StorageConfirmRoutingModule {}
