import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JobOrder } from '../interface/jobOrder';

@Injectable({
  providedIn: 'root'
})
export class JobOrderService {
baseUrl = environment.baseUrl;
constructor(private _http: HttpClient) { }

getJobOrderList() : Observable<JobOrder[]> {

  return this._http.post<JobOrder[]>(`${this.baseUrl}/api/sales-JobOrder/Index`,{});

}
getJobOrderById(id: number) : Observable<JobOrder> {
  return this._http.get<JobOrder>(`${this.baseUrl}/api/sales-JobOrder/GetById/${id}`);    
}
createJobOrder(data: JobOrder) : Observable<JobOrder> {
  return this._http.post<JobOrder>(`${this.baseUrl}/api/sales-JobOrder/Create`, data);
} 
updateJobOrder(id: number, data: JobOrder) : Observable<JobOrder> {
  return this._http.post<JobOrder>(`${this.baseUrl}/api/sales-JobOrder/Update/${id}`, data);
}
deleteJobOrder(id: number) : Observable<void> {
  return this._http.post<void>(`${this.baseUrl}/api/sales-JobOrder/Delete/${id}`,{});
}


}