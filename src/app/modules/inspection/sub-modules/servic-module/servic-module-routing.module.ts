import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceItemListComponent } from './service-item/components/service-item-list/service-item-list.component';
import { ServiceItemAddComponent } from './service-item/components/service-item-add/service-item-add.component';
import { ServiceItemEditComponent } from './service-item/components/service-item-edit/service-item-edit.component';
import { ServiceTypeAddComponent } from './service-type/components/service-type-add/service-type-add.component';
import { ServiceTypeListComponent } from './service-type/components/service-type-list/service-type-list.component';
import { ServiceTypeEditComponent } from './service-type/components/service-type-edit/service-type-edit.component';

const routes: Routes = [
  //========== seervie items ==========
  {path: 'service-item', component: ServiceItemListComponent},
  {path: 'service-item/add', component: ServiceItemAddComponent},
  {path: 'service-item/edit/:id', component: ServiceItemEditComponent},

  //========== seervie tyep ==========
  {path: 'service-type', component: ServiceTypeListComponent},
  {path: 'service-type/add', component: ServiceTypeAddComponent},
  {path: 'service-type/edit/:id', component: ServiceTypeEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicModuleRoutingModule { }
