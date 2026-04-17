import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TfaCreateBySealPage } from './tfa-create-by-seal.page';

const routes: Routes = [{ path: '', component: TfaCreateBySealPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TfaCreateBySealPageRoutingModule {}
