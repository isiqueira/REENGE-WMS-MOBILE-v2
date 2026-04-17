import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TfaPicturesPageRoutingModule } from './tfa-pictures-routing.module';
import { TfaPicturesPage } from './tfa-pictures.page';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, TfaPicturesPageRoutingModule],
  declarations: [TfaPicturesPage]
})
export class TfaPicturesPageModule {}
