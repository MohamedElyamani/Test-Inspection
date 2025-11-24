import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { LocalizationItem, Language, ApiResponse } from '../localization/local';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  private baseUrl = environment.baseUrl;
  private translations: Record<string, string> = {}; // 🧠 store API translations

  constructor(
    private http: HttpClient,
    private translateService: TranslateService // ✅ inject ngx-translate
  ) {}

  // ----------------- API CALLS -----------------

  getLanguages(): Observable<ApiResponse<Language[]>> {
    return this.http.post<ApiResponse<Language[]>>(
      `${this.baseUrl}/api/language/Index`,
      {}
    );
  }

  getLocalization(data: any): Observable<LocalizationItem[]> {
    return this.http.post<LocalizationItem[]>(
      `${this.baseUrl}/api/localization/Index`,
      data
    );
  }

  insertLocale(data: LocalizationItem): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/localization/Insert`, data);
  }
  updateLocale( id:number,data: LocalizationItem): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/localization/Update/${id}`, data);
  }
  deleteLocale(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/localization/Delete`, data);
  }

  // ----------------- LOAD TRANSLATIONS -----------------

  loadTranslations(lang: string): void {
    const data = {
      filters: [['LocaleCode', '=', lang]],
      sorts: [],
      skip: 0,
      take: 0,
      getTotal: true
    };

    this.getLocalization(data)
      .pipe(
        tap((res: LocalizationItem[]) => {
          const translations: Record<string, string> = {};
          res.forEach(item => {
         
            translations[item.Caption] = item.Translate;
          });

          // 🧠 Store locally
          this.translations = translations;

          // 🌀 Update ngx-translate
          this.translateService.setTranslation(lang, translations, true);
          this.translateService.use(lang);

          console.log('✅ Translations loaded:', translations);
        })
      )
      .subscribe();
  }

  // ----------------- TRANSLATION METHODS -----------------

  instant(key: string): string {
    // 1️⃣ Check local cache first
    if (this.translations[key]) {
      return this.translations[key];
    }

    // 2️⃣ Fallback to ngx-translate
    const fromLib = this.translateService.instant(key);
    if (fromLib && fromLib !== key) return fromLib;

    // 3️⃣ Fallback to key itself
    return key;
  }

  get(key: string): Observable<string> {
    return this.translateService.get(key);
  }
}
