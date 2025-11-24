import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewCertifListComponent } from './new-certificate/components/new-certif-list/new-certif-list.component';
import { NewCertifAddComponent } from './new-certificate/components/new-certif-add/new-certif-add.component';
import { NewCertifEditComponent } from './new-certificate/components/new-certif-edit/new-certif-edit.component';

const routes: Routes = [
  // {
  // path: 'managment',
  // loadChildren: () => import('./sub-modules/managment/managment.module').then(m => m.ManagmentModule)
  // }
  //======== new certificate ===========
  {path:"new-certificate", component:NewCertifListComponent},
  {path:"new-certificate/add", component:NewCertifAddComponent},
  {path:"new-certificate/edit/:id", component:NewCertifEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificateRoutingModule { }
