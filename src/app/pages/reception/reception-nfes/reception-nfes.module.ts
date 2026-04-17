import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { ReceptionNfesRoutingModule } from './reception-nfes-routing.module';
import { ReceptionNfesPage } from './reception-nfes.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, ReceptionNfesRoutingModule],
  declarations: [ReceptionNfesPage],
})
export class ReceptionNfesPageModule {}
