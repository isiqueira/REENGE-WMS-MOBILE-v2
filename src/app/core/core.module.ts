import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ApiService } from './api.service';
import { SessionService } from './session.service';
import { BasePageService } from './base-page.service';
import { BarcodeFocusService } from './barcode-focus.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [HttpClientModule],
  providers: [ApiService, SessionService, BasePageService, BarcodeFocusService, AuthGuard],
})
export class CoreModule {}
