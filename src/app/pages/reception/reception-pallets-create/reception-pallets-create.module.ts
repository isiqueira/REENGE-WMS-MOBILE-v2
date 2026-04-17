import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { ReceptionPalletsCreateRoutingModule } from './reception-pallets-create-routing.module';
import { ReceptionPalletsCreatePage } from './reception-pallets-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReceptionPalletsCreateRoutingModule,
  ],
  declarations: [ReceptionPalletsCreatePage],
})
export class ReceptionPalletsCreatePageModule {}
