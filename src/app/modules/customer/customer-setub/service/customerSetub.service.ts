import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { customerLookup, CustomerSetub } from '../interface/customerSetub';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerSetubService {
baseUrl = environment.baseUrl;
constructor(private _http: HttpClient) { }
getCustomerList(){
  return this._http.post(`${this.baseUrl}/api/Customer/Index`,{});
}
getCustomerById(id: number): Observable<CustomerSetub>{
  return this._http.get<CustomerSetub>(`${this.baseUrl}/api/Customer/GetById/${id}`); 
}
createCustomer(data: CustomerSetub):Observable<CustomerSetub>{
  return this._http.post<CustomerSetub>(`${this.baseUrl}/api/Customer/Create`, data);
}
updateCustomer(id: number, data: CustomerSetub):Observable<CustomerSetub>{
  return this._http.post<CustomerSetub>(`${this.baseUrl}/api/Customer/Update/${id}`, data);
}
deleteCustomer(id: number){
  return this._http.post(`${this.baseUrl}/api/Customer/Delete/${id}`,{});
}
// customer LookUp
getCustomerLookUp() : Observable<customerLookup[]>{
  return this._http.get<customerLookup[]>(`${this.baseUrl}/api/Customer/LookUpCustomerForNames`, {});
}
}
