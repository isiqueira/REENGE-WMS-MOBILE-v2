import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StorageTasksPage } from './storage-tasks.page';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: StorageTasksPage }])],
  exports: [RouterModule],
})
export class StorageTasksRoutingModule {}
