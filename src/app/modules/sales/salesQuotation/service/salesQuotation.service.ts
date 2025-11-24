import { create } from 'mathjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SalesQuotation } from '../interface/salesQuotation';

@Injectable({
  providedIn: 'root'
})
export class SalesQuotationService {
baseUrl = environment.baseUrl;
constructor(private _http: HttpClient) { }
getSalesQuotationList() : Observable<SalesQuotation[]>{
  return this._http.post<SalesQuotation[]>(`${this.baseUrl}/api/sales-SalesQuotation/Index`, {});
}
getSalesQuotationById(id : number) : Observable<SalesQuotation>{
  return this._http.get<SalesQuotation>(`${this.baseUrl}/api/sales-SalesQuotation/GetById/${id}`);
}
createSalesQuotation(data: SalesQuotation) : Observable<SalesQuotation> {
  return this._http.post<SalesQuotation>(`${this.baseUrl}/api/sales-SalesQuotation/Create`, data);
}
updateSalesQuotation(id: number, data: SalesQuotation) : Observable<SalesQuotation> {
  return this._http.post<SalesQuotation>(`${this.baseUrl}/api/sales-SalesQuotation/Update/${id}`, data);
}
deleteSalesQuotation(id: number) : Observable<SalesQuotation> {
  return this._http.post<SalesQuotation>(`${this.baseUrl}/api/sales-SalesQuotation/Delete/${id}`, {});
}

salesQuotationLookup() : Observable<SalesQuotation[]>{
  return this._http.get<SalesQuotation[]>(`${this.baseUrl}/api/sales-SalesQuotation/SalesQuotationLookupDefualt`);
}
changeStatus(id: number, status: string) : Observable<boolean> {
  return this._http.post<boolean>(`${this.baseUrl}/api/sales-SalesQuotation/ChangeStatus?id=${id}`, {"Status":status });
}

}