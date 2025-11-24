import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { finalize, forkJoin } from 'rxjs';
import { DataListComponent } from 'src/app/_metronic/shared/components/data-list/data-list.component';
import { DepartmentService } from '../../service/department.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../interface/department';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
dataSource: Department[] = []; // Array to hold area data
selectedRow: any[] = [] // Variable to hold the selected row data;
  columnsSchema = [
    { key: 'Name', label:  "Department Name" },
    //{ key: 'FinelSeries', label: "Inspection Method Code " },
  ];

   // علشان انادي علي المثود الي بتشيل ال actions بعد ما بمسح
   @ViewChild(DataListComponent) dataList!: DataListComponent;
   constructor(private _toastr: ToastrService, private _deptService: DepartmentService, private cd: ChangeDetectorRef,
     private _router : Router, private _activateRoute: ActivatedRoute
   ) { }

  ngOnInit() {
    this.deptList();
  }
deptList() {
    this._deptService.getDeptList().subscribe({
      next: (res) => {
        this.dataSource = res;
  //      this.dataSource = res.map(item => ({
  //      ...item,
  //     FinelSeries: `${item.series}${item.InsMethodNo}`
  // }));
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
      this._deptService.deleteDept(row.Id)
    );
    // نفّذ كل الـ requests مرة واحدة
    forkJoin(deleteRequests)
      .pipe(
        finalize(() => this.deptList()) // بعد الحذف رجّع القائمة
      )
      .subscribe({
        next: () => {
          this._toastr.success(" Department deleted successfully");
          this.selectedRow = [];
          this.dataList.clearSelection();
          this.cd.detectChanges();
        },
        error: (err) => {
          console.log(err);
          this._toastr.error("Error deleting Department: " + err.error[0].ErrorMessage);
        }
      });
  }
}