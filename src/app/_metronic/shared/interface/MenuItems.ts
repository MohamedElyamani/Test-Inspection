export interface MenuItem {
  Menu_ID: string;
  Menu_Name: string;
  Parent_ID: string | null;
  WebRoute: string;
  Icon: string;
  Program_ID: string;
  SubMenus: MenuItem[];
}
//h