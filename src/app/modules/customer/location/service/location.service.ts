import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomerLocation, locationLookup } from '../interface/customerLocation';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
baseUrl = environment.baseUrl;
constructor(private _http: HttpClient) { }
getLocationList() {
  return this._http.post(`${this.baseUrl}/api/Location/Index`, {});
}
getLocationById(id: number) : Observable<CustomerLocation>{
  return this._http.get<CustomerLocation>(`${this.baseUrl}/api/Location/GetById/${id}`, {});
}
createLocation(data: CustomerLocation) : Observable<CustomerLocation> {
  return this._http.post<CustomerLocation>(`${this.baseUrl}/api/Location/Create`, data);
}
updateLocation(id: number, data: CustomerLocation) : Observable<CustomerLocation> {
  return this._http.post<CustomerLocation>(`${this.baseUrl}/api/Location/Update/${id}`, data);
}
deleteLocation(id: number) : Observable<void> {
  return this._http.post<void>(`${this.baseUrl}/api/Location/Delete/${id}`, {});
}



// location lookup
getLocationLookUp() : Observable<locationLookup[]> {
  return this._http.get<locationLookup[]>(`${this.baseUrl}/api/Location/LookUpLocationForNames`, {});
}
}