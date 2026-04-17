import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SealReadPageRoutingModule } from './seal-read-routing.module';
import { SealReadPage } from './seal-read.page';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, SealReadPageRoutingModule],
  declarations: [SealReadPage]
})
export class SealReadPageModule {}
