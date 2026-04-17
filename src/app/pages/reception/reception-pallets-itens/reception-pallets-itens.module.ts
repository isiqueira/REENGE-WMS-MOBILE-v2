import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { ReceptionPalletsItensRoutingModule } from './reception-pallets-itens-routing.module';
import { ReceptionPalletsItensPage } from './reception-pallets-itens.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, ReceptionPalletsItensRoutingModule],
  declarations: [ReceptionPalletsItensPage],
})
export class ReceptionPalletsItensPageModule {}
