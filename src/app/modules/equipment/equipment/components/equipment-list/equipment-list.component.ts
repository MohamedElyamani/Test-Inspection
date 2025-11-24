import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize, forkJoin } from 'rxjs';
import { DataListComponent } from 'src/app/_metronic/shared/components/data-list/data-list.component';
import { CustomerSetubService } from 'src/app/modules/customer/customer-setub/service/customerSetub.service';
import { LocationService } from 'src/app/modules/customer/location/service/location.service';
import { JobOrderService } from 'src/app/modules/sales/jobOrder/service/jobOrder.service';
import { EquipmentService } from '../../services/equipment.service';


@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit {

  dataSource: any[];
  selectedRow: any[] = [] 

  
  
  columnsSchema = [
    { key: 'FinelSeries', label: "Equipment Number" },
     { key: 'SerialNumber', label: "Serial Number" },
    { key: 'Name', label: "Name" },
    { key: 'PurchaseDate', label: "Purchase Date" },
    { key: 'ExpiryDate', label: "Expiry Date" },
    { key: 'LastMaintenanceDate', label: "Last Maintenance Date" },
    { key: 'IsCalibrated', label: "Is Calibrated" },
 
  ];
  
  
  
  
  
  
     @ViewChild(DataListComponent) dataList!: DataListComponent;
     constructor(private _toastr: ToastrService,  private cd: ChangeDetectorRef,
       private _router : Router, private _activateRoute: ActivatedRoute,
       private _locationService : LocationService , private _jobOrderServices : JobOrderService , private _customerService : CustomerSetubService ,
         private  _equipment : EquipmentService,
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
        this._equipment.deleteEquipment(row.Id)
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
    this._equipment.getEquipmentList().subscribe({
      next: (res) => {
         this.dataSource = res.map(item => ({
         ...item,
      FinelSeries: `${item.series}${item.EquipmentNo}`

    }));

        this.cd.detectChanges();
      },
      error: (err: any) => {
        console.error('❌ Error getting JobOrder data', err);
      }
    });
  }

}
