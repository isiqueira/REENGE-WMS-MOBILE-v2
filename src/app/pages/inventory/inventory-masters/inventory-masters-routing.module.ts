import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryMastersPage } from './inventory-masters.page';

const routes: Routes = [{ path: '', component: InventoryMastersPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryMastersRoutingModule {}
