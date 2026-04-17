import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { GaDisplayProductComponent } from './ga-display-product/ga-display-product.component';
import { GaEmptyComponent } from './ga-empty/ga-empty.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [GaDisplayProductComponent, GaEmptyComponent],
  exports: [GaDisplayProductComponent, GaEmptyComponent],
})
export class SharedModule {}
