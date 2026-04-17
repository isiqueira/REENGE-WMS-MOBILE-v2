import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../../../shared/shared.module';
import { StuffingTasksRoutingModule } from './stuffing-tasks-routing.module';
import { StuffingTasksPage } from './stuffing-tasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    StuffingTasksRoutingModule,
  ],
  declarations: [StuffingTasksPage],
})
export class StuffingTasksPageModule {}
