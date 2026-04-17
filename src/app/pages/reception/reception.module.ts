import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../shared/shared.module';
import { ReceptionRoutingModule } from './reception-routing.module';
import { ReceptionPage } from './reception.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, ReceptionRoutingModule],
  declarations: [ReceptionPage],
})
export class ReceptionPageModule {}
