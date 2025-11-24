import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationRoutingModule } from './operation-routing.module';
import { InspectionListComponent } from './inspection-request/components/inspection-list/inspection-list.component';
import { InspectionAddComponent } from './inspection-request/components/inspection-add/inspection-add.component';
import { InspectionEditComponent } from './inspection-request/components/inspection-edit/inspection-edit.component';
import { OperationComponent } from './operation.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InspectionScheduleListComponent } from './inspection-schedule/components/inspection-schedule-list/inspection-schedule-list.component';
import { InspectionScheduleAddComponent } from './inspection-schedule/components/inspection-schedule-add/inspection-schedule-add.component';
import { InspectionScheduleEditComponent } from './inspection-schedule/components/inspection-schedule-edit/inspection-schedule-edit.component';
import { InspectionSiteListComponent } from './inspection-site/components/inspection-site-list/inspection-site-list.component';
import { InspectionSiteAddComponent } from './inspection-site/components/inspection-site-add/inspection-site-add.component';
import { InspectionSiteEditComponent } from './inspection-site/components/inspection-site-edit/inspection-site-edit.component';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { InspectionMethodListComponent } from './inspection-method/components/inspection-method-list/inspection-method-list.component';
import { InspectionMethodAddComponent } from './inspection-method/components/inspection-method-add/inspection-method-add.component';
import { InspectionMethodEditComponent } from './inspection-method/components/inspection-method-edit/inspection-method-edit.component';
import { InspectorCategoryListComponent } from './inspector-category/components/inspector-category-list/inspector-category-list.component';
import { InspectorCategoryAddComponent } from './inspector-category/components/inspector-category-add/inspector-category-add.component';
import { InspectorCategoryEditComponent } from './inspector-category/components/inspector-category-edit/inspector-category-edit.component';
import { InspectorListComponent } from './inspector/components/inspector-list/inspector-list.component';
import { InspectorAddComponent } from './inspector/components/inspector-add/inspector-add.component';
import { InspectorEditComponent } from './inspector/components/inspector-edit/inspector-edit.component';
import { InspctionServiceOrderAddComponent } from './inspction-service-order/inspction-service-order-add/inspction-service-order-add.component';
import { InspctionServiceOrderListComponent } from './inspction-service-order/inspction-service-order-list/inspction-service-order-list.component';
import { InspctionServiceOrderEditComponent } from './inspction-service-order/inspction-service-order-edit/inspction-service-order-edit.component';


@NgModule({
  declarations: [
    OperationComponent,
    //Inspection request components
    InspectionListComponent,
    InspectionAddComponent,
    InspectionEditComponent,

    // inspection schedule
    InspectionScheduleListComponent,
    InspectionScheduleAddComponent,
    InspectionScheduleEditComponent,

    // inspectin site components
    InspectionSiteListComponent,
    InspectionSiteAddComponent,
    InspectionSiteEditComponent,

    // inspection method components
    InspectionMethodListComponent,
    InspectionMethodAddComponent,
    InspectionMethodEditComponent,

    // inspector category components
    InspectorCategoryListComponent,
    InspectorCategoryAddComponent,
    InspectorCategoryEditComponent,

    // inspector  components
    InspectorListComponent,
    InspectorAddComponent,
    InspectorEditComponent,
       // InspectionServiceOrder  components
    InspctionServiceOrderAddComponent,
    InspctionServiceOrderListComponent,
    InspctionServiceOrderEditComponent,
  ],
  imports: [
    CommonModule,
    OperationRoutingModule,
    SharedModule,
    
  ],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class OperationModule { }
