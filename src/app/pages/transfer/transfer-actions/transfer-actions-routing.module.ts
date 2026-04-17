import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransferActionsPage } from './transfer-actions.page';

const routes: Routes = [{ path: '', component: TransferActionsPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferActionsRoutingModule {}
