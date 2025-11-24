import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InspectionMethod, InspectionMethodLookUp } from '../interface/inspectionMethod';


@Injectable({
  providedIn: 'root'
})
export class InspectionMethodService {

baseUrl = environment.baseUrl;
constructor(private _http: HttpClient) { }
getInspectionMethodsList() : Observable<InspectionMethod[]> {
  return this._http.get<InspectionMethod[]>(`${this.baseUrl}/api/inspection-methods/GetList`);
}
createInspectionMethod(data: InspectionMethod) : Observable<InspectionMethod>{
  return this._http.post<InspectionMethod>(`${this.baseUrl}/api/inspection-methods/Create`, data);  
}
updateInspectionMethod(id: number, data: InspectionMethod) : Observable<InspectionMethod>{
  return this._http.post<InspectionMethod>(`${this.baseUrl}/api/inspection-methods/Update/${id}`, data);  
}
getInspectionMethodById(id: number) : Observable<InspectionMethod>{
  return this._http.get<InspectionMethod>(`${this.baseUrl}/api/inspection-methods/GetById/${id}`);
}
deleteInspectionMethod(id: number) : Observable<any>{
  return this._http.post(`${this.baseUrl}/api/inspection-methods/Delete/${id}`, {});
}
getInspectionMethodLookUP(): Observable<InspectionMethodLookUp[]>{
  return this._http.get<InspectionMethodLookUp[]>(`${this.baseUrl}/api/inspection-methods/InspectionMethodLookupDefault` ,{} )
}

}
