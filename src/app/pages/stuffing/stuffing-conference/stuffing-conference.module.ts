import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../../../shared/shared.module';
import { StuffingConferenceRoutingModule } from './stuffing-conference-routing.module';
import { StuffingConferencePage } from './stuffing-conference.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    StuffingConferenceRoutingModule,
  ],
  declarations: [StuffingConferencePage],
})
export class StuffingConferencePageModule {}
