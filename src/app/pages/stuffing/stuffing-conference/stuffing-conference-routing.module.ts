import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StuffingConferencePage } from './stuffing-conference.page';

const routes: Routes = [{ path: '', component: StuffingConferencePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StuffingConferenceRoutingModule {}
