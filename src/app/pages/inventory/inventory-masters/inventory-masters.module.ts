import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { InventoryMastersRoutingModule } from './inventory-masters-routing.module';
import { InventoryMastersPage } from './inventory-masters.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, InventoryMastersRoutingModule],
  declarations: [InventoryMastersPage],
})
export class InventoryMastersPageModule {}
