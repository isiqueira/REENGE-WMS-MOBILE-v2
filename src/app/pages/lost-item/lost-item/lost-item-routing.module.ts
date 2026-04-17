import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LostItemPage } from './lost-item.page';

const routes: Routes = [{ path: '', component: LostItemPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LostItemPageRoutingModule {}
