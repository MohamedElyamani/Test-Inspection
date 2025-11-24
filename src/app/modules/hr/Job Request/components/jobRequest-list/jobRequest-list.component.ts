import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { finalize, forkJoin } from 'rxjs';
import { JobRequest } from '../../interface/jobRequest';
import { DataListComponent } from 'src/app/_metronic/shared/components/data-list/data-list.component';
import { ToastrService } from 'ngx-toastr';
import { JobRequestService } from '../../service/jobRequest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-jobRequest-list',
  templateUrl: './jobRequest-list.component.html',
  styleUrls: ['./jobRequest-list.component.css']
})
export class JobRequestListComponent implements OnInit {
dataSource: JobRequest[] = []; // Array to hold area data
selectedRow: any[] = [] // Variable to hold the selected row data;
  columnsSchema = [
    { key: 'DepartmentName', label:  "Department Name" },
    { key: 'JobTitleName', label:  "Job Title" },
    { key: 'NeededPositions', label:  "Needed Positions" },
    { key: 'RequestedAt', label:  "Requested At" },
    { key: 'JobDescription', label:  "Job Description" },
    //{ key: 'FinelSeries', label: "Inspection Method Code " },
  ];

   // علشان انادي علي المثود الي بتشيل ال actions بعد ما بمسح
   @ViewChild(DataListComponent) dataList!: DataListComponent;
   constructor(private _toastr: ToastrService, private _jobReqService: JobRequestService, private cd: ChangeDetectorRef,
     private _router : Router, private _activateRoute: ActivatedRoute
   ) { }

  ngOnInit() {
    this.jobTitleList();
  }
jobTitleList() {
    this._jobReqService.getJobRequestList().subscribe({
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
      this._jobReqService.deleteJobRequest(row.Id)
    );
    // نفّذ كل الـ requests مرة واحدة
    forkJoin(deleteRequests)
      .pipe(
        finalize(() => this.jobTitleList()) // بعد الحذف رجّع القائمة
      )
      .subscribe({
        next: () => {
          this._toastr.success(" Job Request deleted successfully");
          this.selectedRow = [];
          this.dataList.clearSelection();
          this.cd.detectChanges();
        },
        error: (err) => {
          console.log(err);
          this._toastr.error("Error deleting Job Request: " + err.error[0].ErrorMessage);
        }
      });
  }

}
