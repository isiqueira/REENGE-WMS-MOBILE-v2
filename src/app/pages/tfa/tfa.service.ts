import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/api.service';

@Injectable({ providedIn: 'root' })
export class TfaService {

  constructor(private api: ApiService) {}

  getTfaList(): Observable<any> {
    return this.api.getApi('Tfa/GetTfaList', {});
  }

  getFieldsBySealId(params: any): Observable<any> {
    return this.api.getApi('Tfa/GetTfaFieldsBySealId', params);
  }

  saveTfaBySeal(params: any): Observable<any> {
    return this.api.postApi('Tfa/SaveTfaBySeal', params);
  }

  editTfaBySeal(params: any): Observable<any> {
    return this.api.postApi('Tfa/EditTfaBySeal', params);
  }

  getFieldsByNfeId(params: any): Observable<any> {
    return this.api.getApi('Tfa/GetTfaFieldsByNfeId', params);
  }

  createTfaByNfe(params: any): Observable<any> {
    return this.api.postApi('Tfa/SaveTfaByNfe', params);
  }

  saveTfaByNfe(params: any): Observable<any> {
    return this.api.postApi('Tfa/SaveTfaByNfe', params);
  }

  editTfaByNfe(params: any): Observable<any> {
    return this.api.postApi('Tfa/EditTfaByNfe', params);
  }

  savePhoto(params: any): Observable<any> {
    return this.api.postApi('Tfa/SavePhoto', params);
  }

  getPictureByTfaId(params: any): Observable<any> {
    return this.api.getApi('Tfa/GetPictureByTfaId', params);
  }

  deletePhoto(params: any): Observable<any> {
    return this.api.postApi('Tfa/DeletePhoto', params);
  }

  getTfaFailureTypes(): Observable<any> {
    return this.api.getApi('Tfa/GetTfaFailureTypes', {});
  }
}
