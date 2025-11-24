import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Branch } from '../interface/branch';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
baseUrl = environment.baseUrl;
constructor(private _http: HttpClient) { }

getBranchesList() : Observable<Branch[]> {
  return this._http.get<Branch[]>(`${this.baseUrl}/api/setting-branch/GetList`);
}
getBranchById(id: number) : Observable<Branch> {
  return this._http.get<Branch>(`${this.baseUrl}/api/setting-branch/GetById/${id}`); 
}
createBranch(data: Branch) : Observable<Branch> {
  return this._http.post<Branch>(`${this.baseUrl}/api/setting-branch/Create`, data);
}
updateBranch(id: number, data: Branch) : Observable<Branch> {
  return this._http.post<Branch>(`${this.baseUrl}/api/setting-branch/Update/${id}`, data);
}
deleteBranch(id: number) : Observable<void> {
  return this._http.post<void>(`${this.baseUrl}/api/setting-branch/Delete/${id}`,{});
}
getBranchLookup(): Observable<Branch[]> {
  return this._http.get<Branch[]>(`${this.baseUrl}/api/setting-branch/BranchLookupDefualt`); 
}
}