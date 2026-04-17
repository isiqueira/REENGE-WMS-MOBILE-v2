import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { TransferRoutingModule } from './transfer-routing.module';
import { TransferPage } from './transfer.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, TransferRoutingModule],
  declarations: [TransferPage],
})
export class TransferPageModule {}
