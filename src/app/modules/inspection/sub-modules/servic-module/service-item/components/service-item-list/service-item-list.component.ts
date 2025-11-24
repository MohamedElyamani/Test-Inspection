import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { finalize, forkJoin } from 'rxjs';
import { ServiceItem } from '../../interface/serviceItem';
import { DataListComponent } from 'src/app/_metronic/shared/components/data-list/data-list.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceItemService } from '../../service/serviceItem.service';

@Component({
  selector: 'app-service-item-list',
  templateUrl: './service-item-list.component.html',
  styleUrls: ['./service-item-list.component.css']
})
export class ServiceItemListComponent implements OnInit {
dataSource: ServiceItem[] = []; // Array to hold area data
  selectedRow: any[] = [] // Variable to hold the selected row data;
  columnsSchema = [
    { key: 'Itemtitle', label:  "Item Title" },
    { key: 'FinelSeries', label:  "Item Code" },
    { key: 'Itemprice', label:  "Item Price" },
  ];

  // علشان انادي علي المثود الي بتشيل ال actions بعد ما بمسح
  @ViewChild(DataListComponent) dataList!: DataListComponent;
  constructor(private _toastr: ToastrService, private _serviceItemService: ServiceItemService, private cd: ChangeDetectorRef,
    private _router : Router, private _activateRoute: ActivatedRoute , 
  ) { }

  ngOnInit() {
    this.serviceItemList();
  }

  serviceItemList() {
    this._serviceItemService.getServiceItemList().subscribe({
      next: (res) => {
       this.dataSource = res.map(item => ({
       ...item,
    FinelSeries: `${item.series}${item.Itemcode}`
  }));
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
      this._serviceItemService.deleteServiceItem(row.Id)
    );
    // نفّذ كل الـ requests مرة واحدة
    forkJoin(deleteRequests)
      .pipe(
        finalize(() => this.serviceItemList()) // بعد الحذف رجّع القائمة
      )
      .subscribe({
        next: () => {
          this._toastr.success("Service Item deleted successfully");
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