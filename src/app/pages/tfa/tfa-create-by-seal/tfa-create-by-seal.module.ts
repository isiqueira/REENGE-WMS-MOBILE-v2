import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TfaCreateBySealPageRoutingModule } from './tfa-create-by-seal-routing.module';
import { TfaCreateBySealPage } from './tfa-create-by-seal.page';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, TfaCreateBySealPageRoutingModule],
  declarations: [TfaCreateBySealPage]
})
export class TfaCreateBySealPageModule {}
