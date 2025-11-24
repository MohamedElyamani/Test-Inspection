import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppCV, AppCVLookup } from '../interface/appCV';
 

@Injectable({
  providedIn: 'root'
})
export class AppCVService {
baseUrl = environment.baseUrl;
constructor(private _http: HttpClient) { }
getAppCVList() : Observable<AppCV[]> {
  return this._http.post<AppCV[]>(`${this.baseUrl}/api/ApplicantCV/Index`,{});
}
getAppCVById(id: number): Observable<AppCV> {
  return this._http.get<AppCV>(`${this.baseUrl}/api/ApplicantCV/GetById/${id}`);
}
createAppCV(data: AppCV) : Observable<AppCV> {
  return this._http.post<AppCV>(`${this.baseUrl}/api/ApplicantCV/Create`, data);
}
updateAppCV(id: number, data: AppCV) : Observable<AppCV> {
  return this._http.post<AppCV>(`${this.baseUrl}/api/ApplicantCV/Update/${id}`, data);
}
deleteAppCV(id: number) : Observable<any> {
  return this._http.post(`${this.baseUrl}/api/ApplicantCV/Delete/${id}`, {});
}
getAppCvLookUp() : Observable<AppCVLookup[]> {
  return this._http.get<AppCVLookup[]>(`${this.baseUrl}/api/ApplicantCV/LookUpApplicantCVForNames`, {});
}
}