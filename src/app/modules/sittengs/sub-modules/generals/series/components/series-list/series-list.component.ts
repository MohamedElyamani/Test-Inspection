import { ResetPolicy } from './../../interface/series';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Series } from '../../interface/series';
import { ActivatedRoute, Router } from '@angular/router';
import { SeriesService } from '../../service/series.service';
import { ToastrService } from 'ngx-toastr';
import { finalize, forkJoin } from 'rxjs';
import { DataListComponent } from 'src/app/_metronic/shared/components/data-list/data-list.component';
// Import ResetPolicy enum or object

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.css']
})
export class SeriesListComponent implements OnInit {

  constructor(private _router : Router, private _activateRoute: ActivatedRoute ,private cd: ChangeDetectorRef,
    private _seriesService: SeriesService ,private _toastr: ToastrService
  ) { }
// علشان انادي علي المثود الي بتشيل ال actions بعد ما بمسح
@ViewChild(DataListComponent) dataList!: DataListComponent;

 dataSource: Series[] = []; // Array to hold inspection request data
  selectedRow: any[] = [] // Variable to hold the selected row data;
   columnsSchema =   [
      { key: 'SeriesCode', label:  "Series Code" },
      { key: 'SeriesName', label:  "Series Name" },
      { key: 'PaddingLength', label:  "Padding Length" },
      { key: 'Separator', label: "Separator"},
      { 
      key: 'ResetPolicy', 
      label: "Reset Policy",
      formatter: (value: number) => ResetPolicy[value] 
    }
    ];
    
  ngOnInit() {
    this.SeriesList();
  }

  SeriesList() {
    this._seriesService.getSeriesList().subscribe({
      next: (res) => {
        this.dataSource = res;
        this.cd.detectChanges();
      },
      error: (err: any) => {
        console.error('Error getting inspection request data', err);
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
    this._seriesService.deleteSeries(String(row.Id))
  );

  // نفّذ كل الـ requests مرة واحدة
  forkJoin(deleteRequests)
    .pipe(
      finalize(() => this.SeriesList()) // بعد الحذف رجّع القائمة
    )
    .subscribe({
      next: () => {
        this._toastr.success("Series deleted successfully");
        this.selectedRow = [];
        this.dataList.clearSelection();
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error deleting records', err);
        this._toastr.error("Error deleting series");
      }
    });
}
}
