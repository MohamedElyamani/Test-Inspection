import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from '../interface/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
baseUrl = environment.baseUrl;
constructor(private _http: HttpClient) { }
getDeptList() : Observable<Department[]>{
  return this._http.post<Department[]>(`${this.baseUrl}/api/Department/Index`,{});
}
getDeptById(id: number): Observable<Department> {
  return this._http.get<Department>(`${this.baseUrl}/api/Department/GetById/${id}`);
}
createDept(dept: Department): Observable<Department> {
  return this._http.post<Department>(`${this.baseUrl}/api/Department/Create`, dept);
}
updateDept(id: number, dept: Department): Observable<Department> {
  return this._http.post<Department>(`${this.baseUrl}/api/Department/Update/${id}`, dept);
}
deleteDept(id: number): Observable<any> {
  return this._http.post(`${this.baseUrl}/api/Department/Delete/${id}`, {});
}
getDeptLookUp() : Observable<Department[]> {
  return this._http.get<Department[]>(`${this.baseUrl}/api/Department/LookUpDepartmentForNames`, {});
}
}