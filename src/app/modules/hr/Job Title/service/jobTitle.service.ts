import { create } from 'mathjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JobTitle, JobTitleLookup } from '../interface/jobTitle';

@Injectable({
  providedIn: 'root'
})
export class JobTitleService {
baseUrl = environment.baseUrl;
constructor(private _http: HttpClient) { }

getJobTitleList(): Observable<JobTitle[]> {
  return this._http.post<JobTitle[]>(`${this.baseUrl}/api/JobTitle/Index`,{});
}
getJobTitleById(id: number): Observable<JobTitle> {
  return this._http.get<JobTitle>(`${this.baseUrl}/api/jobTitle/GetById/${id}`);
}
createJobTitle(jobTitle: JobTitle): Observable<JobTitle> {
  return this._http.post<JobTitle>(`${this.baseUrl}/api/JobTitle/Create`, jobTitle);
}
updateJobTitle(id: number, jobTitle: JobTitle): Observable<JobTitle> {
  return this._http.post<JobTitle>(`${this.baseUrl}/api/jobTitle/Update/${id}`, jobTitle);
}
deleteJobTitle(id: number): Observable<any> {
  return this._http.post(`${this.baseUrl}/api/jobTitle/Delete/${id}`,{});
}
getJobTitleLookUp() : Observable<JobTitleLookup[]> {
  return this._http.get<JobTitleLookup[]>(`${this.baseUrl}/api/JobTitle/LookUpJobTitleForNames`, {});
}
}