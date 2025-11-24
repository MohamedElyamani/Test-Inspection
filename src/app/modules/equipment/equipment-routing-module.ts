import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentListComponent } from './equipment/components/equipment-list/equipment-list.component';
import { EquipmentAddComponent } from './equipment/components/equipment-add/equipment-add.component';
import { EquipmentEditComponent } from './equipment/components/equipment-edit/equipment-edit.component';
import { EquipmentinspectionListComponent } from './equipmentinspection/components/equipmentinspection-list/equipmentinspection-list.component';
import { EquipmentinspectionAddComponent } from './equipmentinspection/components/equipmentinspection-add/equipmentinspection-add.component';
import { EquipmentinspectionEditComponent } from './equipmentinspection/components/equipmentinspection-edit/equipmentinspection-edit.component';
import { MaintenancescheduleListComponent } from './maintenanceschedule/components/maintenanceschedule-list/maintenanceschedule-list.component';
import { MaintenancescheduleAddComponent } from './maintenanceschedule/components/maintenanceschedule-add/maintenanceschedule-add.component';
import { MaintenancescheduleEditComponent } from './maintenanceschedule/components/maintenanceschedule-edit/maintenanceschedule-edit.component';
import { EquipmentmoreinformationListComponent } from './equipmentmoreinformation/components/equipmentmoreinformation-list/equipmentmoreinformation-list/equipmentmoreinformation-list.component';
import { EquipmentmoreinformationAddComponent } from './equipmentmoreinformation/components/equipmentmoreinformation-add/equipmentmoreinformation-add/equipmentmoreinformation-add.component';
import { EquipmentmoreinformationEditComponent } from './equipmentmoreinformation/components/equipmentmoreinformation-edit/equipmentmoreinformation-edit/equipmentmoreinformation-edit.component';
import { EquipmenttypeListComponent } from './equipmenttype/components/equipmenttype-list/equipmenttype-list.component';
import { EquipmenttypeAddComponent } from './equipmenttype/components/equipmenttype-add/equipmenttype-add.component';
import { EquipmenttypeEditComponent } from './equipmenttype/components/equipmenttype-edit/equipmenttype-edit.component';
import { CompanyListComponent } from '../customer/company/components/company-list/company-list.component';
import { CompanyequipmentListComponent } from './companyequipment/companyequipment-list/companyequipment-list.component';
import { CompanyequipmentAddComponent } from './companyequipment/companyequipment-add/companyequipment-add.component';
import { CompanyequipmentEditComponent } from './companyequipment/companyequipment-edit/companyequipment-edit.component';

const routes: Routes = [
  //======== equipment routes ======
  {path: 'equipment', component:  EquipmentListComponent},
  {path: 'equipment/add', component:  EquipmentAddComponent},
  {path: 'equipment/edit/:id', component:  EquipmentEditComponent},

  //====== equipmentinspection routes ======
  {path: 'equipmentinspection', component:  EquipmentinspectionListComponent},
  {path: 'equipmentinspection/add', component:  EquipmentinspectionAddComponent},
  {path: 'equipmentinspection/edit/:id', component:  EquipmentinspectionEditComponent},

  //======== equipmenttype routes ======
  {path: 'equipmenttype', component:  EquipmenttypeListComponent},
  {path: 'equipmenttype/add', component:  EquipmenttypeAddComponent},
  {path: 'equipmenttype/edit/:id', component:  EquipmenttypeEditComponent},

  //===== maintenanceschedule routes======
  {path:'maintenanceschedule', component:  MaintenancescheduleListComponent},
  {path:'maintenanceschedule/add', component:  MaintenancescheduleAddComponent},
  {path:'maintenanceschedule/edit/:id', component:  MaintenancescheduleEditComponent},
  
  //===== Equipmentmoreinformation routes======
  {path:'equipmentmoreinformation', component:  EquipmentmoreinformationListComponent},
  {path:'equipmentmoreinformation/add', component:  EquipmentmoreinformationAddComponent},
  {path:'equipmentmoreinformation/edit/:id', component:  EquipmentmoreinformationEditComponent},
    
  //======== companyequipment routes ======
  {path: 'companyequipment', component:  CompanyequipmentListComponent},
  {path: 'companyequipment/add', component:  CompanyequipmentAddComponent},
  {path: 'companyequipment/edit/:id', component:  CompanyequipmentEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentRoutingModule { }
