import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import {EmailValidator, FormControl, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { InspectionReq, InspectionStatus } from '../../interface/inspectionReq';
import { InspectionReqService } from '../../service/inspection-req.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { serviceLookUP } from '../../../../servic-module/service-type/interface/serviceType';
import { customerLookup } from 'src/app/modules/customer/customer-setub/interface/customerSetub';
import { locationLookup } from 'src/app/modules/customer/location/interface/customerLocation';
import { projectLookup } from 'src/app/modules/customer/project/interface/project';
import { ProjectService } from 'src/app/modules/customer/project/service/project.service';
import { ServiceTypeService } from '../../../../servic-module/service-type/service/serviceType.service';
import { CustomerSetubService } from 'src/app/modules/customer/customer-setub/service/customerSetub.service';
import { LocationService } from 'src/app/modules/customer/location/service/location.service';
import { SeriesService } from 'src/app/modules/sittengs/sub-modules/generals/series/service/series.service';
import { SeriesForTables } from 'src/app/modules/sittengs/sub-modules/generals/series/interface/series';
@Component({
  selector: 'app-inspection-edit',
  templateUrl: './inspection-edit.component.html',
  styleUrls: ['./inspection-edit.component.css'],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionEditComponent implements OnInit {
 errorMessage: string = '';
  data!: InspectionReq;
  inspectionId!: number;
servTypeList : serviceLookUP[];
  customerList : customerLookup[];
  LocationList : locationLookup[];
  ProjectList : projectLookup[];

  StatusList : { Id: number; Name: string }[] = [];

  form = new FormGroup({
    RequestNumber: new FormControl('', [Validators.required]),
    ServiceTypeId: new FormControl(0, [Validators.required]),
    LocationId: new FormControl(0, [Validators.required]),
    ProjectId: new FormControl(0, [Validators.required]),
    CustomerId: new FormControl(1, [Validators.required]),
    AvailableDate: new FormControl(new Date(), [Validators.required]),
    EquipmentQty: new FormControl(0, [Validators.required]),
    Status: new FormControl(InspectionStatus.Pending, [Validators.required]),
    ItemToBeInspected: new FormControl('', [Validators.required]),
    ContactPerson: new FormControl('', [Validators.required]),
    ContactPersonPhone: new FormControl('', [Validators.required]),
    ContactPersonEmail: new FormControl('', [Validators.email]),
    RequestDate: new FormControl(new Date(), [Validators.required]),
    Notes: new FormControl('', [Validators.required]),
    Tenant_ID: new FormControl(''),
    SeriesNumber:new FormControl<string>('', Validators.required),
   SeriesCode:new FormControl<string>('', Validators.required),
   Separator:new FormControl<string>('', Validators.required),

  });
  constructor(private _inspectionReqService: InspectionReqService, private _toastr: ToastrService,private _destroyRef: DestroyRef,
    private _location: Location, private translate : TranslateService,private _serviceType: ServiceTypeService, 
    private _customerService: CustomerSetubService, private _locationService : LocationService, private _projectService: ProjectService
    ,private _activateRoute: ActivatedRoute,  private _router: Router , private _seriesService : SeriesService) { }

  ngOnInit() {
    

    this.form.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe();
      this.getservTypeList();
      this.getCustomerList();
      this.getLocationList();
      this.getProjectList();
      this.getStatusList();

        this.inspectionId =Number(this._activateRoute.snapshot.paramMap.get('id') || '');
     if (this.inspectionId) {
      this.getInspectionById(this.inspectionId);
    }
  }
 getservTypeList() {
   this._serviceType.serviceTypeLookup()
     .pipe(takeUntilDestroyed(this._destroyRef))
     .subscribe({
       next: (res) => {
         this.servTypeList = res;
       },
       error: (err) => {
         this.errorMessage = err.message;
       }
     });
 }
   getSeriesData(){
   this._seriesService.getSeriesInfoForTables('InspectionRequest', 'RequestNumber', 'Inspection Request')
     .pipe(takeUntilDestroyed(this._destroyRef))
     .subscribe({
       next: (res: SeriesForTables) => {
    
         this.form.patchValue(
           { 
             RequestNumber: res.FinelSeriesCodeAndSeriesNumber ,
             SeriesNumber: res.SeriesNumber ,
             SeriesCode: res.SeriesCode ,
             Separator: res.Separator ,
   
           });
       },
       error: err => console.error('Series API Error:', err)
     });
 }
 getCustomerList() {
   this._customerService.getCustomerLookUp()
     .pipe(takeUntilDestroyed(this._destroyRef))
     .subscribe({
       next: (res) => {
         this.customerList = res;
       },
       error: (err) => {
         this.errorMessage = err.message;
       }
     });
 }
  getLocationList() {
   this._locationService.getLocationLookUp()
     .pipe(takeUntilDestroyed(this._destroyRef))
     .subscribe({
      
       next: (res) => {
         this.LocationList = res;
       },
       error: (err) => {
         this.errorMessage = err.message;
       }
     });
 }
 getProjectList() {
   this._projectService.getProjectLookUp()
     .pipe(takeUntilDestroyed(this._destroyRef))
     .subscribe({
      
       next: (res) => {
         this.ProjectList = res;
       },
       error: (err) => {
         this.errorMessage = err.message;
       }
     });
 }
getStatusList() {
    this.StatusList = Object.keys(InspectionStatus)
    .filter(key => !isNaN(Number(InspectionStatus[key as any]))) // نستبعد القيم العكسية من الـ enum
    .map(key => {
      const value = Number(InspectionStatus[key as keyof typeof InspectionStatus]);
      return {
        Id: value,
        Name: this.formatStatusName(key)
      };
    });;
}

  getInspectionById(id: number){
    this._inspectionReqService.getInspectionReqById(id)
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: (res) => {
          this.data = res;
           const finalNumber = res.series + res.RequestNumber;   // <-- "JO-2025-10*0003"

        // ✅ Extract parts back to form
        const match = res.series.match(/^(.+?)(.)$/);
        const seriesCode = match ? match[1] : '';
        const separator = match ? match[2] : '';
        const seriesNumber = res.RequestNumber;
          // نعمل patchValue للـ form
          this.form.patchValue({
            RequestNumber: finalNumber,
             SeriesCode: seriesCode,
          Separator: separator,
          SeriesNumber: seriesNumber,

            ServiceTypeId: res.ServiceTypeId,
            LocationId: res.LocationId,
            ProjectId: res.ProjectId,
            CustomerId: res.CustomerId,
            AvailableDate: res.AvailableDate ? new Date(res.AvailableDate.toString()) : new Date(),
            EquipmentQty: res.EquipmentQty,
            Status: res.Status,
            ItemToBeInspected: res.ItemToBeInspected,
            ContactPerson: res.ContactPerson,
            ContactPersonPhone: res.ContactPersonPhone,
            ContactPersonEmail: res.ContactPersonEmail,
            RequestDate: res.RequestDate? new Date(res.RequestDate.toString()) : new Date(),
            Notes: res.Notes,
            Tenant_ID: "tenant"
          });
        },
        error: (err) => {
          this.errorMessage = err.message;
          this._toastr.error('Failed to load inspection request');
        },
      });
  }
  updateInspection(){
    if (this.form.valid && this.inspectionId) {
      const raw = this.form.getRawValue();
      const req: InspectionReq = {
        Id: this.inspectionId,
        RequestNumber: raw.SeriesNumber!,
        ServiceTypeId: raw.ServiceTypeId || 0,
        LocationId: raw.LocationId || 0,
        ProjectId: raw.ProjectId || 0,
        CustomerId: raw.CustomerId || 0,
        AvailableDate: raw.AvailableDate
          ? new Date(raw.AvailableDate).toISOString()
          : new Date().toISOString(),
        EquipmentQty: raw.EquipmentQty || 0,
        Status: raw.Status || InspectionStatus.Pending,
        ItemToBeInspected: raw.ItemToBeInspected || '',
        ContactPerson: raw.ContactPerson || '',
        ContactPersonPhone: raw.ContactPersonPhone || '',
        ContactPersonEmail: raw.ContactPersonEmail || '',
        RequestDate: raw.RequestDate
        ? new Date(raw.RequestDate).toISOString()
        : new Date().toISOString(),
        Notes: raw.Notes || '',
        series: raw.SeriesCode! + raw.Separator!,
        Tenant_ID: raw.Tenant_ID || '',
        InspectionRequestDetails: [],
        InspectionRequestSubcontractorDetails: []
      };
console.log(req)
      this._inspectionReqService .updateInspectionReq(this.inspectionId, req)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe({
          next: (res) => {
            this._toastr.success(this.translate.instant('REQUEST.UPDATE_SUCCESSFULLY'));
            setTimeout(() => this._router.navigate(['inspection/operation/request']), 1500);
            this.form.reset();
           
          },
          error: (err) => {
            this.errorMessage = err.message;
            this._toastr.error(this.translate.instant('REQUEST.FAILED') + this.errorMessage);
          },
        });
    }
  }
  isInvalid(controlName: string) {
        const control = this.form.get(controlName);
        return control?.invalid && (control.touched);
}


  private formatStatusName(statusKey: string): string {
  switch (statusKey) {
    case 'Pending':
      return 'Pending';
    case 'InProgress':
      return 'In Progress';
    case 'Completed':
      return 'Completed';
    case 'Cancelled':
      return 'Cancelled';
    default:
      return statusKey;
  }
}
}
