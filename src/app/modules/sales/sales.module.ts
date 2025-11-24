import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { JobOrderListComponent } from './jobOrder/components/job-order-list/job-order-list.component';
import { JobOrderAddComponent } from './jobOrder/components/job-order-add/job-order-add.component';
import { JobOrderEditComponent } from './jobOrder/components/job-order-edit/job-order-edit.component';
import { SalesQuotationListComponent } from './salesQuotation/components/sales-quotation-list/sales-quotation-list.component';
import { SalesQuotationAddComponent } from './salesQuotation/components/sales-quotation-add/sales-quotation-add.component';
import { SalesQuotationEditComponent } from './salesQuotation/components/sales-quotation-edit/sales-quotation-edit.component';

import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';



@NgModule({
  declarations: [
    //========= job order  ======
    JobOrderListComponent,
    JobOrderAddComponent,
    JobOrderEditComponent,

    //====== sales quotation ======
    SalesQuotationListComponent,
    SalesQuotationAddComponent,
    SalesQuotationEditComponent,
    
  ],
  imports: [
    CommonModule,

    SalesRoutingModule,
    RouterModule,
    SharedModule

  ]
})
export class SalesModule { }
