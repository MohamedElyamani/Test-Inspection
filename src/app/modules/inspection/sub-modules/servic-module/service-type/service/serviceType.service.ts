import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServiceType , serviceLookUP } from '../interface/serviceType';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceTypeService {
baseUrl = environment.baseUrl;
constructor(private _http: HttpClient) { }
getServiceTypeList(){
  return this._http.post(`${this.baseUrl}/api/service-types/Index`,{});
}

deleteServiceType(id: number){
  return this._http.post(`${this.baseUrl}/api/service-types/Delete/${id}`,{});
}
getServiceTypeId(id: number) : Observable<ServiceType>{
  return this._http.get<ServiceType>(`${this.baseUrl}/api/service-types/GetById/${id}`, {});
}
createService(data: ServiceType) : Observable<ServiceType> {
  return this._http.post<ServiceType>(`${this.baseUrl}/api/service-types/Create`, data);
}
updateService(id: number, data: ServiceType) : Observable<ServiceType> {
  return this._http.post<ServiceType>(`${this.baseUrl}/api/service-types/Update/${id}`, data);
}
serviceTypeLookup() : Observable<serviceLookUP[]>{
  return this._http.get<serviceLookUP[]>(`${this.baseUrl}/api/service-types/LookUpServiceTypeForNames`, {});
}
}