import { ChangeDetectorRef, Component, DestroyRef, OnInit, ViewChild } from '@angular/core';
import { DataListComponent } from 'src/app/_metronic/shared/components/data-list/data-list.component';
import { InspectionCertificate } from '../../interface/newCertif';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NewCertifService } from '../../service/new-certif.service';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-new-certif-list',
  templateUrl: './new-certif-list.component.html',
  styleUrls: ['./new-certif-list.component.css']
})
export class NewCertifListComponent implements OnInit {
dataSource: any[];
selectedRow: any[] = [] 
data!: InspectionCertificate;
errorMessage = '';
  @ViewChild(DataListComponent) dataList!: DataListComponent;
  constructor(    
           private _toastr: ToastrService,
           private _destroyRef: DestroyRef,
           private _router: Router,
           private translat: TranslateService,
           private _Certificate : NewCertifService,
           private _activateRoute: ActivatedRoute,
           private cd: ChangeDetectorRef,
           ) { }
 columnsSchema = [
    { key: 'FinelSeries', label: "Certificate Number" },
    { key: 'IssueDate', label: "Issue Date" },
    { key: 'NextInspectionDate', label: "Next Inspection Date" },
    { key: 'Status', label: "Status" },
    { key: 'CustomerId', label: "Customer" },
    { key: 'CompanyId', label: "Company" },
    { key: 'LocationId', label: "Location" },
    { key: 'ProjectId', label: "Project" },
    { key: 'InspectionOrderId', label: "Inspection Order" },
    { key: 'InspectorId', label: "Inspector" },
    { key: 'InspectionMethodId', label: "Inspection Method" },
    { key: 'InspectionStartDate', label: "Start Date" },
    { key: 'InspectionEndDate', label: "End Date" },
    { key: 'InspectionDuration', label: "Duration" },
    { key: 'Findings', label: "Findings" },
    { key: 'Recommendations', label: "Recommendations" },
    { key: 'Remarks', label: "Remarks" },
    { key: 'PreparedBy', label: "Prepared By" },
    { key: 'ApprovedBy', label: "Approved By" },
    
   ]
  ngOnInit() {
    this.CertificateList();
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
        this._Certificate.deleteCertificate(row.Id)
      );
      // نفّذ كل الـ requests مرة واحدة
      forkJoin(deleteRequests)
        .pipe(
          finalize(() => this.CertificateList()) 
        )
        .subscribe({
          next: () => {
            this._toastr.success("Equipment type deleted successfully");
            this.selectedRow = [];
            this.dataList.clearSelection();
            this.cd.detectChanges();
          },
          error: (err) => {
            this._toastr.error("Error deleting Equipment type");
          }
        });
    }
    
  CertificateList() {
    this._Certificate.getCertificateList().subscribe({
      next: (res) => {
         this.dataSource = res.map(item => ({
         ...item,
      FinelSeries: `${item.Series}${item.CertificateNumber}`

    }));

        this.cd.detectChanges();
      },
      error: (err: any) => {
        console.error('Error getting location data', err);
      }
    });
}

}
