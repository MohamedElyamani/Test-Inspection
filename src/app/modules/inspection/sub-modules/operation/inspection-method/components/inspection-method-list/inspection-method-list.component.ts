import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { InspectionMethod } from '../../interface/inspectionMethod';
import { DataListComponent } from 'src/app/_metronic/shared/components/data-list/data-list.component';
import { InspectionMethodService } from '../../service/inspection-method.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-inspection-method-list',
  templateUrl: './inspection-method-list.component.html',
  styleUrls: ['./inspection-method-list.component.css']
})
export class InspectionMethodListComponent implements OnInit {
dataSource: InspectionMethod[] = []; // Array to hold area data
  selectedRow: any[] = [] // Variable to hold the selected row data;
  columnsSchema = [
    { key: 'Name', label:  "Inspection Method Name" },
    { key: 'FinelSeries', label: "Inspection Method Code " },

  ];

   // علشان انادي علي المثود الي بتشيل ال actions بعد ما بمسح
   @ViewChild(DataListComponent) dataList!: DataListComponent;
   constructor(private _toastr: ToastrService, private _inspectMethodService: InspectionMethodService, private cd: ChangeDetectorRef,
     private _router : Router, private _activateRoute: ActivatedRoute
   ) { }

  ngOnInit() {
    this.inspectionMethodList();
  }
inspectionMethodList() {
    this._inspectMethodService.getInspectionMethodsList().subscribe({
      next: (res) => {
       this.dataSource = res.map(item => ({
       ...item,
    FinelSeries: `${item.series}${item.InsMethodNo}`
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
      this._inspectMethodService.deleteInspectionMethod(row.Id)
    );
    // نفّذ كل الـ requests مرة واحدة
    forkJoin(deleteRequests)
      .pipe(
        finalize(() => this.inspectionMethodList()) // بعد الحذف رجّع القائمة
      )
      .subscribe({
        next: () => {
          this._toastr.success(" Inspection Method deleted successfully");
          this.selectedRow = [];
          this.dataList.clearSelection();
          this.cd.detectChanges();
        },
        error: (err) => {
          this._toastr.error("Error deleting  Method");
        }
      });
  }
}