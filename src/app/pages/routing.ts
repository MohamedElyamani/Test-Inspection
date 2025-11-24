
import { Routes } from '@angular/router';

const Routing: Routes = [
  //========== Ispection Module ==========
  {
   path: 'inspection',
    // canActivate:[applicationsGuard],
    loadChildren: () => import('../modules/inspection/inspection.module').then((m) => m.InspectionModule),
  },
  //========== Settings Module ==========
  {
   path: 'general',
    // canActivate:[applicationsGuard],
    loadChildren: () => import('../modules/sittengs/settings.module').then((m) => m.SettingsModule),
  },
  //======== Certificate Module ======
  {
   path: 'certificates',
    // canActivate:[applicationsGuard],
    loadChildren: () => import('../modules/certificate/certificate.module').then((m) => m.CertificateModule),
  },
  //======== customer Module ======
  {
   path: 'customer',
    // canActivate:[applicationsGuard],
    loadChildren: () => import('../modules/customer/customer.module').then((m) => m.CustomerModule),
  },
    //======== equipment Module ======
  {
   path: 'equipment',
    // canActivate:[applicationsGuard],
    loadChildren: () => import('../modules/equipment/equipment-module').then((m) => m.EquipmentModule),
  },

  //======== Sales Module ======

  {
   path: 'sales',
    // canActivate:[applicationsGuard],
    loadChildren: () => import('../modules/sales/sales.module').then((m) => m.SalesModule),
  },
  //======== HR Module ======
  {
   path: 'hr',
    // canActivate:[applicationsGuard],
    loadChildren: () => import('../modules/hr/hr.module').then((m) => m.HrModule),
  },

  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'builder',
    loadChildren: () => import('./builder/builder.module').then((m) => m.BuilderModule),
  },
    {
    path: 'Localization',
    loadChildren: () => import('../modules/localization/localization-module').then((m) => m.LocalizationModule),
  },
  {
    path: 'crafted/pages/profile',
    loadChildren: () => import('../modules/profile/profile.module').then((m) => m.ProfileModule),
    // data: { layout: 'light-sidebar' },
  },
  {
    path: 'crafted/account',
    loadChildren: () => import('../modules/account/account.module').then((m) => m.AccountModule),
    // data: { layout: 'dark-header' },
  },
  {
    path: 'crafted/pages/wizards',
    loadChildren: () => import('../modules/wizards/wizards.module').then((m) => m.WizardsModule),
    // data: { layout: 'light-header' },
  },
  {
    path: 'crafted/widgets',
    loadChildren: () => import('../modules/widgets-examples/widgets-examples.module').then((m) => m.WidgetsExamplesModule),
    // data: { layout: 'light-header' },
  },
  {
    path: 'apps/chat',
    loadChildren: () => import('../modules/apps/chat/chat.module').then((m) => m.ChatModule),
    // data: { layout: 'light-sidebar' },
  },
  {
    path: 'apps/users',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'apps/roles',
    loadChildren: () => import('./role/role.module').then((m) => m.RoleModule),
  },
  {
    path: 'apps/permissions',
    loadChildren: () => import('./permission/permission.module').then((m) => m.PermissionModule),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
//a
