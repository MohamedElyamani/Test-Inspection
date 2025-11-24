
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
  path: 'setting',
  loadChildren: () => import('./sub-modules/generals/generals.module').then(m => m.GeneralsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SittengsRoutingModule { }
