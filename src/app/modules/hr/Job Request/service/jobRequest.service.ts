
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JobRequest } from '../interface/jobRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobRequestService {
baseUrl = environment.baseUrl;
constructor(private _http: HttpClient) { }
getJobRequestList(): Observable<JobRequest[]> {
  return this._http.post<JobRequest[]>(`${this.baseUrl}/api/JobRequest/Index/`,{});
}
getJobRequestById(id: number): Observable<JobRequest> {
  return this._http.get<JobRequest>(`${this.baseUrl}/api/JobRequest/GetById/${id}`);
}
createJobRequest(jobRequest: JobRequest): Observable<JobRequest> {
  return this._http.post<JobRequest>(`${this.baseUrl}/api/JobRequest/Create`, jobRequest);
}
updateJobRequest(id: number, jobRequest: JobRequest): Observable<JobRequest> {
  return this._http.post<JobRequest>(`${this.baseUrl}/api/JobRequest/Update/${id}`, jobRequest);
}
deleteJobRequest(id: number): Observable<any> {
  return this._http.post(`${this.baseUrl}/api/JobRequest/Delete/${id}`,{});
}
}