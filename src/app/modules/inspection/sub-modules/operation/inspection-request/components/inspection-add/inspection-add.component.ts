import { Component, OnInit ,ChangeDetectionStrategy, DestroyRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { InspectionReq, InspectionStatus } from '../../interface/inspectionReq';
import { InspectionReqService } from '../../service/inspection-req.service';
import { LocalizationService } from 'src/app/modules/localization/localization/localization.service';
import { customerLookup } from 'src/app/modules/customer/customer-setub/interface/customerSetub';
import { locationLookup } from 'src/app/modules/customer/location/interface/customerLocation';
import {  projectLookup } from 'src/app/modules/customer/project/interface/project';
import { LocationService } from 'src/app/modules/customer/location/service/location.service';
import { CustomerSetubService } from 'src/app/modules/customer/customer-setub/service/customerSetub.service';
import { ProjectService } from 'src/app/modules/customer/project/service/project.service';
import { serviceLookUP } from '../../../../servic-module/service-type/interface/serviceType';
import { ServiceTypeService } from '../../../../servic-module/service-type/service/serviceType.service';
import { SeriesService } from 'src/app/modules/sittengs/sub-modules/generals/series/service/series.service';
import { SeriesForTables } from 'src/app/modules/sittengs/sub-modules/generals/series/interface/series';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inspection-add',
  templateUrl: './inspection-add.component.html',
  styleUrls: ['./inspection-add.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionAddComponent implements OnInit {
  data : InspectionReq;
  errorMessage : string = '';
  servTypeList : serviceLookUP[];
  customerList : customerLookup[];
  LocationList : locationLookup[];
  ProjectList : projectLookup[];
  StatusList : { Id: number; Name: string }[] = [];
    // form controls
    form = new FormGroup({
      RequestNumber: new FormControl( { value: '0', disabled: true }, [Validators.required]),
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
       series: new FormControl(''),
      SeriesNumber:new FormControl<string>('', Validators.required),
   SeriesCode:new FormControl<string>('', Validators.required),
   Separator:new FormControl<string>('', Validators.required),
      Notes: new FormControl('', [Validators.required]),
      Tenant_ID: new FormControl(''),
    });
    constructor(private  _inspectionReqService: InspectionReqService, 
      private _toastr: ToastrService,private _destroyRef: DestroyRef, private _Localization: LocalizationService,
      private _serviceType: ServiceTypeService, private _customerService: CustomerSetubService,
      private _locationService : LocationService, private _projectService: ProjectService , private _seriesService : SeriesService , private translat: TranslateService
      , private _router: Router
    ) { }
  
  ngOnInit() {
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
        this.getservTypeList();
         this.getCustomerList();
         this.getLocationList();
         this.getProjectList();
         this.getStatusList();
         this.getSeriesData();
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
    });
}

createInspectionReq() {
  if (this.form.valid) {
    const raw = this.form.getRawValue();
    const req: InspectionReq = {
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
    this._inspectionReqService.createInspectionReq(req)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.data = res;
          this.form.reset();
           const msg = this.translat.instant('Request Created Succeffuly');
           setTimeout(() => this._router.navigate(['inspection/operation/request']), 1500);
          this._toastr.success(msg);
        },
        error: (err) => {
          this.errorMessage = err.message;
          console.log("errooooooooor", err.message);
          const msg = this._Localization.instant('Request Failed');
          this._toastr.error(msg);
        }
      });
  }
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
isInvalid(controlName: string) {
        const control = this.form.get(controlName);
        return control?.invalid && (control.touched);
}
private formatStatusName(statusKey: string): string {
  switch (statusKey) {
    case 'Pending':
      return 'Pending';
    case 'Approved':
      return 'Approved';
    case 'Rejected':
      return 'Rejected';
    case 'Cancelled':
      return 'Cancelled';
    default:
      return statusKey;
  }
}
}

    