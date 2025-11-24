import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CustomerLocation } from '../../interface/customerLocation';
import { DataListComponent } from 'src/app/_metronic/shared/components/data-list/data-list.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../../service/location.service';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
 dataSource: CustomerLocation[] = []; // Array to hold area data
  selectedRow: any[] = [] // Variable to hold the selected row data;

  columnsSchema = [
    { key: 'Name', label:  "Location Name" },
    {key: 'CustomerArabicName',label: "Customer Arabic Name"},
    {key: 'CustomerEnglishName',label: "Customer English Name"},
    { key: 'CompanyName', label:  "Company Name" },
  ];

  // علشان انادي علي المثود الي بتشيل ال actions بعد ما بمسح
  @ViewChild(DataListComponent) dataList!: DataListComponent;
  constructor(private _toastr: ToastrService, private _locationService: LocationService, private cd: ChangeDetectorRef,
    private _router : Router, private _activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.locationList();
  }

  locationList() {
    this._locationService.getLocationList().subscribe({
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
      this._locationService.deleteLocation(row.Id)
    );
    // نفّذ كل الـ requests مرة واحدة
    forkJoin(deleteRequests)
      .pipe(
        finalize(() => this.locationList()) // بعد الحذف رجّع القائمة
      )
      .subscribe({
        next: () => {
          this._toastr.success("Location deleted successfully");
          this.selectedRow = [];
          this.dataList.clearSelection();
          this.cd.detectChanges();
        },
        error: (err) => {
          this._toastr.error("Error deleting Location: " + err.message);
        }
      });
  }
}