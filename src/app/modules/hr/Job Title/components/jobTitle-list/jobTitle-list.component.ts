import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { finalize, forkJoin } from 'rxjs';
import { JobTitle } from '../../interface/jobTitle';
import { DataListComponent } from 'src/app/_metronic/shared/components/data-list/data-list.component';
import { ToastrService } from 'ngx-toastr';
import { JobTitleService } from '../../service/jobTitle.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-jobTitle-list',
  templateUrl: './jobTitle-list.component.html',
  styleUrls: ['./jobTitle-list.component.css']
})
export class JobTitleListComponent implements OnInit {
dataSource: JobTitle[] = []; // Array to hold area data
selectedRow: any[] = [] // Variable to hold the selected row data;
  columnsSchema = [
    { key: 'Title', label:  "Job Title" },
    { key: 'DepartmentName', label:  "Department Name" },
    //{ key: 'FinelSeries', label: "Inspection Method Code " },
  ];

   // علشان انادي علي المثود الي بتشيل ال actions بعد ما بمسح
   @ViewChild(DataListComponent) dataList!: DataListComponent;
   constructor(private _toastr: ToastrService, private _jobTitleService: JobTitleService, private cd: ChangeDetectorRef,
     private _router : Router, private _activateRoute: ActivatedRoute
   ) { }

  ngOnInit() {
    this.jobTitleList();
  }
jobTitleList() {
    this._jobTitleService.getJobTitleList().subscribe({
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
      this._jobTitleService.deleteJobTitle(row.Id)
    );
    // نفّذ كل الـ requests مرة واحدة
    forkJoin(deleteRequests)
      .pipe(
        finalize(() => this.jobTitleList()) // بعد الحذف رجّع القائمة
      )
      .subscribe({
        next: () => {
          this._toastr.success(" Job Title deleted successfully");
          this.selectedRow = [];
          this.dataList.clearSelection();
          this.cd.detectChanges();
        },
        error: (err) => {
          console.log(err);
          this._toastr.error("Error deleting Job Title: " + err.error[0].ErrorMessage);
        }
      });
  }
}
