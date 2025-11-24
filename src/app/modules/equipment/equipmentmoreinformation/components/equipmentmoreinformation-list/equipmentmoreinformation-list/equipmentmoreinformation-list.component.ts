import { ChangeDetectorRef, Component, DestroyRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { EquipmentLookup } from 'src/app/modules/equipment/equipment/interface/equipment';
import { EquipmentService } from 'src/app/modules/equipment/equipment/services/equipment.service';
import { SeriesService } from 'src/app/modules/sittengs/sub-modules/generals/series/service/series.service';
import { EquipmentmoreinformationService } from '../../../service/equipmentmoreinformation.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Equipmentmoreinformation } from '../../../interface/equipmentmoreinformation';
import { finalize, forkJoin } from 'rxjs';
import { DataListComponent } from 'src/app/_metronic/shared/components/data-list/data-list.component';

@Component({
  selector: 'app-equipmentmoreinformation-list',
  templateUrl: './equipmentmoreinformation-list.component.html',
  styleUrls: ['./equipmentmoreinformation-list.component.css']
})
export class EquipmentmoreinformationListComponent implements OnInit {
dataSource: any[];
selectedRow: any[] = [] 
 EquipmentList: EquipmentLookup[] = [];
 data!: Equipmentmoreinformation;
   errorMessage = '';
  @ViewChild(DataListComponent) dataList!: DataListComponent;
  constructor(    
           private _toastr: ToastrService,
           private _destroyRef: DestroyRef,
           private _router: Router,
           private translat: TranslateService,
           private _seriesService : SeriesService,
           private  _equipment : EquipmentService,
           private _moreinformation : EquipmentmoreinformationService,
           private _activateRoute: ActivatedRoute,
           private cd: ChangeDetectorRef,
           ) { }
 columnsSchema = [
    { key: 'EquipmentName', label: "Equipment Name" },
     { key: 'KeyName', label: "Infomation Name" },
    { key: 'KeyValue', label: "Infomation Value" },
   ]
  ngOnInit() {
    this.EquipmentmoreList();
  }
 getEquipmentList()
  { this._equipment.EquipmentLookup()
    .pipe(takeUntilDestroyed(this._destroyRef))
  .subscribe({ next: res => this.EquipmentList = res, error: err => this.errorMessage = err.message }); 
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
        this._moreinformation.deleteEquipmentInformation(row.Id)
      );
      // نفّذ كل الـ requests مرة واحدة
      forkJoin(deleteRequests)
        .pipe(
          finalize(() => this.EquipmentmoreList()) // بعد الحذف رجّع القائمة
        )
        .subscribe({
          next: () => {
            this._toastr.success("Equipment deleted successfully");
            this.selectedRow = [];
            this.dataList.clearSelection();
            this.cd.detectChanges();
          },
          error: (err) => {
            this._toastr.error("Error deleting Equipment");
          }
        });
    }
    
  EquipmentmoreList() {
    this._moreinformation.getEquipmentInformationList().subscribe({
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
