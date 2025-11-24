import { ChangeDetectorRef, Component, OnInit, ViewChild, DestroyRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataListComponent } from 'src/app/_metronic/shared/components/data-list/data-list.component';
import { InspectorService } from '../../service/inspector.service';
import { Inspector } from '../../interface/inspector';
import { finalize, forkJoin, filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-inspector-list',
  templateUrl: './inspector-list.component.html',
  styleUrls: ['./inspector-list.component.css']
})
export class InspectorListComponent implements OnInit {
  dataSource: Inspector[] = []; 
  selectedRow: any[] = [];
  
  columnsSchema = [
    { key: 'Name', label: 'Inspector Name' },
    { key: 'InspectorCategoryName', label: 'Inspector Category Name' }
  ];

  @ViewChild(DataListComponent) dataList!: DataListComponent;

  constructor(
    private _toastr: ToastrService,
    private _inspectorService: InspectorService,
    private cd: ChangeDetectorRef,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _destroyRef: DestroyRef,
    private translat: TranslateService
  ) {}

  ngOnInit() {
    this.inspectorList();

    // ✅ Refresh list every time navigation returns to this route
    this._router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe(() => {
        this.inspectorList();
      });
  }

  inspectorList() {
    this._inspectorService.getInspectorList().subscribe({
      next: (res) => {
        this.dataSource = res;
        this.cd.detectChanges();
      },
      error: (err: any) => {
        console.error(this.translat.instant('Error getting Inspector data', err));
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
      this._inspectorService.deleteInspector(row.Id)
    );

    forkJoin(deleteRequests)
      .pipe(finalize(() => this.inspectorList()))
      .subscribe({
        next: () => {
          this._toastr.success(this.translat.instant("Inspector deleted successfully"));
          this.selectedRow = [];
          this.dataList.clearSelection();
          this.cd.detectChanges();
        },
        error: () => {
          this._toastr.error(this.translat.instant("Error deleting Inspector"));
        }
      });
  }
}
