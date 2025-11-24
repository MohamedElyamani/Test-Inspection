import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MenuService } from 'src/app/_metronic/shared/service/menu.service';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-breadcrump',
  templateUrl: './breadcrump.component.html',
  styleUrls: ['./breadcrump.component.css'],
})

export class BreadcrumpComponent implements OnInit, OnDestroy {
  
  items: MenuItem[] = [];
  isAdd = false;
  private sub = new Subscription();

  constructor(
    private router: Router,
    private menuService: MenuService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    // 🔹 Load menu
    this.menuService.loadMenuList();

    // 🔹 Rebuild when menu list changes
    this.sub.add(
      this.menuService.menuList$
        .pipe(filter((list) => !!list))
        .subscribe(() => this.buildBreadcrumb())
    );

    // 🔹 Rebuild when navigation changes
    this.sub.add(
      this.router.events
        .pipe(filter((e) => e instanceof NavigationEnd))
        .subscribe(() => this.buildBreadcrumb())
    );

    // 🔹 Rebuild when language changes
    this.sub.add(
      this.translate.onLangChange.subscribe(() => this.buildBreadcrumb())
    );

    // 🔹 Initial load
    this.buildBreadcrumb();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  /** 🔹 Builds translated breadcrumb based on route + menu list */
  private buildBreadcrumb(): void {
    const fullUrl = this.router.url.split('?')[0];
    const segments = fullUrl.split('/').filter((s) => s);
    const lastSegment = segments[segments.length - 1] || '';
    this.isAdd = false;

    // remove /create or /edit from lookup
    let lookupUrl = fullUrl;
    if (lastSegment === 'create' || lastSegment === 'edit') {
      this.isAdd = lastSegment === 'create';
      lookupUrl = fullUrl.replace(`/${lastSegment}`, '');
    }

    const menuItem = this.menuService.findMenuItemByRoute(lookupUrl);
    this.items = [];

    if (menuItem) {
      const parent = this.menuService.findMenuItemByRoute(menuItem.Parent_WebRoute);

      if (parent) {
        this.items.push({
          label: this.translate.instant(parent.Menu_Name),
          routerLink: parent.WebRoute,
        });
      }

      this.items.push({
        label: this.translate.instant(menuItem.Menu_Name),
        routerLink: menuItem.WebRoute,
      });
    } else {
      // fallback: build from URL segments
      let accumulated = '';
      for (let i = 0; i < segments.length; i++) {
        accumulated += '/' + segments[i];
        if (segments[i] === 'create' || segments[i] === 'edit') continue;

        const label = this.formatLabel(segments[i]);
        this.items.push({
          label: this.translate.instant(label),
          routerLink: accumulated,
        });
      }
    }

    if (fullUrl.includes('/edit')) {
      this.items.push({ label: this.translate.instant('Edit') });
    }
  }

  private formatLabel(segment: string): string {
    if (!segment) return '';
    const s = segment.replace(/[-_]/g, ' ');
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}
//k