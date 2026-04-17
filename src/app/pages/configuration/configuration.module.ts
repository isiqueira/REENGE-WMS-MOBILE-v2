import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationPage } from './configuration.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ConfigurationRoutingModule],
  declarations: [ConfigurationPage],
})
export class ConfigurationPageModule {}
