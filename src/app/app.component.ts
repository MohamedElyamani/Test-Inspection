import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalizationService } from './modules/localization/localization/localization.service';
import { ThemeModeService } from './_metronic/partials/layout/theme-mode-switcher/theme-mode.service';
import { MenuService } from './_metronic/shared/service/menu.service';

@Component({
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private localizationService: LocalizationService,
    private modeService: ThemeModeService,
    private cd: ChangeDetectorRef,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.modeService.init();

    const savedLang = (localStorage.getItem('lang') || 'en').toLowerCase();
    this.loadTranslations(savedLang);

    // When ngx-translate fires onLangChange, ensure root component detects changes
    this.translate.onLangChange.subscribe((event) => {
      // ensure direction and stylesheet are applied (if any other component changed lang)
      const lang = event?.lang || (localStorage.getItem('lang') || 'en');
      this.setDirection(lang);
      // mark for check so OnPush children that rely on inputs get refreshed
      this.cd.markForCheck();
    });
  }

  // Called by application-level switchers if you want a single central method
  changeLanguage(lang: string) {
    if (!lang) return;
    localStorage.setItem('lang', lang);
    // load translations from API then call translate.use (loadTranslations does both)
    this.loadTranslations(lang);
    // translate.use will trigger onLangChange -> markForCheck above
  }

  private loadTranslations(lang: string) {
    const data = {
      sorts: [],
      skip: 0,
      take: 1000,
      getTotal: true,
      filters: [['LocaleCode', '=', lang]],
    };

    this.localizationService.getLocalization(data).subscribe({
      next: (res: any) => {
        const items: any[] = Array.isArray(res)
          ? res
          : res?.data || res?.items || [];

        const translations: Record<string, string> = {};
        items.forEach((item) => {
          if (item.Caption && item.Translate) translations[item.Caption] = item.Translate;
        });

        // give translations to ngx-translate and use the language
        this.translate.setTranslation(lang, translations, true);
        this.translate.use(lang);

        // apply document direction & swap stylesheet
        this.setDirection(lang);
        this.menuService.setLanguage(lang);
      },
      error: (err) => console.error('Error loading localization:', err),
    });
  }

  private setDirection(lang: string) {
    const isRtl = lang?.toLowerCase().startsWith('ar');
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);

    // swap CSS file (assumes you have style.css and style.rtl.css)
    const cssFile = isRtl ? 'assets/css/style.rtl.css' : 'assets/css/style.css';
    this.swapStyle(cssFile);
  }

  private swapStyle(href: string) {
    let linkEl = document.getElementById('appStyle') as HTMLLinkElement;
    if (!linkEl) {
      linkEl = document.createElement('link');
      linkEl.rel = 'stylesheet';
      linkEl.id = 'appStyle';
      document.head.appendChild(linkEl);
    }
    if (linkEl.href !== href) {
      linkEl.href = href;
    }
  }
}
 //m