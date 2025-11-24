import { Injectable } from '@angular/core';
import { InspectionReq } from '../interface/inspectionReq';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InspectionReqService {
baseUrl = environment.baseUrl;
constructor(private _HttpClient: HttpClient) { }

getInspectionReqList(): Observable<InspectionReq[]> {
  return this._HttpClient.post<InspectionReq[]>(` ${this.baseUrl}/api/inspection-request/Index`,{});
}
createInspectionReq(data: InspectionReq): Observable<InspectionReq> {
  return this._HttpClient.post<InspectionReq>(`${this.baseUrl}/api/inspection-request/Create`, data );
}
updateInspectionReq(id:number, data: InspectionReq): Observable<InspectionReq> {
  return this._HttpClient.post<InspectionReq>(`${this.baseUrl}/api/inspection-request/Update/${id}`, data );
}
getInspectionReqById(id:number): Observable<InspectionReq>{
  return this._HttpClient.get<InspectionReq>(`${this.baseUrl}/api/inspection-request/GetById/${id}`);
}
deleteInspectionReq(id: number): Observable<InspectionReq> {
  return this._HttpClient.post<InspectionReq>(`${this.baseUrl}/api/inspection-request/Delete/${id}`,{});
}
}
