import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobOrderListComponent } from './jobOrder/components/job-order-list/job-order-list.component';
import { JobOrderAddComponent } from './jobOrder/components/job-order-add/job-order-add.component';
import { JobOrderEditComponent } from './jobOrder/components/job-order-edit/job-order-edit.component';
import { SalesQuotationListComponent } from './salesQuotation/components/sales-quotation-list/sales-quotation-list.component';
import { SalesQuotationAddComponent } from './salesQuotation/components/sales-quotation-add/sales-quotation-add.component';
import { SalesQuotationEditComponent } from './salesQuotation/components/sales-quotation-edit/sales-quotation-edit.component';

const routes: Routes = [
   //======== job order ===========
    {path:"job-order", component:JobOrderListComponent},
    {path:"job-order/add", component:JobOrderAddComponent},
    {path:"job-order/edit/:id", component:JobOrderEditComponent},

    //====== sales quotation ======
    {path:"sales-quotation", component:SalesQuotationListComponent},
    {path:"sales-quotation/add", component:SalesQuotationAddComponent},
    {path:"sales-quotation/edit/:id", component:SalesQuotationEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
