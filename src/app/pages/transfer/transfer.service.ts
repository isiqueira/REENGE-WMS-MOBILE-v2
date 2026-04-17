import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/api.service';

@Injectable({ providedIn: 'root' })
export class TransferService {

  constructor(private api: ApiService) {}

  getSealsToTransfer(): Observable<any> {
    return this.api.getApi('MaintenanceTransfer/GetSealsToTransfer');
  }

  sealToTransfer(params: any): Observable<any> {
    return this.api.getApi('MaintenanceTransfer/SealToTransfer', params);
  }

  storageTransfer(params: any): Observable<any> {
    return this.api.getApi('MaintenanceTransfer/StorageTransfer', params);
  }

  getOrders(): Observable<any> {
    return this.api.getApi('MaintenanceTransfer/GetOrders');
  }

  getTransfers(params: any): Observable<any> {
    return this.api.getApi('MaintenanceTransfer/GetTransfers', params);
  }

  getTaskTransfer(params: any): Observable<any> {
    return this.api.getApi('MaintenanceTransfer/GetTaskTransfer', params);
  }

  updateTaskTransfer(params: any): Observable<any> {
    return this.api.getApi('MaintenanceTransfer/UpdateTaskTransfer', params);
  }

  getLocation(params: any): Observable<any> {
    return this.api.getApi('Location/Get', params);
  }
}
