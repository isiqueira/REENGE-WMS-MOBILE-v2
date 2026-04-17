import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { StorageConcludeRoutingModule } from './storage-conclude-routing.module';
import { StorageConcludePage } from './storage-conclude.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, StorageConcludeRoutingModule],
  declarations: [StorageConcludePage],
})
export class StorageConcludePageModule {}
