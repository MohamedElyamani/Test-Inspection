import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Equipmenttype } from '../interface/equipmenttype';

@Injectable({
  providedIn: 'root'
})
export class EquipmenttypeService {
  baseUrl = environment.baseUrl;

constructor(private _http: HttpClient) { }
getEquipmenttypeList() : Observable<Equipmenttype[]> {

   return this._http.post<Equipmenttype[]>(`${this.baseUrl}/api/EquipmentType/Index`,{});

}
 getEquipmenttypeById(id: number) : Observable<Equipmenttype> {
   return this._http.get<Equipmenttype>(`${this.baseUrl}/api/EquipmentType/GetById/${id}`);    
}
createEquipmenttype(data: Equipmenttype) : Observable<Equipmenttype> {
   return this._http.post<Equipmenttype>(`${this.baseUrl}/api/EquipmentType/Create`, data);
 } 
 updateEquipmenttype(id: number, data: Equipmenttype) : Observable<Equipmenttype> {
   return this._http.post<Equipmenttype>(`${this.baseUrl}/api/EquipmentType/Update/${id}`, data);
}
 deleteEquipmenttype(id: number) : Observable<void> {
  return this._http.post<void>(`${this.baseUrl}/api/EquipmentType/Delete/${id}`,{});
 }
}
