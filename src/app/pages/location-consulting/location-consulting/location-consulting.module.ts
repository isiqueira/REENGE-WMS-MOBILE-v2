import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LocationConsultingPageRoutingModule } from './location-consulting-routing.module';
import { LocationConsultingPage } from './location-consulting.page';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, LocationConsultingPageRoutingModule],
  declarations: [LocationConsultingPage]
})
export class LocationConsultingPageModule {}
