import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { PickingTaskListsRoutingModule } from './picking-task-lists-routing.module';
import { PickingTaskListsPage } from './picking-task-lists.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, PickingTaskListsRoutingModule],
  declarations: [PickingTaskListsPage],
})
export class PickingTaskListsPageModule {}
