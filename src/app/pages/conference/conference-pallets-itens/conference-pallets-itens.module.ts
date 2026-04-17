import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../../../shared/shared.module';
import { ConferencePalletsItensRoutingModule } from './conference-pallets-itens-routing.module';
import { ConferencePalletsItensPage } from './conference-pallets-itens.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ConferencePalletsItensRoutingModule,
  ],
  declarations: [ConferencePalletsItensPage],
})
export class ConferencePalletsItensPageModule {}
