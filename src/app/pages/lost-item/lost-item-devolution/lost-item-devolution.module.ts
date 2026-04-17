import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LostItemDevolutionPageRoutingModule } from './lost-item-devolution-routing.module';
import { LostItemDevolutionPage } from './lost-item-devolution.page';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, LostItemDevolutionPageRoutingModule],
  declarations: [LostItemDevolutionPage]
})
export class LostItemDevolutionPageModule {}
