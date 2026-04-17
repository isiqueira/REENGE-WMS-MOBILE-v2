import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StuffingTasksPage } from './stuffing-tasks.page';

const routes: Routes = [{ path: '', component: StuffingTasksPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StuffingTasksRoutingModule {}
