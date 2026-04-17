import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SealConsultingPageRoutingModule } from './seal-consulting-routing.module';
import { SealConsultingPage } from './seal-consulting.page';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, SealConsultingPageRoutingModule],
  declarations: [SealConsultingPage]
})
export class SealConsultingPageModule {}
