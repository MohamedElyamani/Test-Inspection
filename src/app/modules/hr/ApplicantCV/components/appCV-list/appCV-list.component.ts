import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { finalize, forkJoin } from 'rxjs';
import { AppCV } from '../../interface/appCV';
import { DataListComponent } from 'src/app/_metronic/shared/components/data-list/data-list.component';
import { ToastrService } from 'ngx-toastr';
import { AppCVService } from '../../service/appCV.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-appCV-list',
  templateUrl: './appCV-list.component.html',
  styleUrls: ['./appCV-list.component.css']
})
export class AppCVListComponent implements OnInit {
dataSource: AppCV[] = []; // Array to hold area data
selectedRow: any[] = [] // Variable to hold the selected row data;
  columnsSchema = [
    { key: 'FullName', label:  "Full Name" },
    { key: 'Email', label:  "Email" },
    { key: 'Phone', label:  "Phone Number" },
    { key: 'JobRequestTitle', label:  "Job Request Title" },
    { key: 'InterviewIcon', label:  "Interviewed"},
    { key: 'Status', label:  "Status" },
    //{ key: 'FinelSeries', label: "Inspection Method Code " },
  ];

   // علشان انادي علي المثود الي بتشيل ال actions بعد ما بمسح
   @ViewChild(DataListComponent) dataList!: DataListComponent;
   constructor(private _toastr: ToastrService, private _appcvservice: AppCVService, private cd: ChangeDetectorRef,
     private _router : Router, private _activateRoute: ActivatedRoute
   ) { }

  ngOnInit() {
    this.appCvList();
  }
appCvList() {
    this._appcvservice.getAppCVList().subscribe({
      next: (res) => {
       this.dataSource = res.map(item => ({
       ...item,
       InterviewIcon: item.IsInterviewed ? '✅' : '❌'
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
      this._appcvservice.deleteAppCV(row.Id)
    );
    // نفّذ كل الـ requests مرة واحدة
    forkJoin(deleteRequests)
      .pipe(
        finalize(() => this.appCvList()) // بعد الحذف رجّع القائمة
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
