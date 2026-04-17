import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/api.service';

@Injectable({ providedIn: 'root' })
export class StuffingService {

  constructor(private api: ApiService) {}

  getStuffing(): Observable<any> {
    return this.api.getApi('Stuffing/GetStuffings');
  }

  getStuffingTaskCounts(params: any): Observable<any> {
    return this.api.getApi('Stuffing/GetStuffingTaskCounts', params);
  }

  conferenceItem(params: any): Observable<any> {
    return this.api.getApi('Stuffing/ConferenceItem', params);
  }

  finishConference(params: any): Observable<any> {
    return this.api.getApi('Stuffing/FinishConference', params);
  }

  startConference(params: any): Observable<any> {
    return this.api.getApi('Stuffing/StartConference', params);
  }
}
