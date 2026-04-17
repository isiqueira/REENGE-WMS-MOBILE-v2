import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { PickingStorageConfirmRoutingModule } from './picking-storage-confirm-routing.module';
import { PickingStorageConfirmPage } from './picking-storage-confirm.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, PickingStorageConfirmRoutingModule],
  declarations: [PickingStorageConfirmPage],
})
export class PickingStorageConfirmPageModule {}
