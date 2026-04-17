import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/api.service';

@Injectable({ providedIn: 'root' })
export class SealConsultingService {

  constructor(private api: ApiService) {}

  getSealDetail(params: any): Observable<any> {
    return this.api.getApi('Seal/GetSealDetail', params);
  }

  getChildrens(params: any): Observable<any> {
    return this.api.getApi('Seal/GetChildrens', params);
  }

  printSeal(params: any): Observable<any> {
    return this.api.postApi('Seal/PrinterSeal', params);
  }

  getPrinters(): Observable<any> {
    return this.api.getApi('Printer/GetPrinters', {});
  }
}
