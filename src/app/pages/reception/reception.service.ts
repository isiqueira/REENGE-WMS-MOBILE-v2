import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/api.service';

@Injectable({ providedIn: 'root' })
export class ReceptionService {
  constructor(private api: ApiService) {}

  // ─── Orders ──────────────────────────────────────────────────────────────────

  getOrders(): Observable<any> {
    return this.api.getApi('Reception/GetOrders');
  }

  getOrderProducts(params: any): Observable<any> {
    return this.api.getApi('Reception/GetOrderItens', params);
  }

  releaseOrderForStorage(params: any): Observable<any> {
    return this.api.getApi('Reception/ReleaseForStorage', params);
  }

  releaseNfeForStorage(params: any): Observable<any> {
    return this.api.getApi('Reception/ReleaseNfeForStorage', params);
  }

  // ─── Pallets (Seals) ─────────────────────────────────────────────────────────

  getPallets(params: any): Observable<any> {
    return this.api.getApi('Seal/GetMasterByOrder', params);
  }

  getPalletsByOrderNfe(params: any): Observable<any> {
    return this.api.getApi('Seal/GetMasterByOrderNfe', params);
  }

  getNfeForOrder(params: any): Observable<any> {
    return this.api.getApi('GaNfe/GetNfeForReception', params);
  }

  createPallet(params: any): Observable<any> {
    return this.api.getApi('Seal/CreateMobile', params);
  }

  createPalletItem(params: any): Observable<any> {
    return this.api.getApi('Seal/CreateMobile', params);
  }

  createSealProduct(params: any): Observable<any> {
    return this.api.getApi('Seal/CreateSealProduct', params);
  }

  createPalletBySampling(params: any): Observable<any> {
    return this.api.getApi('Seal/CreateBySampling', params);
  }

  releasePalletForStorage(params: any): Observable<any> {
    return this.api.getApi('Seal/ReleaseForStorage', params);
  }

  getPalletsItens(params: any): Observable<any> {
    return this.api.getApi('Seal/GetBySealMaster', params);
  }

  printSealMaster(params: any): Observable<any> {
    return this.api.getApi('Seal/PrinterSeal', params);
  }

  printSeal(params: any): Observable<any> {
    return this.api.getApi('Seal/PrinterSeal', params);
  }

  printNfe(params: any): Observable<any> {
    return this.api.getApi('Seal/PrinterSealByNfe', params);
  }

  deletePallet(params: any): Observable<any> {
    return this.api.getApi('Seal/DeleteMaster', params);
  }

  // ─── Auxiliaries ─────────────────────────────────────────────────────────────

  getVehicles(params: any): Observable<any> {
    return this.api.getApi('OrderVehicle/GetVehiclesByOrder', params);
  }

  getVehicleTruck(params: any): Observable<any> {
    return this.api.getApi('OrderVehicleTruck/GetTrucksByVehicle', params);
  }

  getLocation(params: any): Observable<any> {
    return this.api.getApi('Location/Get', params);
  }

  getProduct(params: any): Observable<any> {
    return this.api.getApi('Product/Get', params);
  }

  getPresentations(params: any): Observable<any> {
    return this.api.getApi('Product/GetPresentations', params);
  }

  verifyHasPacking(params: any): Observable<any> {
    return this.api.getApi('Reception/VerifyHasPacking', params);
  }

  verifyPackingIdentifier(params: any): Observable<any> {
    return this.api.getApi('Reception/VerifyPackingIdentifier', params);
  }

  getContainer(): Observable<any> {
    return this.api.getApi('Container/GetContainer');
  }

  getContainerPresentations(params: any): Observable<any> {
    return this.api.getApi('Container/GetContainerPresentations', params);
  }

  getPrinters(): Observable<any> {
    return this.api.getApi('Printer/GetPrinters');
  }
}
