import { ChangeDetectorRef, Component, DestroyRef, OnInit, ViewChild } from '@angular/core';
import { Equipmenttype } from '../../interface/equipmenttype';
import { DataListComponent } from 'src/app/_metronic/shared/components/data-list/data-list.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SeriesService } from 'src/app/modules/sittengs/sub-modules/generals/series/service/series.service';
import { EquipmenttypeService } from '../../service/equipmenttype.service';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-equipmenttype-list',
  templateUrl: './equipmenttype-list.component.html',
  styleUrls: ['./equipmenttype-list.component.css']
})
export class EquipmenttypeListComponent implements OnInit {

dataSource: any[];
selectedRow: any[] = [] 
data!: Equipmenttype;
errorMessage = '';
  @ViewChild(DataListComponent) dataList!: DataListComponent;
  constructor(    
           private _toastr: ToastrService,
           private _destroyRef: DestroyRef,
           private _router: Router,
           private translat: TranslateService,
           private _seriesService : SeriesService,
           private _Equipmenttype : EquipmenttypeService,
           private _activateRoute: ActivatedRoute,
           private cd: ChangeDetectorRef,
           ) { }
 columnsSchema = [
    { key: 'Name', label: "Name" },
   
   ]
  ngOnInit() {
    this.EquipmenttypeList();
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
        this._Equipmenttype.deleteEquipmenttype(row.Id)
      );
      // نفّذ كل الـ requests مرة واحدة
      forkJoin(deleteRequests)
        .pipe(
          finalize(() => this.EquipmenttypeList()) 
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
    
  EquipmenttypeList() {
    this._Equipmenttype.getEquipmenttypeList().subscribe({
      next: (res:any) => {
        console.log(res);
        this.dataSource = res;
        this.cd.detectChanges();
      },
      error: (err: any) => {
        console.error('Error getting location data', err);
      }
    });
}

}
