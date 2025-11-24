import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InspectionCertificate } from '../interface/newCertif';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewCertifService {

  baseUrl = environment.baseUrl;

constructor(private _http: HttpClient) { }
getCertificateList() : Observable<InspectionCertificate[]> {

   return this._http.post<InspectionCertificate[]>(`${this.baseUrl}}/api/inspection-certificates/Index`,{});

}
 getCertificateById(id: number) : Observable<InspectionCertificate> {
   return this._http.get<InspectionCertificate>(`${this.baseUrl}}/api/inspection-certificates/GetById/${id}`);    
}
createCertificate(data: InspectionCertificate) : Observable<InspectionCertificate> {
   return this._http.post<InspectionCertificate>(`${this.baseUrl}/api/inspection-certificates/Create`, data);
 } 
 updateCertificate(id: number, data: InspectionCertificate) : Observable<InspectionCertificate> {
   return this._http.post<InspectionCertificate>(`${this.baseUrl}}/api/inspection-certificates/Update/${id}`, data);
}
 deleteCertificate(id: number) : Observable<void> {
  return this._http.post<void>(`${this.baseUrl}}/api/inspection-certificates/Delete/${id}`,{});
 }
}
