import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InitialChargePalletsItensCreateUnitaryPageRoutingModule } from './initial-charge-pallets-itens-create-unitary-routing.module';
import { InitialChargePalletsItensCreateUnitaryPage } from './initial-charge-pallets-itens-create-unitary.page';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, InitialChargePalletsItensCreateUnitaryPageRoutingModule],
  declarations: [InitialChargePalletsItensCreateUnitaryPage]
})
export class InitialChargePalletsItensCreateUnitaryPageModule {}
