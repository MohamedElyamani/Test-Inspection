import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../interface/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
baseUrl = environment.baseUrl;
constructor(private _http: HttpClient) { }
getEmplyeeList() : Observable<Employee[]> {
  return this._http.post<Employee[]>(`${this.baseUrl}/api/Employee/Index`,{});
}
getEmployeeById(id: number) : Observable<Employee> {
  return this._http.get<Employee>(`${this.baseUrl}/api/Employee/GetById/${id}`);
}
createEmployee(data: Employee) : Observable<any> {
  return this._http.post<any>(`${this.baseUrl}/api/Employee/Create`, data); 
}
updateEmployee( id: number , data: Employee) : Observable<any> {
  return this._http.post<any>(`${this.baseUrl}/api/Employee/Update`, data); 
}
deleteEmployee(id: number) : Observable<any> {
  return this._http.post<any>(`${this.baseUrl}/api/Employee/Delete/${id}`, {});
}
}