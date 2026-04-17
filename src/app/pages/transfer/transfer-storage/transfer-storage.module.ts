import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { TransferStorageRoutingModule } from './transfer-storage-routing.module';
import { TransferStoragePage } from './transfer-storage.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, TransferStorageRoutingModule],
  declarations: [TransferStoragePage],
})
export class TransferStoragePageModule {}
