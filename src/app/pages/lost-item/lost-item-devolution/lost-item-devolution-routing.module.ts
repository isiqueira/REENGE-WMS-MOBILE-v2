import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LostItemDevolutionPage } from './lost-item-devolution.page';

const routes: Routes = [{ path: '', component: LostItemDevolutionPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LostItemDevolutionPageRoutingModule {}
