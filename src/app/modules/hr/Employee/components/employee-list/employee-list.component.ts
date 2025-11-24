import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { finalize, forkJoin } from 'rxjs';
import { Employee } from '../../interface/employee';
import { DataListComponent } from 'src/app/_metronic/shared/components/data-list/data-list.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../service/employee.service';
import { LocalizationService } from 'src/app/modules/localization/localization/localization.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
dataSource: Employee[] = []; // Array to hold area data
selectedRow: any[] = [] // Variable to hold the selected row data;
  columnsSchema = [
    { key: 'FullName', label:  "Full Name" },
   // { key: 'CVId', label:  "Full Name" },
    { key: 'EmployeeCode', label:  "Code" },
    { key: 'JobTitleName', label:  "JobTitle" },
    { key: 'DepartmentName', label:  "Department Name" },
    //{ key: 'NationalId', label:  "NationalId" },
    { key: 'HireDate', label:  "HireDate" },
    { key: 'Qualifications', label:  "Qualifications"},
    //{ key: 'FinelSeries', label: "Inspection Method Code " },
  ];

   // علشان انادي علي المثود الي بتشيل ال actions بعد ما بمسح
   @ViewChild(DataListComponent) dataList!: DataListComponent;
   constructor(private _toastr: ToastrService, private _empService: EmployeeService, private cd: ChangeDetectorRef,
     private _router : Router, private _activateRoute: ActivatedRoute,private _Localization: LocalizationService
   ) { }

  ngOnInit() {
    this.empList();
  }
empList() {
    this._empService.getEmplyeeList().subscribe({
      next: (res) => {
       this.dataSource = res.map(item => ({
       ...item,
      //FinelSeries: `${item.series}${item.InsMethodNo}`
  }));
      this.cd.detectChanges();
    },
      error: (err: any) => {
        console.error('Error getting Method data', err);
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
      this._empService.deleteEmployee(row.Id)
    );
    // نفّذ كل الـ requests مرة واحدة
    forkJoin(deleteRequests)
      .pipe(
        finalize(() => this.empList()) // بعد الحذف رجّع القائمة
      )
      .subscribe({
        next: () => {
          const msg = this._Localization.instant('Employee.DELETED_SUCCESSFULLY');
          this._toastr.success(msg);
          this.selectedRow = [];
          this.dataList.clearSelection();
          this.cd.detectChanges();
        },
        error: (err) => {
          console.log(err);
          this._toastr.error("Error deleting Employee: " + err.error[0].ErrorMessage);
        }
      });
  }

 
}
