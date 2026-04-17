import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/api.service';

@Injectable({ providedIn: 'root' })
export class InventoryService {

  constructor(private api: ApiService) {}

  getOrders(): Observable<any> {
    return this.api.getApi('Inventory/GetOrders');
  }

  getInventoriesByOrder(params: any): Observable<any> {
    return this.api.getApi('Inventory/GetInventoriesByOrder', params);
  }

  getMastersByList(params: any): Observable<any> {
    return this.api.getApi('Inventory/GetMastersByList', params);
  }

  getChildrensByMaster(params: any): Observable<any> {
    return this.api.getApi('Inventory/GetChildrensByMaster', params);
  }

  addInventoryItem(params: any): Observable<any> {
    return this.api.getApi('Inventory/AddInventoryItem', params);
  }

  removeInventoryItem(params: any): Observable<any> {
    return this.api.getApi('Inventory/RemoveInventoryItem', params);
  }

  verifyReadyForInventory(params: any): Observable<any> {
    return this.api.getApi('Inventory/VerifyReadyForInventory', params);
  }
}
