import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { ConferencePalletsRoutingModule } from './conference-pallets-routing.module';
import { ConferencePalletsPage } from './conference-pallets.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, ConferencePalletsRoutingModule],
  declarations: [ConferencePalletsPage],
})
export class ConferencePalletsPageModule {}
