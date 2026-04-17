import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { ReceptionPalletsItensCreateUnitaryRoutingModule } from './reception-pallets-itens-create-unitary-routing.module';
import { ReceptionPalletsItensCreateUnitaryPage } from './reception-pallets-itens-create-unitary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReceptionPalletsItensCreateUnitaryRoutingModule,
  ],
  declarations: [ReceptionPalletsItensCreateUnitaryPage],
})
export class ReceptionPalletsItensCreateUnitaryPageModule {}
