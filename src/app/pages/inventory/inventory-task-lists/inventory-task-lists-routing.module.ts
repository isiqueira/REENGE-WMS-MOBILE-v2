import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryTaskListsPage } from './inventory-task-lists.page';

const routes: Routes = [{ path: '', component: InventoryTaskListsPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryTaskListsRoutingModule {}
