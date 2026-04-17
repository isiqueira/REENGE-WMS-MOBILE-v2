import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TfaPicturesPage } from './tfa-pictures.page';

const routes: Routes = [{ path: '', component: TfaPicturesPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TfaPicturesPageRoutingModule {}
