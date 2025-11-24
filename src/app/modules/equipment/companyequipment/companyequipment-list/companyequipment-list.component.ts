import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize, forkJoin } from 'rxjs';
import { DataListComponent } from 'src/app/_metronic/shared/components/data-list/data-list.component';

import { EquipmentService } from '../../equipment/services/equipment.service';
import { CompanyequipmentService } from '../service/companyequipment.service';



@Component({
  selector: 'app-companyequipment-list',
  templateUrl: './companyequipment-list.component.html',
  styleUrls: ['./companyequipment-list.component.css'],
  
  
})
export class CompanyequipmentListComponent implements OnInit {

  dataSource: any[];
   selectedRow: any[] = [] 
 
   
   
   columnsSchema = [
     { key: 'Name', label: "Equipment Name" },
      { key: 'SerialNumber', label: "Serial Number" },
     { key: 'Description', label: "Description" },
     { key: 'Model', label: "Model" },
     { key: 'EquipmentIdNo', label: "Id.No" },
     { key: 'EquipmentLocation', label: "Equipment Location" },
     { key: 'CalibrationStatus', label: "Calibration Status" },
     { key: 'CalibrationDate', label: "Calibration Date" },
     { key: 'ExpireDate', label: "Expire Date" },
  
   ];
   
   
   
   
   
   
      @ViewChild(DataListComponent) dataList!: DataListComponent;
      constructor(private _toastr: ToastrService,  private cd: ChangeDetectorRef,
        private _router : Router, private _activateRoute: ActivatedRoute,
        private  _equipment : EquipmentService, private _Companyequipment :CompanyequipmentService
      ) { }
   
   
     ngOnInit() {
       this.getEquipmentList();
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
         this._Companyequipment.deleteCompanyEquipment(row.Id)
       );
       // نفّذ كل الـ requests مرة واحدة
       forkJoin(deleteRequests)
         .pipe(
           finalize(() => this.getEquipmentList()) // بعد الحذف رجّع القائمة
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
   
 
   getEquipmentList() {
     this._Companyequipment.getCompanyEquipmentList().subscribe({
         next: (res:any) => {
        console.log(res);
        this.dataSource = res;
        this.cd.detectChanges();
      },
       error: (err: any) => {
         console.error('❌ Error getting JobOrder data', err);
       }
     });
   }

}
