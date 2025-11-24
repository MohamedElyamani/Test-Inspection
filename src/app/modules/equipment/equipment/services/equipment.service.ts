import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Equipment, EquipmentLookup } from '../interface/equipment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

baseUrl = environment.baseUrl;
constructor(private _http: HttpClient) { }
getEquipmentList() : Observable<Equipment[]> {

  return this._http.post<Equipment[]>(`${this.baseUrl}/api/inspection-Equipment/Index`,{});

}
getEquipmentById(id: number) : Observable<Equipment> {
  return this._http.get<Equipment>(`${this.baseUrl}/api/inspection-Equipment/GetById/${id}`);    
}
createEquipment(data: Equipment) : Observable<Equipment> {
  return this._http.post<Equipment>(`${this.baseUrl}/api/inspection-Equipment/Create`, data);
} 
updateEquipment(id: number, data: Equipment) : Observable<Equipment> {
  return this._http.post<Equipment>(`${this.baseUrl}/api/inspection-Equipment/Update/${id}`, data);
}
deleteEquipment(id: number) : Observable<void> {
  return this._http.post<void>(`${this.baseUrl}/api/inspection-Equipment/Delete/${id}`,{});
}
EquipmentLookup() : Observable<EquipmentLookup[]>{
  return this._http.get<EquipmentLookup[]>(`${this.baseUrl}/api/inspection-Equipment/EquipmentLookupDefault`);
}
}
