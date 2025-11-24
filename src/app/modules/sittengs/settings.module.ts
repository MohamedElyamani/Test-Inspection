import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SittengsRoutingModule } from './settings-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { GeneralsModule } from './sub-modules/generals/generals.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SittengsRoutingModule,
    RouterModule,
  ]
})
export class SettingsModule { }
