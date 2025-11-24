import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Area } from '../../interface/area';
import { ToastrService } from 'ngx-toastr';
import { AreaService } from '../../service/area.service';
import { finalize, forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DataListComponent } from 'src/app/_metronic/shared/components/data-list/data-list.component';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.css']
})
export class AreaListComponent implements OnInit {
  dataSource: Area[] = []; // Array to hold area data
  selectedRow: any[] = [] // Variable to hold the selected row data;
  columnsSchema = [
    { key: 'Name', label:  "Area Name" },
  ];

  // علشان انادي علي المثود الي بتشيل ال actions بعد ما بمسح
  @ViewChild(DataListComponent) dataList!: DataListComponent;
  constructor(private _toastr: ToastrService, private _areaService: AreaService, private cd: ChangeDetectorRef,
    private _router : Router, private _activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.areaList();
  }

  areaList() {
    this._areaService.getAreaList().subscribe({
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
      this._areaService.deleteArea(row.Id)
    );
    // نفّذ كل الـ requests مرة واحدة
    forkJoin(deleteRequests)
      .pipe(
        finalize(() => this.areaList()) // بعد الحذف رجّع القائمة
      )
      .subscribe({
        next: () => {
          this._toastr.success("Area deleted successfully");
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