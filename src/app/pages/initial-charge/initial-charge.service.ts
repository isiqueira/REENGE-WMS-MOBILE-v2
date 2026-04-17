import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/api.service';

@Injectable({ providedIn: 'root' })
export class InitialChargeService {

  constructor(private api: ApiService) {}

  getOrders(): Observable<any> {
    return this.api.getApi('InitialCharge/GetOrders', {});
  }

  getOrderItens(params: any): Observable<any> {
    return this.api.getApi('InitialCharge/GetOrderItens', params);
  }

  getPalletsByOrder(params: any): Observable<any> {
    return this.api.getApi('Seal/GetMasterByOrder', params);
  }

  getPalletsByOrderNfe(params: any): Observable<any> {
    return this.api.getApi('Seal/GetMasterByOrderNfe', params);
  }

  getNfeForOrder(params: any): Observable<any> {
    return this.api.getApi('GaNfe/GetByOrder', params);
  }

  createPallet(params: any): Observable<any> {
    return this.api.postApi('Seal/CreateMobile', params);
  }

  createSealProduct(params: any): Observable<any> {
    return this.api.postApi('Seal/CreateSealProduct', params);
  }

  createPalletBySampling(params: any): Observable<any> {
    return this.api.postApi('Seal/CreateBySampling', params);
  }

  releaseForStorage(params: any): Observable<any> {
    return this.api.postApi('Seal/ReleaseForStorage', params);
  }

  getPalletsItens(params: any): Observable<any> {
    return this.api.getApi('Seal/GetBySealMaster', params);
  }

  printSealMaster(params: any): Observable<any> {
    return this.api.postApi('Seal/PrinterSeal', params);
  }

  printSeal(params: any): Observable<any> {
    return this.api.postApi('Seal/PrinterSeal', params);
  }

  printNfe(params: any): Observable<any> {
    return this.api.postApi('Seal/PrinterSealByNfe', params);
  }

  deletePallet(params: any): Observable<any> {
    return this.api.postApi('Seal/DeleteMaster', params);
  }

  getLocation(params: any): Observable<any> {
    return this.api.getApi('Location/Get', params);
  }

  getProduct(params: any): Observable<any> {
    return this.api.getApi('Product/Get', params);
  }

  getOrderProducts(params: any): Observable<any> {
    return this.api.getApi('InitialCharge/GetOrderItens', params);
  }

  getPresentations(params: any): Observable<any> {
    return this.api.getApi('Product/GetPresentations', params);
  }

  getContainer(): Observable<any> {
    return this.api.getApi('Container/GetContainer', {});
  }

  getPrinters(): Observable<any> {
    return this.api.getApi('Printer/GetPrinters', {});
  }
}
