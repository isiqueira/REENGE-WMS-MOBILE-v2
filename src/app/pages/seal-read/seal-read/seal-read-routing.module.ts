import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SealReadPage } from './seal-read.page';

const routes: Routes = [{ path: '', component: SealReadPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SealReadPageRoutingModule {}
