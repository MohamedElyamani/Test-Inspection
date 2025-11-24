import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private baseUrl = environment.baseUrl;
  private _menuList$ = new BehaviorSubject<any[]>([]);
  public menuList$ = this._menuList$.asObservable();

  private currentLang = 'en';

  constructor(private http: HttpClient) {}

  
  setLanguage(lang: string) {
    this.currentLang = lang;
    this.loadMenuList();
  }

 
  loadMenuList() {
    const body = {
      SqlQueryOptions: {
        Sorts: [],
        Skip: 0,
        Take: 0,
        GetTotal: true,
        Filters: []
      },
      FunctionParameters: [
        { key: 'Lang', value: this.currentLang } 
      ]
    };

    this.http.post<any[]>(`${this.baseUrl}/api/menu/GetMenuList`, body)
      .pipe(tap((data) => this._menuList$.next(data || [])))
      .subscribe();
  }

  get menuListValue(): any[] {
    return this._menuList$.getValue();
  }

  findMenuItemByRoute(route: string): any {
    if (!route) return null;
    return this._menuList$.getValue().find(m => m.WebRoute === route) || null;
  }

getAllMenuItems(): any[] {
  return this._menuList$.getValue() || [];
}

}
//k