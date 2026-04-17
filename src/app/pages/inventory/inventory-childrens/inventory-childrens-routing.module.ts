import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryChildrensPage } from './inventory-childrens.page';

const routes: Routes = [{ path: '', component: InventoryChildrensPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryChildrensRoutingModule {}
