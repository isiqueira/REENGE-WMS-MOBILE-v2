import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/api.service';

@Injectable({ providedIn: 'root' })
export class PickingService {
  public locationFilter: any = {};
  public locationsIsSet: boolean = false;

  constructor(private api: ApiService) {}

  getPickingsOrders(): Observable<any> {
    return this.api.getApi('Picking/GetPickingsOrders');
  }

  getPickingsByOrder(params: any): Observable<any> {
    return this.api.getApi('Picking/GetPickingsByOrder', params);
  }

  getPickingTasks(params: any): Observable<any> {
    return this.api.getApi('Picking/GetPickingTasks', params);
  }

  getTaskForOperator(params: any): Observable<any> {
    return this.api.getApi('Picking/GetTaskForOperator', params);
  }

  updateTaskTransfer(params: any): Observable<any> {
    return this.api.getApi('Picking/UpdateTaskTransfer', params);
  }

  getPickingByOperator(params: any): Observable<any> {
    return this.api.getApi('Picking/GetPickingByOperator', params);
  }

  removeStorage(params: any): Observable<any> {
    return this.api.getApi('Picking/RemoveStorage', params);
  }

  startPickingTask(params: any): Observable<any> {
    return this.api.getApi('Picking/StartPicking', params);
  }

  getLocation(params: any): Observable<any> {
    return this.api.getApi('Location/Get', params);
  }

  getProduct(params: any): Observable<any> {
    return this.api.getApi('Product/Get', params);
  }

  verifyOperator(params: any): Observable<any> {
    return this.api.getApi('Picking/VerifyOperator', params);
  }

  verifyPresentation(params: any): Observable<any> {
    return this.api.getApi('Picking/VerifyPresentation', params);
  }
}
