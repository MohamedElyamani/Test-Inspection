import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompanyEquipment } from '../interface/companyequipment';
@Injectable({
  providedIn: 'root'
})
export class CompanyequipmentService {

baseUrl = environment.baseUrl;
constructor(private _http: HttpClient) { }
getCompanyEquipmentList() : Observable<CompanyEquipment[]> {
  return this._http.post<CompanyEquipment[]>(`${this.baseUrl}/api/CompanyEquipment/Index`,{});
}
getCompanyEquipmentById(id: number) : Observable<CompanyEquipment> {
  return this._http.get<CompanyEquipment>(`${this.baseUrl}/api/CompanyEquipment/GetById/${id}`);    
}
createCompanyEquipment(data: CompanyEquipment) : Observable<CompanyEquipment> {
  return this._http.post<CompanyEquipment>(`${this.baseUrl}/api/CompanyEquipment/Create`, data);
} 
updateCompanyEquipment(id: number, data: CompanyEquipment) : Observable<CompanyEquipment> {
  return this._http.post<CompanyEquipment>(`${this.baseUrl}/api/CompanyEquipment/Update/${id}`, data);
}
deleteCompanyEquipment(id: number) : Observable<void> {
  return this._http.post<void>(`${this.baseUrl}/api/CompanyEquipment/Delete/${id}`,{});
}

}
