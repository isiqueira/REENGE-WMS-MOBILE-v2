import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransferCollectPage } from './transfer-collect.page';

const routes: Routes = [{ path: '', component: TransferCollectPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferCollectRoutingModule {}
