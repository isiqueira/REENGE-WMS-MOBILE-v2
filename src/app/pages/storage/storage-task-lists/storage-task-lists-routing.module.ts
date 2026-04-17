import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StorageTaskListsPage } from './storage-task-lists.page';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: StorageTaskListsPage }])],
  exports: [RouterModule],
})
export class StorageTaskListsRoutingModule {}
