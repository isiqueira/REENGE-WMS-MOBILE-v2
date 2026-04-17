import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { PickingItemRoutingModule } from './picking-item-routing.module';
import { PickingItemPage } from './picking-item.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, PickingItemRoutingModule],
  declarations: [PickingItemPage],
})
export class PickingItemPageModule {}
