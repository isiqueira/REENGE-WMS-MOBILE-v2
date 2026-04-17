import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationConsultingPage } from './location-consulting.page';

const routes: Routes = [{ path: '', component: LocationConsultingPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationConsultingPageRoutingModule {}
