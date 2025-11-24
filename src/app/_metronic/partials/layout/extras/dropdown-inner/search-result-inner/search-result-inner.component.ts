import { ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/_metronic/shared/service/menu.service';
import { MenuItem } from 'src/app/_metronic/shared/interface/MenuItems';
import { create, all } from 'mathjs';

const math = create(all);

@Component({
  selector: 'app-search-result-inner',
  templateUrl: './search-result-inner.component.html',
})
export class SearchResultInnerComponent implements OnInit {
  @HostBinding('class') class = 'menu menu-sub menu-sub-dropdown p-7 w-325px w-md-375px';
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';
  @HostBinding('attr.data-kt-search-element') dataKtSearch = 'content';

  resultModels: ResultModel[] = [];
  recentlySearchedModels: ResultModel[] = [];

  keyword: string = '';
  searching: boolean = false;
  allPages: MenuItem[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.menuService.loadMenuList();
    this.menuService.menuList$.subscribe((menuList) => {
      this.allPages = this.flattenMenu(menuList);
      this.cdr.detectChanges();
    });

    const stored = localStorage.getItem('recentlySearched');
    this.recentlySearchedModels = stored ? JSON.parse(stored) : [];
  }

  flattenMenu(menuList: MenuItem[], parentName: string = ''): MenuItem[] {
    let flattened: MenuItem[] = [];
    for (const item of menuList) {
      flattened.push({
        ...item,
        Menu_Name: parentName ? `${parentName} > ${item.Menu_Name}` : item.Menu_Name,
      });

      if (item.SubMenus && item.SubMenus.length > 0) {
        flattened.push(...this.flattenMenu(item.SubMenus, item.Menu_Name));
      }
    }
    return flattened;
  }

  search(keyword: string) {
    this.keyword = keyword.trim();
    this.resultModels = [];

    if (!this.keyword) return;

    this.searching = true;

    setTimeout(() => {
      const lowerKeyword = this.keyword.toLowerCase();

      // 1️⃣ Try to evaluate as math expression
      let mathResult: string | null = null;
      try {
        mathResult = math.evaluate(this.keyword).toString();
      } catch (e) {
        mathResult = null;
      }

      if (mathResult) {
        this.resultModels.push({
          title: `${this.keyword} = ${mathResult}`,
          description: 'Math Result',
        });
      }

      // 2️⃣ Search menu pages
      const pageResults = this.allPages
        .filter(
          (p) =>
            p.Menu_Name?.toLowerCase().includes(lowerKeyword) ||
            p.WebRoute?.toLowerCase().includes(lowerKeyword)
        )
        .map((p) => ({
          title: p.Menu_Name,
          description: p.WebRoute || 'Page in system',
          icon: './assets/media/icons/duotune/general/gen051.svg',
          route: p.WebRoute,
        }));

      this.resultModels.push(...pageResults);

      this.searching = false;
      this.cdr.detectChanges();
    }, 300);
  }

  navigateTo(item: ResultModel) {
    if (item.route) {
      // Add actual page to recently searched
      if (!this.recentlySearchedModels.some((r) => r.route === item.route)) {
        this.recentlySearchedModels.unshift({
          title: item.title,
          description: item.route,
          route: item.route,
          icon: item.icon,
        });
        this.recentlySearchedModels = this.recentlySearchedModels.slice(0, 10);
        localStorage.setItem(
          'recentlySearched',
          JSON.stringify(this.recentlySearchedModels)
        );
      }
      this.router.navigate([item.route]);
      this.clearSearch();
    }
  }

  clearSearch() {
    this.keyword = '';
    this.resultModels = [];
  }
}

interface ResultModel {
  icon?: string;
  image?: string;
  title: string;
  description: string;
  route?: string;
}
//maryam