import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PickingTaskListsPage } from './picking-task-lists.page';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: PickingTaskListsPage }])],
  exports: [RouterModule],
})
export class PickingTaskListsRoutingModule {}
