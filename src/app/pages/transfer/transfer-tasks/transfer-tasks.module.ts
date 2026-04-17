import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { TransferTasksRoutingModule } from './transfer-tasks-routing.module';
import { TransferTasksPage } from './transfer-tasks.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, TransferTasksRoutingModule],
  declarations: [TransferTasksPage],
})
export class TransferTasksPageModule {}
