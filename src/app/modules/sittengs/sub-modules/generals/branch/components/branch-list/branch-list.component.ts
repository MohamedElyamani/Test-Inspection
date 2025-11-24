import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BranchService } from '../../service/branch.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Branch } from '../../interface/branch';
import { finalize, forkJoin } from 'rxjs';
import { DataListComponent } from 'src/app/_metronic/shared/components/data-list/data-list.component';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.css']
})
export class BranchListComponent implements OnInit {
  // علشان انادي علي المثود الي بتشيل ال actions بعد ما بمسح
    @ViewChild(DataListComponent) dataList!: DataListComponent;
  dataSource: Branch[] = []; // Array to hold area data
  selectedRow: any[] = [] // Variable to hold the selected row data;
  columnsSchema = [
    { key: 'NameAr', label:  "Branch Name Arabic" },
    { key: 'NameEn', label:  "Branch Name English" },
    { key: 'Address', label:  "Address" },
    { key: 'Phone', label:  "Phone" },
  ];
  constructor(private _branchService: BranchService, private _toastr: ToastrService,
    private cd: ChangeDetectorRef, private _router : Router, private _activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.branchList();
  }
branchList() {
    this._branchService.getBranchesList().subscribe({
      next: (res) => {
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
              this._branchService.deleteBranch(row.Id)
            );
            // نفّذ كل الـ requests مرة واحدة
            forkJoin(deleteRequests)
              .pipe(
                finalize(() => this.branchList()) // بعد الحذف رجّع القائمة
              )
              .subscribe({
                next: () => {
                  this._toastr.success("Branch deleted successfully");
                  this.selectedRow = [];
                  this.dataList.clearSelection();
                  this.cd.detectChanges();
                },
                error: (err) => {
                  console.error('Error deleting records', err);
                  this._toastr.error("Error deleting branch");
                }
              });
}
}