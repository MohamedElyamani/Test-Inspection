import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { finalize, forkJoin } from 'rxjs';
import { DataListComponent } from 'src/app/_metronic/shared/components/data-list/data-list.component';
import { Company } from '../../interface/company';
import { CompanyService } from '../../service/company.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
 dataSource: Company[] = []; // Array to hold area data
  selectedRow: any[] = [] // Variable to hold the selected row data;
  columnsSchema = [
    { key: 'Name', label:  "Company Name" },
    { key: 'Address', label:  "Address" },
  ];
    // علشان انادي علي المثود الي بتشيل ال actions بعد ما بمسح
    @ViewChild(DataListComponent) dataList!: DataListComponent;

  constructor(private _companyService: CompanyService ,private cd: ChangeDetectorRef,
      private _router : Router, private _activateRoute: ActivatedRoute, private _toastr: ToastrService) { }

  ngOnInit() {
    this.companyList();
  }

  companyList(){this._companyService.getCompanyList().subscribe({
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
        this._companyService.deleteCompany(row.Id)
      );
      // نفّذ كل الـ requests مرة واحدة
      forkJoin(deleteRequests)
        .pipe(
          finalize(() => this.companyList()) // بعد الحذف رجّع القائمة
        )
        .subscribe({
          next: () => {
            this._toastr.success("Company deleted successfully");
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