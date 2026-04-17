import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InitialChargePalletsItensPageRoutingModule } from './initial-charge-pallets-itens-routing.module';
import { InitialChargePalletsItensPage } from './initial-charge-pallets-itens.page';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, InitialChargePalletsItensPageRoutingModule],
  declarations: [InitialChargePalletsItensPage]
})
export class InitialChargePalletsItensPageModule {}
