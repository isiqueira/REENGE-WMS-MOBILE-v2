import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { StorageRoutingModule } from './storage-routing.module';
import { StoragePage } from './storage.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, StorageRoutingModule],
  declarations: [StoragePage],
})
export class StoragePageModule {}
