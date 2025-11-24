import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyListComponent } from './company/components/company-list/company-list.component';
import { CompanyAddComponent } from './company/components/company-add/company-add.component';
import { CompanyEditComponent } from './company/components/company-edit/company-edit.component';
import { ProjectListComponent } from './project/components/project-list/project-list.component';
import { ProjectAddComponent } from './project/components/project-add/project-add.component';
import { ProjectEditComponent } from './project/components/project-edit/project-edit.component';
import { CustomerSetubListComponent } from './customer-setub/components/customer-setub-list/customer-setub-list.component';
import { CustomerSetubAddComponent } from './customer-setub/components/customer-setub-add/customer-setub-add.component';
import { CustomerSetubEditComponent } from './customer-setub/components/customer-setub-edit/customer-setub-edit.component';
import { LocationListComponent } from './location/components/location-list/location-list.component';
import { LocationAddComponent } from './location/components/location-add/location-add.component';
import { LocationEditComponent } from './location/components/location-edit/location-edit.component';

const routes: Routes = [
  //======== company routes ======
  {path: 'company', component:  CompanyListComponent},
  {path: 'company/add', component:  CompanyAddComponent},
  {path: 'company/edit/:id', component:  CompanyEditComponent},

  //====== project routes ======
  {path: 'project', component:  ProjectListComponent},
  {path: 'project/add', component:  ProjectAddComponent},
  {path: 'project/edit/:id', component:  ProjectEditComponent},

  //======== customer routes ======
  {path: 'customer-setup', component:  CustomerSetubListComponent},
  {path: 'customer-setup/add', component:  CustomerSetubAddComponent},
  {path: 'customer-setup/edit/:id', component:  CustomerSetubEditComponent},

  //===== location routes======
  {path:'location', component:  LocationListComponent},
  {path:'location/add', component:  LocationAddComponent},
  {path:'location/edit/:id', component:  LocationEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
