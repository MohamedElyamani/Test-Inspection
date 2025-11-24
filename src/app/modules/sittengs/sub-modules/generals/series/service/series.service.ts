import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ScreenCode, Series } from '../interface/series';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
baseUrl = environment.baseUrl;
constructor(private _http: HttpClient) { }

getSeriesList() : Observable<Series[]>{
  return this._http.get<Series[]>(`${this.baseUrl}/api/setting-Series/GetList`);
}
// for screen code lookups
getScreenCode() : Observable<ScreenCode[]>{
  return this._http.get<ScreenCode[]>(`${this.baseUrl}/api/setting-Series/GetScreenList`);
}
createSeries(data: Series) : Observable<Series>{
  return this._http.post<Series>(`${this.baseUrl}/api/setting-Series/Create`, data);
}
updateSeries(id: string, data: Series) : Observable<Series>{
  return this._http.post<Series>(`${this.baseUrl}/api/setting-Series/Update/${id}`, data);
}
getSeriesById(id: string) : Observable<Series>{
  return this._http.get<Series>(`${this.baseUrl}/api/setting-Series/GetById/${id}`);
}
deleteSeries(id: string) : Observable<any>{
  return this._http.post(`${this.baseUrl}/api/setting-Series/Delete/${id}`, {});
}
getSeriesInfoForTables(tableName: string, seriesTableColumn: string, screen_ID: string) {
  return this._http.get<any>(`${this.baseUrl}/api/setting-Series/GetSeriesAndNumberAction`, {
    params: {
      TableName: `${tableName}`,
      SeriesTableColumn: `${seriesTableColumn}`,
      Screen_ID: `${screen_ID}`
    }
    
  });
}
}