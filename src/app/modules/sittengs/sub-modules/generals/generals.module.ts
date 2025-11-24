import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralsRoutingModule } from './generals-routing.module';
import { GeneralSettingListComponent } from './general-setting/components/general-setting-list/general-setting-list.component';
import { UserSettingAddComponent } from './user-setting/components/user-setting-add/user-setting-add.component';
import { GeneralSettingAddComponent } from './general-setting/components/general-setting-add/general-setting-add.component';
import { GeneralSettingEditComponent } from './general-setting/components/general-setting-edit/general-setting-edit.component';
import { UserSettingListComponent } from './user-setting/components/user-setting-list/user-setting-list.component';
import { UserSettingEditComponent } from './user-setting/components/user-setting-edit/user-setting-edit.component';
import { SeriesListComponent } from './series/components/series-list/series-list.component';
import { SeriesAddComponent } from './series/components/series-add/series-add.component';
import { SeriesEditComponent } from './series/components/series-edit/series-edit.component';
import { SettingsModule } from '../../settings.module';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { RadioButton } from "primeng/radiobutton";
import { InputNumber } from "primeng/inputnumber";
import { BranchAddComponent } from './branch/components/branch-add/branch-add.component';
import { BranchListComponent } from './branch/components/branch-list/branch-list.component';
import { BranchEditComponent } from './branch/components/branch-edit/branch-edit.component';
import { AreaListComponent } from './area/components/area-list/area-list.component';
import { AreaAddComponent } from './area/components/area-add/area-add.component';
import { AreaEditComponent } from './area/components/area-edit/area-edit.component';


@NgModule({
  declarations: [
    // general setting component
    GeneralSettingListComponent,
    GeneralSettingAddComponent,
    GeneralSettingEditComponent,
    
    // user setting component 
    UserSettingListComponent,
    UserSettingAddComponent,
    UserSettingEditComponent,

    // series
    SeriesListComponent,
    SeriesAddComponent,
    SeriesEditComponent,
    
    // branch
    BranchListComponent,
    BranchAddComponent,
    BranchEditComponent,

    // area
    AreaListComponent,
    AreaAddComponent,
    AreaEditComponent
    
  ],
  imports: [
    CommonModule,
    GeneralsRoutingModule,
    SharedModule,
    RadioButton,
    InputNumber
]
})
export class GeneralsModule { }
