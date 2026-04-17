import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { PickingTasksRoutingModule } from './picking-tasks-routing.module';
import { PickingTasksPage } from './picking-tasks.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, PickingTasksRoutingModule],
  declarations: [PickingTasksPage],
})
export class PickingTasksPageModule {}
