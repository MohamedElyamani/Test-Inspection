import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InspectionRequest, InspectionServiceOrderLookup } from '../interface/inspction-service-order';

@Injectable({
  providedIn: 'root'
})
export class InspctionServiceOrderService {

baseUrl = environment.baseUrl;
constructor(private _HttpClient: HttpClient) { }

getInspectionReqOrderList(): Observable<InspectionRequest[]> {
  return this._HttpClient.post<InspectionRequest[]>(`${this.baseUrl}/api/InspectionServiceOrder/Index`,{});
}
createInspectionReqOrder(data: InspectionRequest): Observable<InspectionRequest> {
  return this._HttpClient.post<InspectionRequest>(`${this.baseUrl}/api/InspectionServiceOrder/Create`, data );
}
updateInspectionReqOrder(id:number, data: InspectionRequest): Observable<InspectionRequest> {
  return this._HttpClient.post<InspectionRequest>(`${this.baseUrl}/api/InspectionServiceOrder/Update/${id}`, data );
}
getInspectionReqOrderById(id:number): Observable<InspectionRequest>{
  return this._HttpClient.get<InspectionRequest>(`${this.baseUrl}/api/InspectionServiceOrder/GetById/${id}`);
}
deleteInspectionReqOrder(id: number): Observable<InspectionRequest> {
  return this._HttpClient.post<InspectionRequest>(`${this.baseUrl}/api/InspectionServiceOrder/Delete/${id}`,{});
}
getServiceOrderLookup() : Observable<InspectionServiceOrderLookup[]> {
    return this._HttpClient.get<InspectionServiceOrderLookup[]>(`${this.baseUrl}/api/inspection-serviceitem/ServiceItemLookUpForInspectionServiceOrder`);
  }

}
