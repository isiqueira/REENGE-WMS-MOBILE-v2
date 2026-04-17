import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/api.service';

@Injectable({ providedIn: 'root' })
export class LocationConsultingService {

  constructor(private api: ApiService) {}

  getLocationConsulting(params: any): Observable<any> {
    return this.api.getApi('Location/LocationConsulting', params);
  }

  getPrinters(): Observable<any> {
    return this.api.getApi('Printer/GetPrinters', {});
  }
}
