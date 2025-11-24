import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { finalize, forkJoin } from 'rxjs';
import { DataListComponent } from 'src/app/_metronic/shared/components/data-list/data-list.component';
import { CustomerSetub } from '../../interface/customerSetub';

import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerSetubService } from '../../service/customerSetub.service';

@Component({
  selector: 'app-customer-setub-list',
  templateUrl: './customer-setub-list.component.html',
  styleUrls: ['./customer-setub-list.component.css']
})
export class CustomerSetubListComponent implements OnInit {
 dataSource: CustomerSetub[] = []; // Array to hold area data
  selectedRow: any[] = [] // Variable to hold the selected row data;
  columnsSchema = [
    { key: 'EnName', label:  "English Name" },
    { key: 'ArName', label:  "Arabic Name" },
    { key: 'Address', label:  "Address" },
    { key: 'PrimaryMobileNumber', label:  "Mobile Number" },
    { key: 'SecondryMobileNumber', label:  "Another Mobile" },
    { key: 'Email', label:  "Email" },
    { key: 'ContactPerson', label:  "Contact Person" },
  ];
    // علشان انادي علي المثود الي بتشيل ال actions بعد ما بمسح
    @ViewChild(DataListComponent) dataList!: DataListComponent;

  constructor(private _customerSetubService:CustomerSetubService ,private cd: ChangeDetectorRef,
      private _router : Router, private _activateRoute: ActivatedRoute, private _toastr: ToastrService) { }

  ngOnInit() {
    this.customerList();
  }

  customerList(){this._customerSetubService.getCustomerList().subscribe({
        next: (res:any) => {
          this.dataSource = res;
          this.cd.detectChanges();
        },
        error: (err: any) => {
          console.error('Error getting area data', err);
        }
      });
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
        this._customerSetubService.deleteCustomer(row.Id)
      );
      // نفّذ كل الـ requests مرة واحدة
      forkJoin(deleteRequests)
        .pipe(
          finalize(() => this.customerList()) // بعد الحذف رجّع القائمة
        )
        .subscribe({
          next: () => {
            this._toastr.success("Customer deleted successfully");
            this.selectedRow = [];
            this.dataList.clearSelection();
            this.cd.detectChanges();
          },
          error: (err) => {
            this._toastr.error("Error deleting area");
          }
        });
    }
  }
