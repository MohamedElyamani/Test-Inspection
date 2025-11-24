import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project, projectLookup } from '../interface/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
baseUrl = environment.baseUrl;
constructor(private _http: HttpClient) { }
getProjectList() {
  return this._http.post(`${this.baseUrl}/api/Project/Index`, {});
}
getProjectById(id: number) : Observable<Project>{
  return this._http.get<Project>(`${this.baseUrl}/api/Project/GetById/${id}`, {});
}
createProject(data: Project) : Observable<Project> {
  return this._http.post<Project>(`${this.baseUrl}/api/Project/Create`, data);
}
updateProject(id: number, data: Project) : Observable<Project> {
  return this._http.post<Project>(`${this.baseUrl}/api/Project/Update/${id}`, data);
}
deleteProject(id: number) : Observable<void> {
  return this._http.post<void>(`${this.baseUrl}/api/Project/Delete/${id}`, {});
}

getProjectLookUp(): Observable<projectLookup[]> {
  return this._http.get<projectLookup[]>(`${this.baseUrl}/api/Project/LookUpProjectForNames`, {});
}

}
