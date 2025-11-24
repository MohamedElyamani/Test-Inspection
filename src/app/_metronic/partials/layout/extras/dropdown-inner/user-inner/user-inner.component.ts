import { Component, HostBinding, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, UserType } from '../../../../../../modules/auth';
import { LocalizationService } from 'src/app/modules/localization/localization/localization.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-inner',
  templateUrl: './user-inner.component.html',
})
export class UserInnerComponent implements OnInit {
  @HostBinding('class')
  class =
    'menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px';
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  user$: Observable<UserType>;
  langs: Array<{ LocaleCode: string; Name: string; direction: 'rtl' | 'ltr' }> = [];

  currentLangCode = '';
  currentLangName = '';

  constructor(
    private auth: AuthService,
    private localizationService: LocalizationService,
    private translate: TranslateService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.user$ = this.auth.currentUserSubject.asObservable();
    this.currentLangCode = (localStorage.getItem('lang') || 'en').toLowerCase();
    this.loadLanguages();

    // Ensure this component re-renders when language changes
    this.translate.onLangChange.subscribe((event) => {
      const lang = event?.lang || localStorage.getItem('lang') || 'en';
      this.currentLangCode = (lang || '').toLowerCase();
      const found = this.langs.find(l => l.LocaleCode === this.currentLangCode);
      if (found) this.currentLangName = found.Name;
      this.cd.markForCheck();
    });
  }

  loadLanguages() {
    // If your backend exposes getLanguages use that; otherwise use getLocalization fallback
    const data = { sorts: [], skip: 0, take: 0, getTotal: true, filters: [] };
    this.localizationService.getLanguages().subscribe({
      next: (res: any) => {
        const items: any[] = Array.isArray(res) ? res : res?.data || res?.items || [];

        const unique = new Map<string, { LocaleCode: string; Name: string; direction: 'rtl' | 'ltr' }>();
        for (const x of items) {
          const code = (x.LocaleCode || '').toLowerCase();
          if (!code) continue;
          if (!unique.has(code)) {
            unique.set(code, {
              LocaleCode: code,
              Name: code === 'ar' ? 'العربية' : code === 'fr' ? 'Français' : 'English',
              direction: code === 'ar' ? 'rtl' : 'ltr',
            });
          }
        }

        if (unique.size === 0) {
          unique.set('en', { LocaleCode: 'en', Name: 'English', direction: 'ltr' });
          unique.set('ar', { LocaleCode: 'ar', Name: 'العربية', direction: 'rtl' });
        }

        this.langs = Array.from(unique.values());
        const found = this.langs.find((l) => l.LocaleCode === this.currentLangCode) || this.langs[0];
        this.currentLangCode = found.LocaleCode;
        this.currentLangName = found.Name;
      },
      error: (err) => {
        console.error('Error loading languages', err);
        // fallback
        this.langs = [
          { LocaleCode: 'en', Name: 'English', direction: 'ltr' },
          { LocaleCode: 'ar', Name: 'العربية', direction: 'rtl' },
        ];
        const found = this.langs.find((l) => l.LocaleCode === this.currentLangCode) || this.langs[0];
        this.currentLangCode = found.LocaleCode;
        this.currentLangName = found.Name;
      }
    });
  }

  // Called on dropdown click
  changeLang(langCode: string) {
    langCode = (langCode || '').toLowerCase();
    if (!langCode || langCode === this.currentLangCode) return;

    const selected = this.langs.find(l => l.LocaleCode === langCode);
    if (!selected) return;

    this.currentLangCode = selected.LocaleCode;
    this.currentLangName = selected.Name;
    localStorage.setItem('lang', this.currentLangCode);

    // Load translations via ngx-translate (AppComponent listens to onLangChange)
    // If you prefer AppComponent to run the API call, call a shared method there
    // (e.g., by exposing a global service). For simplicity, we fetch here:
    const data = {
      sorts: [], skip: 0, take: 1000, getTotal: true,
      filters: [['LocaleCode', '=', this.currentLangCode]],
    };
    this.localizationService.getLocalization(data).subscribe({
      next: (res: any) => {
        const items: any[] = Array.isArray(res) ? res : res?.data || res?.items || [];
        const translations: Record<string, string> = {};
        for (const item of items) {
          if (item.Caption && item.Translate) translations[item.Caption] = item.Translate;
        }

        this.translate.setTranslation(this.currentLangCode, translations, true);
        this.translate.use(this.currentLangCode); // triggers onLangChange globally
      },
      error: (err) => {
        console.error('Error loading translations for', this.currentLangCode, err);
        // still try to switch language so at least direction and pipe behavior changes
        this.translate.use(this.currentLangCode);
      }
    });
  }

  logout() {
    this.auth.logout();
    document.location.reload();
  }
}
//m