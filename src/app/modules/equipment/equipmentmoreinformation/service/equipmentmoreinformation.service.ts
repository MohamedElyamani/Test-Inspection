import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Equipmentmoreinformation } from '../interface/equipmentmoreinformation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipmentmoreinformationService {


baseUrl = environment.baseUrl;
constructor(private _http: HttpClient) { }
getEquipmentInformationList() : Observable<Equipmentmoreinformation[]> {

  return this._http.post<Equipmentmoreinformation[]>(`${this.baseUrl}/api/Equipments-EquipmentsMoreInformations/Index`,{});

}
getEquipmentInformationById(id: number) : Observable<Equipmentmoreinformation> {
  return this._http.get<Equipmentmoreinformation>(`${this.baseUrl}/api/Equipments-EquipmentsMoreInformations/GetById/${id}`);    
}
createEquipmentInformation(data: Equipmentmoreinformation) : Observable<Equipmentmoreinformation> {
  return this._http.post<Equipmentmoreinformation>(`${this.baseUrl}/api/Equipments-EquipmentsMoreInformations/Create`, data);
} 
updateEquipmentInformation(id: number, data: Equipmentmoreinformation) : Observable<Equipmentmoreinformation> {
  return this._http.post<Equipmentmoreinformation>(`${this.baseUrl}/api/Equipments-EquipmentsMoreInformations/Update/${id}`, data);
}
deleteEquipmentInformation(id: number) : Observable<void> {
  return this._http.post<void>(`${this.baseUrl}/api/Equipments-EquipmentsMoreInformations/Delete/${id}`,{});
}

}
