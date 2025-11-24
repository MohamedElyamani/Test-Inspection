import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InspectionListComponent } from './inspection-request/components/inspection-list/inspection-list.component';
import { InspectionAddComponent } from './inspection-request/components/inspection-add/inspection-add.component';
import { InspectionEditComponent } from './inspection-request/components/inspection-edit/inspection-edit.component';
import { InspectionScheduleListComponent } from './inspection-schedule/components/inspection-schedule-list/inspection-schedule-list.component';
import { InspectionScheduleAddComponent } from './inspection-schedule/components/inspection-schedule-add/inspection-schedule-add.component';
import { InspectionScheduleEditComponent } from './inspection-schedule/components/inspection-schedule-edit/inspection-schedule-edit.component';
import { InspectionSiteListComponent } from './inspection-site/components/inspection-site-list/inspection-site-list.component';
import { InspectionSiteAddComponent } from './inspection-site/components/inspection-site-add/inspection-site-add.component';
import { InspectionSiteEditComponent } from './inspection-site/components/inspection-site-edit/inspection-site-edit.component';
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

const routes: Routes = [
  //{path: '', redirectTo: 'inspection-list', pathMatch: 'full'},
  //======== Inspection Request ===========
  {path: 'request', component: InspectionListComponent},
  {path: 'request/add', component: InspectionAddComponent , data: { mode: 'add' }},
  {path: 'request/edit/:id', component: InspectionEditComponent, data: { mode: 'edit' }},

  //======== Inspection Schedule ===========
  {path: 'schedule', component: InspectionScheduleListComponent},
  {path: 'schedule/add', component: InspectionScheduleAddComponent , data: { mode: 'add' }},
  {path: 'schedule/edit/:id', component: InspectionScheduleEditComponent, data: { mode: 'edit' }},

  //======== Inspection Site ===========
  {path: 'site', component: InspectionSiteListComponent},
  {path: 'site/add', component: InspectionSiteAddComponent , data: { mode: 'add' }},
  {path: 'site/edit/:id', component: InspectionSiteEditComponent, data: { mode: 'edit' }},

  //======== Inspection Method ===========
  {path: 'method', component: InspectionMethodListComponent},
  {path: 'method/add', component: InspectionMethodAddComponent},
  {path: 'method/edit/:id', component: InspectionMethodEditComponent},

  //======== Inspector Category ===========
  {path: 'inspector-category', component: InspectorCategoryListComponent},
  {path: 'inspector-category/add', component: InspectorCategoryAddComponent},
  {path: 'inspector-category/edit/:id', component: InspectorCategoryEditComponent},

  //======== Inspector ===========
  {path: 'inspector', component: InspectorListComponent},
  {path: 'inspector/add', component: InspectorAddComponent},
  {path: 'inspector/edit/:id', component: InspectorEditComponent},
   //======== inspction-service-order ===========
  {path: 'Inspection-Service-Order', component:InspctionServiceOrderListComponent},
  {path: 'Inspection-Service-Order/add', component: InspctionServiceOrderAddComponent},
  {path: 'Inspection-Service-Order/edit/:id', component: InspctionServiceOrderEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationRoutingModule { }
