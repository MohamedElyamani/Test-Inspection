import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicModuleRoutingModule } from './servic-module-routing.module';
import { ServiceItemListComponent } from './service-item/components/service-item-list/service-item-list.component';
import { ServiceItemAddComponent } from './service-item/components/service-item-add/service-item-add.component';
import { ServiceItemEditComponent } from './service-item/components/service-item-edit/service-item-edit.component';
import { ServiceTypeEditComponent } from './service-type/components/service-type-edit/service-type-edit.component';
import { ServiceTypeListComponent } from './service-type/components/service-type-list/service-type-list.component';
import { ServiceTypeAddComponent } from './service-type/components/service-type-add/service-type-add.component';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';


@NgModule({
  declarations: [
    ServiceItemListComponent,
    ServiceItemAddComponent,
    ServiceItemEditComponent,

    // ==== service type ====
    ServiceTypeAddComponent,
    ServiceTypeListComponent,
    ServiceTypeEditComponent,
  ],
  imports: [
    CommonModule,
    ServicModuleRoutingModule,
    SharedModule,
  ]
})
export class ServicModuleModule { }
