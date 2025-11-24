import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Company, companyLookup } from '../interface/company';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
baseUrl = environment.baseUrl;
constructor(private _http: HttpClient) { }
getCompanyList(){
  return this._http.post(`${this.baseUrl}/api/Company/Index`,{});
}
getCompanyById(id: number): Observable<Company>{
  return this._http.get<Company>(`${this.baseUrl}/api/Company/GetById/${id}`); 
}
createCompany(data: Company):Observable<Company>{
  return this._http.post<Company>(`${this.baseUrl}/api/Company/Create`, data);
}
updateCompany(id: number, data: Company):Observable<Company>{
  return this._http.post<Company>(`${this.baseUrl}/api/Company/Update/${id}`, data);
}
deleteCompany(id: number){
  return this._http.post(`${this.baseUrl}/api/Company/Delete/${id}`,{});
}
// compamy LookUp
getCompanyLookUp() : Observable<companyLookup[]> {
  return this._http.get<companyLookup[]>(`${this.baseUrl}/api/Company/LookUpCompanyForNames`, {});
}
}