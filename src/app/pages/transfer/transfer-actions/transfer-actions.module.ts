import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { TransferActionsRoutingModule } from './transfer-actions-routing.module';
import { TransferActionsPage } from './transfer-actions.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, TransferActionsRoutingModule],
  declarations: [TransferActionsPage],
})
export class TransferActionsPageModule {}
