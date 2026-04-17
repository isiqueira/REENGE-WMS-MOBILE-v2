import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { InventoryChildrensRoutingModule } from './inventory-childrens-routing.module';
import { InventoryChildrensPage } from './inventory-childrens.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, InventoryChildrensRoutingModule],
  declarations: [InventoryChildrensPage],
})
export class InventoryChildrensPageModule {}
