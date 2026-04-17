import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/api.service';

@Injectable({ providedIn: 'root' })
export class LostItemService {

  constructor(private api: ApiService) {}

  getLostItens(): Observable<any> {
    return this.api.getApi('LostItem/GetLostItens', {});
  }

  finishLostItem(params: any): Observable<any> {
    return this.api.postApi('LostItem/FinishLostItem', params);
  }
}
