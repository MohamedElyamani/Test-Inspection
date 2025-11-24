import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralSettingListComponent } from './general-setting/components/general-setting-list/general-setting-list.component';
import { GeneralSettingAddComponent } from './general-setting/components/general-setting-add/general-setting-add.component';
import { GeneralSettingEditComponent } from './general-setting/components/general-setting-edit/general-setting-edit.component';
import { UserSettingListComponent } from './user-setting/components/user-setting-list/user-setting-list.component';
import { UserSettingAddComponent } from './user-setting/components/user-setting-add/user-setting-add.component';
import { UserSettingEditComponent } from './user-setting/components/user-setting-edit/user-setting-edit.component';
import { SeriesListComponent } from './series/components/series-list/series-list.component';
import { SeriesAddComponent } from './series/components/series-add/series-add.component';
import { SeriesEditComponent } from './series/components/series-edit/series-edit.component';
import { BranchListComponent } from './branch/components/branch-list/branch-list.component';
import { BranchAddComponent } from './branch/components/branch-add/branch-add.component';
import { BranchEditComponent } from './branch/components/branch-edit/branch-edit.component';
import { AreaListComponent } from './area/components/area-list/area-list.component';
import { AreaAddComponent } from './area/components/area-add/area-add.component';
import { AreaEditComponent } from './area/components/area-edit/area-edit.component';

const routes: Routes = [
  ///======== General Setting ===========
    {path:"general-setting", component:GeneralSettingListComponent},
    {path:"general-setting/add", component:GeneralSettingAddComponent},
    {path:"general-setting/edit/:id", component:GeneralSettingEditComponent},

    ///======== User Setting ===========
    {path:"user", component:UserSettingListComponent},
    {path:"user/add", component:UserSettingAddComponent},
    {path:"user/edit/:id", component:UserSettingEditComponent},

    ///======== Series ===========
    {path:"series", component:SeriesListComponent},
    {path:"series/add", component:SeriesAddComponent},
    {path:"series/edit/:id", component:SeriesEditComponent},

    ///======== Branch ===========
    {path: "branch", component: BranchListComponent},
    {path: "branch/add", component: BranchAddComponent},
    {path: "branch/edit/:id", component: BranchEditComponent},

    ///======== Area ===========
    {path: "area", component: AreaListComponent},
    {path: "area/add", component: AreaAddComponent},
    {path: "area/edit/:id", component: AreaEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralsRoutingModule { }
