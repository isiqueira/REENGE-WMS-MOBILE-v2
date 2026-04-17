import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LostItemPageRoutingModule } from './lost-item-routing.module';
import { LostItemPage } from './lost-item.page';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, LostItemPageRoutingModule],
  declarations: [LostItemPage]
})
export class LostItemPageModule {}
