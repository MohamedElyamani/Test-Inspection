import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
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
import { SharedModule } from 'src/app/_metronic/shared/shared.module';


@NgModule({
  declarations: [
    //======== company component ======
    CompanyListComponent,
    CompanyEditComponent,
    CompanyAddComponent,

    //====== project component ======
     ProjectListComponent,
     ProjectAddComponent,
     ProjectEditComponent,

     //======== customer component ======
     CustomerSetubListComponent,
     CustomerSetubAddComponent,
     CustomerSetubEditComponent,

     //===== location component======
       LocationListComponent,
       LocationAddComponent,
       LocationEditComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule
  ]
})
export class CustomerModule { }
