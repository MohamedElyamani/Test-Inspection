import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentRoutingModule } from './equipment-routing-module';
import { EquipmentAddComponent } from './equipment/components/equipment-add/equipment-add.component';
import { EquipmentEditComponent } from './equipment/components/equipment-edit/equipment-edit.component';
import { EquipmentListComponent } from './equipment/components/equipment-list/equipment-list.component';
import { EquipmentinspectionAddComponent } from './equipmentinspection/components/equipmentinspection-add/equipmentinspection-add.component';
import { EquipmentinspectionEditComponent } from './equipmentinspection/components/equipmentinspection-edit/equipmentinspection-edit.component';
import { EquipmentinspectionListComponent } from './equipmentinspection/components/equipmentinspection-list/equipmentinspection-list.component';
import { EquipmenttypeAddComponent } from './equipmenttype/components/equipmenttype-add/equipmenttype-add.component';
import { EquipmenttypeEditComponent } from './equipmenttype/components/equipmenttype-edit/equipmenttype-edit.component';
import { EquipmenttypeListComponent } from './equipmenttype/components/equipmenttype-list/equipmenttype-list.component';
import { MaintenancescheduleAddComponent } from './maintenanceschedule/components/maintenanceschedule-add/maintenanceschedule-add.component';
import { MaintenancescheduleEditComponent } from './maintenanceschedule/components/maintenanceschedule-edit/maintenanceschedule-edit.component';
import { MaintenancescheduleListComponent } from './maintenanceschedule/components/maintenanceschedule-list/maintenanceschedule-list.component';
import { SharedModule } from "src/app/_metronic/shared/shared.module";
import { EquipmentmoreinformationAddComponent } from './equipmentmoreinformation/components/equipmentmoreinformation-add/equipmentmoreinformation-add/equipmentmoreinformation-add.component';
import { EquipmentmoreinformationListComponent } from './equipmentmoreinformation/components/equipmentmoreinformation-list/equipmentmoreinformation-list/equipmentmoreinformation-list.component';
import { EquipmentmoreinformationEditComponent } from './equipmentmoreinformation/components/equipmentmoreinformation-edit/equipmentmoreinformation-edit/equipmentmoreinformation-edit.component';
import { CompanyequipmentAddComponent } from './companyequipment/companyequipment-add/companyequipment-add.component';
import { CompanyEditComponent } from '../customer/company/components/company-edit/company-edit.component';
import { CompanyListComponent } from '../customer/company/components/company-list/company-list.component';
import { CompanyequipmentEditComponent } from './companyequipment/companyequipment-edit/companyequipment-edit.component';
import { CompanyequipmentListComponent } from './companyequipment/companyequipment-list/companyequipment-list.component';


@NgModule({
  declarations: [
    //======== equipment component ======
        EquipmentAddComponent,
        EquipmentEditComponent,
        EquipmentListComponent,
    
     //====== equipmentinspection component ======
         EquipmentinspectionAddComponent,
         EquipmentinspectionEditComponent,
         EquipmentinspectionListComponent,
    
     //======== equipmenttype component ======
         EquipmenttypeAddComponent,
         EquipmenttypeEditComponent,
         EquipmenttypeListComponent,
    
      //===== maintenanceschedule component======
          MaintenancescheduleAddComponent,
          MaintenancescheduleEditComponent,
          MaintenancescheduleListComponent,
                //===== equipmentmoreinformation component======
         EquipmentmoreinformationAddComponent,
          EquipmentmoreinformationListComponent,
          EquipmentmoreinformationEditComponent,
              //======== companyequipment component ======
        CompanyequipmentAddComponent,
        CompanyequipmentEditComponent,
        CompanyequipmentListComponent,
  ],
  imports: [
    CommonModule,
    EquipmentRoutingModule,
    SharedModule
]
})
export class EquipmentModule { }
