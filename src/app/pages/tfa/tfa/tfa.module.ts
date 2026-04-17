import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TfaPageRoutingModule } from './tfa-routing.module';
import { TfaPage } from './tfa.page';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, TfaPageRoutingModule],
  declarations: [TfaPage]
})
export class TfaPageModule {}
