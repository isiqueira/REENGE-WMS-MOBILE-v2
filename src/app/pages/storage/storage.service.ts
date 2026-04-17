import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/api.service';

@Injectable({ providedIn: 'root' })
export class StorageService {
  constructor(private api: ApiService) {}

  getStoragesOrders(): Observable<any> {
    return this.api.getApi('Storage/GetStoragesOrders');
  }

  getStoragesByOrder(params: any): Observable<any> {
    return this.api.getApi('Storage/GetStorageByOrder', params);
  }

  getStoragesTasks(params: any): Observable<any> {
    return this.api.getApi('Storage/GetStorages', params);
  }

  setStoraged(params: any): Observable<any> {
    return this.api.getApi('Storage/SetStoraged', params);
  }

  startStorage(params: any): Observable<any> {
    return this.api.getApi('Storage/StartStorage', params);
  }

  getLocation(params: any): Observable<any> {
    return this.api.getApi('Location/Get', params);
  }

  getProduct(params: any): Observable<any> {
    return this.api.getApi('Product/Get', params);
  }

  existLocation(params: any): Observable<any> {
    return this.api.getApi('Location/ExistLocation', params);
  }
}
