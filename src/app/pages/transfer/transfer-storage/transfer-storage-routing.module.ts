import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransferStoragePage } from './transfer-storage.page';

const routes: Routes = [{ path: '', component: TransferStoragePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferStorageRoutingModule {}
