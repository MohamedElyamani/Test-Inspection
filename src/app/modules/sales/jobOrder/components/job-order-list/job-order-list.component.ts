import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataListComponent } from 'src/app/_metronic/shared/components/data-list/data-list.component';
import { SalesQuotationService } from '../../../salesQuotation/service/salesQuotation.service';
import { LocationService } from 'src/app/modules/customer/location/service/location.service';
import { finalize, forkJoin } from 'rxjs';
import { JobOrderService } from '../../service/jobOrder.service';
import { customerLookup, CustomerSetub } from 'src/app/modules/customer/customer-setub/interface/customerSetub';
import { CustomerSetubService } from 'src/app/modules/customer/customer-setub/service/customerSetub.service';
import { locationLookup } from 'src/app/modules/customer/location/interface/customerLocation';

@Component({
  selector: 'app-job-order-list',
  templateUrl: './job-order-list.component.html',
  styleUrls: ['./job-order-list.component.css']
})
export class JobOrderListComponent implements OnInit {
dataSource: any[];
selectedRow: any[] = [] 
LocationList : locationLookup[];
CustomerList : customerLookup[];


columnsSchema = [
  { key: 'FinelSeries', label: "Job Order No" },
  { key: 'CustomerName', label: "Customer" },
  { key: 'QuotationNo', label: "Quotation No" },
  { key: 'LocationName', label: "Location" },
  { key: 'ProjectName', label: "Project" },
  { key: 'ServicesTypeName', label: "Job Order Type" },
  { key: 'InspectionMethodName', label: "Inspection Method" },
  { key: 'ServiceList', label: "Service List" },
  { key: 'InspectorCategoryName', label: "Inspector Category" },
  { key: 'InspectorName', label: "Assigned To" },
  { key: 'DateFrom', label: "Date From" },
  { key: 'DateTo', label: "Date To" },
  { key: 'SiteContactName', label: "Site Contact Name" },
  { key: 'SiteContactMobile', label: "Site Contact Mobile" },
  { key: 'SiteContactEmail', label: "Site Contact Email" },
  { key: 'Description', label: "Description" },
  { key: 'Comments', label: "Comments" },
];






   @ViewChild(DataListComponent) dataList!: DataListComponent;
   constructor(private _toastr: ToastrService,  private cd: ChangeDetectorRef,
     private _router : Router, private _activateRoute: ActivatedRoute,
     private _locationService : LocationService , private _jobOrderServices : JobOrderService , private _customerService : CustomerSetubService
   ) { }


  ngOnInit() {
    this.getJobOrderList();
  }
  navigateToEdit(row: any) {
    if (row?.Id) {
      this._router.navigate(['edit', row.Id], { relativeTo: this._activateRoute });
    }
  }
onSelectedRows(rows: any[]) {
    this.selectedRow = rows;
  }
    deleteSelected(selectedRows: any[]) {
       const deleteRequests = selectedRows.map(row =>
      this._jobOrderServices.deleteJobOrder(row.Id)
    );
    // نفّذ كل الـ requests مرة واحدة
    forkJoin(deleteRequests)
      .pipe(
        finalize(() => this.getJobOrderList()) // بعد الحذف رجّع القائمة
      )
      .subscribe({
        next: () => {
          this._toastr.success("Job Order deleted successfully");
          this.selectedRow = [];
          this.dataList.clearSelection();
          this.cd.detectChanges();
        },
        error: (err) => {
          this._toastr.error("Error deleting Job Order");
        }
      });
  }

// getCustomerList(){
//   this._customerService.getCustomerLookUp()
//        .subscribe({
//          next: (res) => {
//            this.CustomerList = res;
//            console.log('Location List', this.CustomerList);
//          }
//        });
// }
//   getLocationList() {
//      this._locationService.getLocationLookUp()
//        .subscribe({
//          next: (res) => {
//            this.LocationList = res;
//            console.log('Location List', this.LocationList);
//          }
//       });
//   }
getJobOrderList() {
  this._jobOrderServices.getJobOrderList().subscribe({
    next: (res) => {
       this.dataSource = res.map(item => ({
       ...item,
    FinelSeries: `${item.series}${item.JobOrderNo}`
  }));
      this.cd.detectChanges();
    },
    error: (err: any) => {
      console.error('❌ Error getting JobOrder data', err);
    }
  });
}

}
