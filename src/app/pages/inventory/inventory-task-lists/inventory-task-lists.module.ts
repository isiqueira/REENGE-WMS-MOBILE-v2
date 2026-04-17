import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { InventoryTaskListsRoutingModule } from './inventory-task-lists-routing.module';
import { InventoryTaskListsPage } from './inventory-task-lists.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, InventoryTaskListsRoutingModule],
  declarations: [InventoryTaskListsPage],
})
export class InventoryTaskListsPageModule {}
