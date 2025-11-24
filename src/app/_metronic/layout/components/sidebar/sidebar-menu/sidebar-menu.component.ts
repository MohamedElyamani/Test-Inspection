import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/_metronic/shared/interface/MenuItems';
import { MenuService } from 'src/app/_metronic/shared/service/menu.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  menuList: MenuItem[] = [];

  constructor(private _menu: MenuService) { }

  ngOnInit(): void {
    this.getMenu(); // صححت الاسم
  }

  getMenu(): void {
    // استخدام الـ observable مباشرة بدلاً من getMenuList()
    this._menu.menuList$.subscribe({
      next: (res: MenuItem[]) => {
        this.menuList = res;
      },
      error: (err: any) => {
        console.error('Failed to load menu:', err);
      }
    });
  }
}
//s