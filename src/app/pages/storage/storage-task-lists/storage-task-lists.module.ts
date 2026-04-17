import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { StorageTaskListsRoutingModule } from './storage-task-lists-routing.module';
import { StorageTaskListsPage } from './storage-task-lists.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, StorageTaskListsRoutingModule],
  declarations: [StorageTaskListsPage],
})
export class StorageTaskListsPageModule {}
