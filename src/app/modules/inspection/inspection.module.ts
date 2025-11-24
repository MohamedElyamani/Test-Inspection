import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { InspectionRoutingModule } from './inspection-routing.module';

import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';


@NgModule({
  declarations: [
 
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InspectionRoutingModule,
    RouterModule,
    SharedModule


  ]
})
export class InspectionModule { }
