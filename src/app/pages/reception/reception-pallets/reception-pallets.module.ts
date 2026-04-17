import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { ReceptionPalletsRoutingModule } from './reception-pallets-routing.module';
import { ReceptionPalletsPage } from './reception-pallets.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, ReceptionPalletsRoutingModule],
  declarations: [ReceptionPalletsPage],
})
export class ReceptionPalletsPageModule {}
