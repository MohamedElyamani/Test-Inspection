import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServiceItem } from '../interface/serviceItem';

@Injectable({
  providedIn: 'root'
})
export class ServiceItemService {
baseUrl = environment.baseUrl
constructor(private _http: HttpClient) { }

getServiceItemList() : Observable<ServiceItem[]> {
  return this._http.get<ServiceItem[]>(`${this.baseUrl}/api/inspection-serviceitem/GetList`);
}
getServiceItemById(id: number) : Observable<ServiceItem> {
  return this._http.get<ServiceItem>(`${this.baseUrl}/api/inspection-serviceitem/GetById/${id}`);
}
createServiceItem(data: ServiceItem) : Observable<ServiceItem> {
  return this._http.post<ServiceItem>(`${this.baseUrl}/api/inspection-serviceitem/Create`, data);
}
updateServiceItem(id:number , data: ServiceItem) : Observable<ServiceItem> {
  return this._http.post<ServiceItem>(`${this.baseUrl}/api/inspection-serviceitem/Update/${id}`, data);
}
deleteServiceItem(id: number) : Observable<ServiceItem> {
  return this._http.post<ServiceItem>(`${this.baseUrl}/api/inspection-serviceitem/Delete/${id}`, {});
  }
getServiceItemLookup() : Observable<ServiceItem[]> {
    return this._http.get<ServiceItem[]>(`${this.baseUrl}/api/inspection-serviceitem/ServiceItemLookupDefualt`);
  }
}