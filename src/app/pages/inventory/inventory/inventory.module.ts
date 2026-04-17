import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryPage } from './inventory.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, InventoryRoutingModule],
  declarations: [InventoryPage],
})
export class InventoryPageModule {}
