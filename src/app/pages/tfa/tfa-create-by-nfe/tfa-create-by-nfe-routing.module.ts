import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TfaCreateByNfePage } from './tfa-create-by-nfe.page';

const routes: Routes = [{ path: '', component: TfaCreateByNfePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TfaCreateByNfePageRoutingModule {}
