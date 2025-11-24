import { ChangeDetectorRef, Component, DestroyRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { JobOrder } from '../../interface/jobOrder';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JobOrderService } from '../../service/jobOrder.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CustomerSetubService } from 'src/app/modules/customer/customer-setub/service/customerSetub.service';
import { customerLookup } from 'src/app/modules/customer/customer-setub/interface/customerSetub';
import { LocationService } from 'src/app/modules/customer/location/service/location.service';
import { locationLookup } from 'src/app/modules/customer/location/interface/customerLocation';
import { projectLookup } from 'src/app/modules/customer/project/interface/project';
import { ProjectService } from 'src/app/modules/customer/project/service/project.service';
import { serviceLookUP } from 'src/app/modules/inspection/sub-modules/servic-module/service-type/interface/serviceType';
import { ServiceTypeService } from 'src/app/modules/inspection/sub-modules/servic-module/service-type/service/serviceType.service';
import { InspectionMethodService } from 'src/app/modules/inspection/sub-modules/operation/inspection-method/service/inspection-method.service';
import { InspectionMethodLookUp } from 'src/app/modules/inspection/sub-modules/operation/inspection-method/interface/inspectionMethod';
import { InspectorCategoryService } from 'src/app/modules/inspection/sub-modules/operation/inspector-category/service/inspector-category.service';
import { inspectorcategoryLookUP } from 'src/app/modules/inspection/sub-modules/operation/inspector-category/interface/inspectorCategory';
import { InspectorService } from 'src/app/modules/inspection/sub-modules/operation/inspector/service/inspector.service';
import { InspectorLookUP } from 'src/app/modules/inspection/sub-modules/operation/inspector/interface/inspector';
import { SalesQuotationService } from '../../../salesQuotation/service/salesQuotation.service';
import { QuotationLookup } from '../../../salesQuotation/interface/salesQuotation';
import { SeriesForTables } from 'src/app/modules/sittengs/sub-modules/generals/series/interface/series';
import { SeriesService } from 'src/app/modules/sittengs/sub-modules/generals/series/service/series.service';

@Component({
  selector: 'app-job-order-add',
  templateUrl: './job-order-add.component.html',
  styleUrls: ['./job-order-add.component.css']
})
export class JobOrderAddComponent implements OnInit {
@Input() appendTo: any = null;

  data!: JobOrder;
  errorMessage = '';
 
  customerList: customerLookup[] = [];
  LocationList: locationLookup[] = [];
  ProjectList: projectLookup[] = [];
  servTypeList: serviceLookUP[] = [];
  inspectionList: InspectionMethodLookUp[] = [];
  inspectorCategList: inspectorcategoryLookUP[] = [];
  inspectorList: InspectorLookUP[] = [];
  filteredInspectorList: InspectorLookUP[] = [];
  quotationList: QuotationLookup[] = [];

 form = new FormGroup({
  JobOrderNo: new FormControl<string>({ value: '', disabled: true }, Validators.required),
  CustomerId: new FormControl<number | null>(null, Validators.required),
  QuotationNo: new FormControl<string>(''),
  QuotationId: new FormControl<number | null>(null),
  LocationId: new FormControl<number | null>(null, Validators.required),
  Series: new FormControl<string>(''),
  ProjectId: new FormControl<number | null>(null, Validators.required),
  JobOrderTypeServicesTypeId: new FormControl<number | null>(null, Validators.required),
  InspectionMethodId: new FormControl<number | null>(null, Validators.required),
  ServiceList: new FormControl<string>('', Validators.required),
  InspectorCategoryId: new FormControl<number | null>(null, Validators.required),
  AssignedTo: new FormControl<number | null>(null, Validators.required),
  SiteContactName: new FormControl<string>('', Validators.required),
  SiteContactMobile: new FormControl<string>('', Validators.required),
  SiteContactEmail: new FormControl<string>('', Validators.required),
  Description: new FormControl<string>(''),
  Comments: new FormControl<string>(''),
  DateFrom: new FormControl<Date | null>(null, Validators.required),
  DateTo: new FormControl<Date | null>(null, Validators.required),
    series: new FormControl(''),
  SeriesNumber:new FormControl<string>('', Validators.required),
   SeriesCode:new FormControl<string>('', Validators.required),
   Separator:new FormControl<string>('', Validators.required)
});


  constructor(
    private _toastr: ToastrService,
    private _destroyRef: DestroyRef,
    private _router: Router,
    private translat: TranslateService,
    private _JobOrderService: JobOrderService,
    private _customerService: CustomerSetubService,
    private _locationService: LocationService,
    private _projectService: ProjectService,
    private _serviceType: ServiceTypeService,
    private _InspectionMethodeService: InspectionMethodService,
    private _inspectorcateg: InspectorCategoryService,
    private _inspectorService: InspectorService,
    private cdr: ChangeDetectorRef,
    private _Quotation: SalesQuotationService,
    private _seriesService : SeriesService
  ) { }

  ngOnInit() {
    this.form.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe();
    
    this.getLocationList();
    this.getInspectionMethodList();
    this.getCustomerList();
    this.getInspectorCategoryList();
    this.getservTypeList();
    this.getProjectList();
    this.getQuotationList();
    this.getSeriesData();

this.form.get('InspectorCategoryId')?.valueChanges
  .pipe(takeUntilDestroyed(this._destroyRef))
  .subscribe(categoryId => {
    this.getInspectorList(categoryId || undefined);
    this.form.patchValue({ AssignedTo: null });
  });

    this.form.get('QuotationId')?.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(selectedId => {
        const selected = this.quotationList.find(q => q.QuotationId === selectedId);
        if (selected) this.form.patchValue({ QuotationNo: selected.QuotationNo });
      });

  

  }
createOrder() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const formValue = this.form.getRawValue();
  const req: JobOrder = {
  JobOrderNo: formValue.SeriesNumber!,      
  CustomerId: formValue.CustomerId!,
  QuotationNo: formValue.QuotationNo!,
  QuotationId: formValue.QuotationId!,
  LocationId: formValue.LocationId!,
  series: formValue.SeriesCode! + formValue.Separator! ,
  ProjectId: formValue.ProjectId!,
  JobOrderTypeServicesTypeId: formValue.JobOrderTypeServicesTypeId!,
  InspectionMethodId: formValue.InspectionMethodId!,
  ServiceList: formValue.ServiceList!,
  InspectorCategoryId: formValue.InspectorCategoryId!,
  AssignedTo: formValue.AssignedTo!,
  SiteContactName: formValue.SiteContactName!,
  SiteContactMobile: formValue.SiteContactMobile!,
  SiteContactEmail: formValue.SiteContactEmail!,
  Description: formValue.Description!,
  Comments: formValue.Comments!,
  DateFrom: new Date(formValue.DateFrom!).toISOString(),
  DateTo: new Date(formValue.DateTo!).toISOString(),
};

  this._JobOrderService.createJobOrder(req)
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: res => {
  this.data = res;
  this._toastr.success('Job Order created successfully');
  setTimeout(() => this._router.navigate(['/sales/job-order']), 1500);
},

      error: err => {
        console.error('JobOrder create error:', err);
        this._toastr.error(err.error?.title || err.message);
      }
    });
}




  // ==== Lookup fetching functions ====
  getSeriesData(){
  this._seriesService.getSeriesInfoForTables('JobOrder', 'JobOrderNo', 'Job Order')
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: (res: SeriesForTables) => {
   
        this.form.patchValue(
          { 
            JobOrderNo: res.FinelSeriesCodeAndSeriesNumber ,
            SeriesNumber: res.SeriesNumber ,
            SeriesCode: res.SeriesCode ,
            Separator: res.Separator ,
  
          });
      },
      error: err => console.error('Series API Error:', err)
    });
}
  getCustomerList() { this._customerService.getCustomerLookUp().pipe(takeUntilDestroyed(this._destroyRef)).subscribe({ next: res => this.customerList = res, error: err => this.errorMessage = err.message }); }
  getLocationList() { this._locationService.getLocationLookUp().pipe(takeUntilDestroyed(this._destroyRef)).subscribe({ next: res => this.LocationList = res, error: err => this.errorMessage = err.message }); }
  getProjectList() { this._projectService.getProjectLookUp().pipe(takeUntilDestroyed(this._destroyRef)).subscribe({ next: res => this.ProjectList = res, error: err => this.errorMessage = err.message }); }
  getservTypeList() { this._serviceType.serviceTypeLookup().pipe(takeUntilDestroyed(this._destroyRef)).subscribe({ next: res => this.servTypeList = res, error: err => this.errorMessage = err.message }); }
  getInspectionMethodList() { this._InspectionMethodeService.getInspectionMethodLookUP().pipe(takeUntilDestroyed(this._destroyRef)).subscribe({ next: res => this.inspectionList = res, error: err => this.errorMessage = err.message }); }
  getInspectorCategoryList() { this._inspectorcateg.InspectorCategoryLookup().pipe(takeUntilDestroyed(this._destroyRef)).subscribe({ next: res => this.inspectorCategList = res, error: err => this.errorMessage = err.message }); }
  getQuotationList() { 
    this._Quotation.salesQuotationLookup()
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({ 
      next: res => 
        this.quotationList = res.map(q => ({ QuotationId: q.Id!, QuotationNo: q.QuotationNumber })), 
      error: err => this.errorMessage = err.message }); 
    }
getInspectorList(categoryId?: number) {
  this._inspectorService.getInspectorLookUP(categoryId)
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: res => { 
        this.filteredInspectorList = res; 
        this.cdr.detectChanges(); 
      },
      error: err => {
        console.error('Inspector API error:', err);
        this.errorMessage = err.message;
      }
    });

  }
  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control.touched;
  }
}
