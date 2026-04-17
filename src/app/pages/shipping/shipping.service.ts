import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/api.service';

@Injectable({ providedIn: 'root' })
export class ShippingService {

  constructor(private api: ApiService) {}

  getShippings(): Observable<any> {
    return this.api.getApi('Shipping/GetShippings');
  }

  getShippingTaskCounts(params: any): Observable<any> {
    return this.api.getApi('Shipping/GetShippingTaskCounts', params);
  }

  conferenceItem(params: any): Observable<any> {
    return this.api.getApi('Shipping/ConferenceItem', params);
  }

  finishConference(params: any): Observable<any> {
    return this.api.getApi('Shipping/FinishConference', params);
  }

  startConference(params: any): Observable<any> {
    return this.api.getApi('Shipping/StartConference', params);
  }

  getVehicles(params: any): Observable<any> {
    return this.api.getApi('OrderVehicle/GetVehiclesByOrder', params);
  }

  getVehicleTruck(params: any): Observable<any> {
    return this.api.getApi('OrderVehicleTruck/GetTrucksByVehicle', params);
  }
}
