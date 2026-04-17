import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api.service';

export interface LocationFilter {
  LocationId?: number;
  Location?: string;
}

@Injectable({ providedIn: 'root' })
export class ConfigurationService {
  public pickingLocation: LocationFilter = {};
  public pickingLocationIsSet: boolean = false;
  public pickingBackAction: boolean = false;
  public autoPicking: boolean = false;

  constructor(private api: ApiService) {}

  togglePickingBackAction(): void {
    this.pickingBackAction = !this.pickingBackAction;
  }

  getLocation(params: any) {
    return this.api.getApi('Location/Get', params);
  }

  getProduct(params: any) {
    return this.api.getApi('Product/Get', params);
  }
}
