import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TfaNfesPage } from './tfa-nfes.page';

const routes: Routes = [{ path: '', component: TfaNfesPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TfaNfesPageRoutingModule {}
