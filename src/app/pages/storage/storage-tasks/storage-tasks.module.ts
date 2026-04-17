import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { StorageTasksRoutingModule } from './storage-tasks-routing.module';
import { StorageTasksPage } from './storage-tasks.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, StorageTasksRoutingModule],
  declarations: [StorageTasksPage],
})
export class StorageTasksPageModule {}
