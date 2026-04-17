import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PickingTasksPage } from './picking-tasks.page';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: PickingTasksPage }])],
  exports: [RouterModule],
})
export class PickingTasksRoutingModule {}
