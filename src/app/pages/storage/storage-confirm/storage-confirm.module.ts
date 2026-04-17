import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { StorageConfirmRoutingModule } from './storage-confirm-routing.module';
import { StorageConfirmPage } from './storage-confirm.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, StorageConfirmRoutingModule],
  declarations: [StorageConfirmPage],
})
export class StorageConfirmPageModule {}
