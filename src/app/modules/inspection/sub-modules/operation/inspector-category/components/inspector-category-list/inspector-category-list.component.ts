import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { InspectorCategory } from '../../interface/inspectorCategory';
import { DataListComponent } from 'src/app/_metronic/shared/components/data-list/data-list.component';
import { InspectorCategoryService } from '../../service/inspector-category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-inspector-category-list',
  templateUrl: './inspector-category-list.component.html',
  styleUrls: ['./inspector-category-list.component.css']
})
export class InspectorCategoryListComponent implements OnInit {
  dataSource: InspectorCategory[] = []; // Array to hold area data
  selectedRow: any[] = [] // Variable to hold the selected row data;
  columnsSchema = [
    { key: 'Name', label:  "Inspector Category Name" },
  ];

   // علشان انادي علي المثود الي بتشيل ال actions بعد ما بمسح
   @ViewChild(DataListComponent) dataList!: DataListComponent;
   constructor(private _toastr: ToastrService, private _inspectCategService: InspectorCategoryService, private cd: ChangeDetectorRef,
     private _router : Router, private _activateRoute: ActivatedRoute
   ) { }

  ngOnInit() {
    this.inspectorCategoryList();
  }
inspectorCategoryList() {
    this._inspectCategService.getInspectorCategoriesList().subscribe({
      next: (res) => {
        this.dataSource = res;
        this.cd.detectChanges();
      },
      error: (err: any) => {
        console.error('Error getting Category data', err);
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
      this._inspectCategService.deleteInspectorCategory(row.Id)
    );
    // نفّذ كل الـ requests مرة واحدة
    forkJoin(deleteRequests)
      .pipe(
        finalize(() => this.inspectorCategoryList()) // بعد الحذف رجّع القائمة
      )
      .subscribe({
        next: () => {
          this._toastr.success("Inspector Category deleted successfully");
          this.selectedRow = [];
          this.dataList.clearSelection();
          this.cd.detectChanges();
        },
        error: (err) => {
          this._toastr.error("Error deleting Inspector Category");
        }
      });
  }
}