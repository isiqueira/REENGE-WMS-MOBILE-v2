import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptionNfesPage } from './reception-nfes.page';

const routes: Routes = [{ path: '', component: ReceptionNfesPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceptionNfesRoutingModule {}
