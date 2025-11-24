import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Inspector, InspectorLookUP } from '../interface/inspector';
import { Observable } from 'rxjs';
import { inspectorcategoryLookUP } from '../../inspector-category/interface/inspectorCategory';

@Injectable({
  providedIn: 'root'
})
export class InspectorService {
baseUrl = environment.baseUrl;
constructor(private _HttpClient: HttpClient) { }

getInspectorList(): Observable<Inspector[]> {
  return this._HttpClient.post<Inspector[]>(`${this.baseUrl}/api/inspection-Inspector/Index`,{});
}
getInspectorById(id: number): Observable<Inspector> {
  return this._HttpClient.get<Inspector>(`${this.baseUrl}/api/inspection-Inspector/GetById/${id}`);
}
createInspector(data: Inspector): Observable<Inspector> {
  return this._HttpClient.post<Inspector>(`${this.baseUrl}/api/inspection-Inspector/Create`, data);
}
updateInspector(id: number, data: Inspector): Observable<Inspector> {
  return this._HttpClient.post<Inspector>(`${this.baseUrl}/api/inspection-Inspector/Update/${id}`, data);
}
deleteInspector(id: number): Observable<any> {
  return this._HttpClient.post(`${this.baseUrl}/api/inspection-Inspector/Delete/${id}`, {});
}
getInspectorLookUP(categoryId?: number): Observable<InspectorLookUP[]> {
  let url = `${this.baseUrl}/api/inspection-Inspector/InspectorLookupDefualt?Take=100`;

  if (categoryId) {
    const filter = encodeURIComponent(`["InspectorCategoryId","=","${categoryId}"]`);
    url += `&Filters=${filter}`;
  }

  return this._HttpClient.get<InspectorLookUP[]>(url);
}







}