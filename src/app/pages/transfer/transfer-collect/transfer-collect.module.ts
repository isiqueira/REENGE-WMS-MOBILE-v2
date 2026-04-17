import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { TransferCollectRoutingModule } from './transfer-collect-routing.module';
import { TransferCollectPage } from './transfer-collect.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, TransferCollectRoutingModule],
  declarations: [TransferCollectPage],
})
export class TransferCollectPageModule {}
