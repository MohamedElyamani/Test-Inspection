import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ServiceTypeService } from '../../service/serviceType.service';
import { ServiceType } from '../../interface/serviceType';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DataListComponent } from 'src/app/_metronic/shared/components/data-list/data-list.component';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-service-type-list',
  templateUrl: './service-type-list.component.html',
  styleUrls: ['./service-type-list.component.css']
})
export class ServiceTypeListComponent implements OnInit {
  dataSource: ServiceType[] = []; // Array to hold area data
  selectedRow: any[] = [] // Variable to hold the selected row data;
  columnsSchema = [
    { key: 'Name', label:  "Service Type Name" },
    { key: 'Description', label:  "Description" },
  ];
    // علشان انادي علي المثود الي بتشيل ال actions بعد ما بمسح
    @ViewChild(DataListComponent) dataList!: DataListComponent;

  constructor(private _serviceTypeService: ServiceTypeService ,private cd: ChangeDetectorRef,
      private _router : Router, private _activateRoute: ActivatedRoute, private _toastr: ToastrService) { }

  ngOnInit() {
    this.serviceTypeList();
  }

  serviceTypeList(){this._serviceTypeService.getServiceTypeList().subscribe({
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
        this._serviceTypeService.deleteServiceType(row.Id)
      );
      // نفّذ كل الـ requests مرة واحدة
      forkJoin(deleteRequests)
        .pipe(
          finalize(() => this.serviceTypeList()) // بعد الحذف رجّع القائمة
        )
        .subscribe({
          next: () => {
            this._toastr.success("Service Type deleted successfully");
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