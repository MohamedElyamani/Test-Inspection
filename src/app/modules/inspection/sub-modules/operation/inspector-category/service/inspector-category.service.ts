import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InspectorCategory, inspectorcategoryLookUP } from '../interface/inspectorCategory';

@Injectable({
  providedIn: 'root'
})
export class InspectorCategoryService {
baseUrl = environment.baseUrl;
constructor(private _http: HttpClient) { }
getInspectorCategoriesList() : Observable<InspectorCategory[]> {
  return this._http.get<InspectorCategory[]>(`${this.baseUrl}/api/inspection-InspectorCategories/GetList`);
}
createInspectorCategory(data: InspectorCategory) : Observable<InspectorCategory>{
  return this._http.post<InspectorCategory>(`${this.baseUrl}/api/inspection-InspectorCategories/Create`, data);  
}
updateInspectorCategory(id: number, data: InspectorCategory) : Observable<InspectorCategory>{
  return this._http.post<InspectorCategory>(`${this.baseUrl}/api/inspection-InspectorCategories/Update/${id}`, data);  
}
getInspectorCategoryById(id: number) : Observable<InspectorCategory>{
  return this._http.get<InspectorCategory>(`${this.baseUrl}/api/inspection-InspectorCategories/GetById/${id}`);
}
deleteInspectorCategory(id: number) : Observable<any>{
  return this._http.post(`${this.baseUrl}/api/inspection-InspectorCategories/Delete/${id}`, {});
}
InspectorCategoryLookup() : Observable<inspectorcategoryLookUP[]>{
  return this._http.get<inspectorcategoryLookUP[]>(`${this.baseUrl}/api/inspection-InspectorCategories/InspectorCategoryLookupDefualt`, {});
}
}
