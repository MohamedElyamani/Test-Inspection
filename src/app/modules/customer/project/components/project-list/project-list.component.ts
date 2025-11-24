import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CustomerLocation } from '../../../location/interface/customerLocation';
import { DataListComponent } from 'src/app/_metronic/shared/components/data-list/data-list.component';
import { ToastrService } from 'ngx-toastr';
import { LocationService } from '../../../location/service/location.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';
import { ProjectService } from '../../service/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

dataSource: CustomerLocation[] = []; // Array to hold area data
  selectedRow: any[] = [] // Variable to hold the selected row data;

  columnsSchema = [
    { key: 'Name', label:  "Project Name" },
    { key: 'CustomerArabicName', label: "Customer Arabic Name" },
    { key: 'CustomerEnglishName', label: "Customer English Name" },
    { key: 'CompanyName', label: "Company Name" },
    { key: 'LocationName', label: "Location" },
    { key: 'ProjectDate', label: "Project Date" },

  ];

  // علشان انادي علي المثود الي بتشيل ال actions بعد ما بمسح
  @ViewChild(DataListComponent) dataList!: DataListComponent;

  constructor(private _toastr: ToastrService, private cd: ChangeDetectorRef,
    private _router : Router, private _activateRoute: ActivatedRoute , private _ProjectService: ProjectService,
  ) { }

  ngOnInit() {
    this.ProjectList();
  }

  ProjectList() {
    this._ProjectService.getProjectList().subscribe({
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
      this._ProjectService.deleteProject(row.Id)
    );
    // نفّذ كل الـ requests مرة واحدة
    forkJoin(deleteRequests)
      .pipe(
        finalize(() => this.ProjectList()) // بعد الحذف رجّع القائمة
      )
      .subscribe({
        next: () => {
          this._toastr.success("Project deleted successfully");
          this.selectedRow = [];
          this.dataList.clearSelection();
          this.cd.detectChanges();
        },
        error: (err) => {
          this._toastr.error("Error deleting Project: " + err.message);
        }
      });
  }

}
