import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransferTasksPage } from './transfer-tasks.page';

const routes: Routes = [{ path: '', component: TransferTasksPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferTasksRoutingModule {}
