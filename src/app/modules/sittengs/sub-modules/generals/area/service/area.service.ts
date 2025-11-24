import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Area } from '../interface/area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
baseUrl = environment.baseUrl;
constructor(private _http: HttpClient) { }
getAreaList() : Observable<Area[]>{
  return this._http.get<Area[]>(`${this.baseUrl}/api/setting-area/GetList`);
}
createArea(data: Area) : Observable<Area>{
  return this._http.post<Area>(`${this.baseUrl}/api/setting-area/Create`, data);
}
updateArea(id: number, data: Area) : Observable<Area>{
  return this._http.post<Area>(`${this.baseUrl}/api/setting-area/Update/${id}`, data);
}
getAreaById(id: number) : Observable<Area>{
  return this._http.get<Area>(`${this.baseUrl}/api/setting-area/GetById/${id}`);
}
deleteArea(id: number) : Observable<any>{
  return this._http.post(`${this.baseUrl}/api/setting-area/Delete/${id}`, {});
}
getAreaLookup(): Observable<Area[]> {
  return this._http.get<Area[]>(`${this.baseUrl}/api/setting-area/AreaLookupDefault`); 
}
}