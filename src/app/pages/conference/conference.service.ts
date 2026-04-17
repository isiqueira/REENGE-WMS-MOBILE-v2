import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/api.service';

@Injectable({ providedIn: 'root' })
export class ConferenceService {

  constructor(private api: ApiService) {}

  getNfeForConferences(): Observable<any> {
    return this.api.getApi('GaNfe/GetNfeForConferences');
  }

  getMasterForConferenceByNfe(params: any): Observable<any> {
    return this.api.getApi('Seal/GetMasterForConferenceByNfe', params);
  }

  conferenceSeal(params: any): Observable<any> {
    return this.api.getApi('Conference/ConferenceSeal', params);
  }

  changeSealFromMaster(params: any): Observable<any> {
    return this.api.getApi('Conference/ChangeSealFromMaster', params);
  }

  finishConference(params: any): Observable<any> {
    return this.api.getApi('Conference/FinishConference', params);
  }
}
