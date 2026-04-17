import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/api.service';

@Injectable({ providedIn: 'root' })
export class SealReadService {

  constructor(private api: ApiService) {}

  readSeal(params: any): Observable<any> {
    return this.api.postApi('Seal/SealRead', params);
  }
}
