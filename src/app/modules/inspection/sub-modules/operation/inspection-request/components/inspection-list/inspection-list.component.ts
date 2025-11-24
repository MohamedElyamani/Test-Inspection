import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef,Component, OnInit, ViewChild } from '@angular/core';
import { InspectionReq, InspectionStatus } from '../../interface/inspectionReq';
import { InspectionReqService } from '../../service/inspection-req.service';
import { TranslateService } from '@ngx-translate/core';
import { DataListComponent } from 'src/app/_metronic/shared/components/data-list/data-list.component';
import { finalize, forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inspection-list',
  templateUrl: './inspection-list.component.html',
  styleUrls: ['./inspection-list.component.css']
})
export class InspectionListComponent implements OnInit {

 dataSource: InspectionReq[] = []; // Array to hold inspection request data
  selectedRow: any[] = [] // Variable to hold the selected row data;
  //displayedColumns: string[] = ['serviceType', 'location', 'notes', 'requestDate', 'status'];
   columnsSchema =
     [
      { key: 'FinelSeries', label: 'Job Request No' },
      { key: 'ServiceTypeName', label: 'Request Type' },
      { key: 'LocationName', label: 'Location' },
      { key: 'ProjectName', label: 'Project' },
      { key: 'AvailableDate', label: 'Available Date' },
      { key: 'EquipmentQty', label: 'No of Equipment' },
      { key: 'RequestDate', label: 'Request Date' },
      { key: 'Status', label: 'Status',formatter: (value: string, row?: any) => this.formatStatus(value) },
    ];

    // علشان انادي علي المثود الي بتشيل ال actions بعد ما بمسح
    @ViewChild(DataListComponent) dataList!: DataListComponent;


  constructor(private _inspectionReq: InspectionReqService, 
    private cd: ChangeDetectorRef, private translate: TranslateService,
    private _router : Router, private _activateRoute: ActivatedRoute,private _toastr: ToastrService ) { }

  ngOnInit() {
    this.inspectionReqList();
  }
inspectionReqList() {
  this._inspectionReq.getInspectionReqList().subscribe({
   next: (res) => {
       this.dataSource = res.map(item => ({
       ...item,
    FinelSeries: `${item.series}${item.RequestNumber}`
  }));
      this.cd.detectChanges();
},
    error: (err: any) => {
      console.error('Error fetching inspection requests', err);
    },
    complete: () => {
      console.log('Fetched inspection requests successfully');
    }
  });
}
navigateToEdit(row: any) {
  console.log(row)
  if (row?.Id) {
    this._router.navigate(['edit', row.Id], { relativeTo: this._activateRoute });
  }
}
  onSelectedRows(rows: any[]) {
  this.selectedRow = rows;
}
   deleteSelected(selectedRows: any[]) {
         const deleteRequests = selectedRows.map(row =>
        this._inspectionReq.deleteInspectionReq(row.Id)
      );
      // نفّذ كل الـ requests مرة واحدة
      forkJoin(deleteRequests)
        .pipe(
          finalize(() => this.inspectionReqList()) // بعد الحذف رجّع القائمة
        )
        .subscribe({
          next: () => {
            this._toastr.success("Inspection Method deleted successfully");
            this.selectedRow = [];
            this.dataList.clearSelection();
            this.cd.detectChanges();
          },
          error: (err) => {
            this._toastr.error("Error deleting Inspection Method");
          }
        });
    }
formatStatus(status: string): string {
  const label = status;
  const badgeClass = this.getStatusBadgeClass(status);
  return `<span class="badge ${badgeClass}" style="font-size: 0.9rem;">${label}</span>`;
}
getStatusBadgeClass(status: string): string {
  switch (status) {
    case 'Pending': return 'bg-warning text-dark';   // برتقالي
    case 'Approved': return 'badge bg-success text-white';     // أزرق سماوي
    case 'Rejected': return 'badge bg-danger text-white';  // أخضر
    case 'Cancelled': return 'badge bg-secondary text-white';   // أحمر
    default: return 'bg-light text-white';
  }
}


}
