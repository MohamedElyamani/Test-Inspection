import { Component, DestroyRef, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

import {
  InspectionRequest,
  InspectionRequestDetail,
  InspectionRequestSubcontractorDetail,
  InspectionServiceOrderLookup,
  InspectionStatus,
} from '../interface/inspction-service-order';

import { serviceLookUP } from '../../../servic-module/service-type/interface/serviceType';
import { customerLookup } from 'src/app/modules/customer/customer-setub/interface/customerSetub';
import { locationLookup } from 'src/app/modules/customer/location/interface/customerLocation';
import { projectLookup } from 'src/app/modules/customer/project/interface/project';


import { SeriesForTables } from 'src/app/modules/sittengs/sub-modules/generals/series/interface/series';

import { InspctionServiceOrderService } from '../service/inspction-service-order.service';
import { ServiceTypeService } from '../../../servic-module/service-type/service/serviceType.service';
import { ProjectService } from 'src/app/modules/customer/project/service/project.service';
import { CustomerSetubService } from 'src/app/modules/customer/customer-setub/service/customerSetub.service';
import { LocationService } from 'src/app/modules/customer/location/service/location.service';
import { SeriesService } from 'src/app/modules/sittengs/sub-modules/generals/series/service/series.service';

@Component({
  selector: 'app-inspction-service-order-edit',
  templateUrl: './inspction-service-order-edit.component.html',
  styleUrls: ['./inspction-service-order-edit.component.css']
})
export class InspctionServiceOrderEditComponent implements OnInit {

  errorMessage: string = '';
  data!: InspectionRequest;
  inspectionId!: number;

  servTypeList: serviceLookUP[] = [];
  customerList: customerLookup[] = [];
  LocationList: locationLookup[] = [];
  ProjectList: projectLookup[] = [];

  // lookup lists
  serviceOrderListAll: InspectionServiceOrderLookup[] = [];
  detailsLookup: InspectionServiceOrderLookup[] = [];
  subcontractorLookup: InspectionServiceOrderLookup[] = [];

  StatusList: { Id: number; Name: string }[] = [];

  form = new FormGroup({
    RequestNumber: new FormControl('', Validators.required),
    ServiceTypeId: new FormControl(0, Validators.required),
    LocationId: new FormControl(0, Validators.required),
    ProjectId: new FormControl(0, Validators.required),
    CustomerId: new FormControl(1, Validators.required),
    AvailableDate: new FormControl(new Date(), Validators.required),
    EquipmentQty: new FormControl(0, Validators.required),
    Status: new FormControl(InspectionStatus.Pending, Validators.required),
    ItemToBeInspected: new FormControl('', Validators.required),
    ContactPerson: new FormControl('', Validators.required),
    ContactPersonPhone: new FormControl('', Validators.required),
    ContactPersonEmail: new FormControl('', Validators.email),
    RequestDate: new FormControl(new Date(), Validators.required),
    series: new FormControl('', Validators.required),
    Notes: new FormControl('', Validators.required),
    Tenant_ID: new FormControl(''),
    SeriesNumber: new FormControl('', Validators.required),
    SeriesCode: new FormControl('', Validators.required),
    Separator: new FormControl('', Validators.required),

    // Rows
    InspectionRequestDetail: new FormArray<FormGroup>([]),
    InspectionRequestSubcontractorDetail: new FormArray<FormGroup>([])
  });

  constructor(
    private _inspectionReqService: InspctionServiceOrderService,
    private _toastr: ToastrService,
    private _destroyRef: DestroyRef,
    private _location: Location,
    private translate: TranslateService,
    private _serviceType: ServiceTypeService,
    private _customerService: CustomerSetubService,
    private _locationService: LocationService,
    private _projectService: ProjectService,
    private _activateRoute: ActivatedRoute,
    private _router: Router,
    private _seriesService: SeriesService,
    private _serviceOrder: InspctionServiceOrderService
  ) {}

  ngOnInit() {

    this.form.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe();

    this.getservTypeList();
    this.getCustomerList();
    this.getLocationList();
    this.getProjectList();
    this.getStatusList();
    this.getservItemList();

    this.inspectionId = Number(this._activateRoute.snapshot.paramMap.get('id'));

    if (this.inspectionId) {
      this.getInspectionById(this.inspectionId);
    } else {
      this.addItem();
      this.addSubcontractorItem();
    }
  }

  // ---------------- LOOKUPS ---------------- //

  getservTypeList() {
    this._serviceType.serviceTypeLookup()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: res => this.servTypeList = res,
        error: err => this.errorMessage = err.message
      });
  }

  getservItemList() {
    this._serviceOrder.getServiceOrderLookup()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: res => {
          this.serviceOrderListAll = res;
          this.detailsLookup = res.filter(x => !x.IsSubcontractor);
          this.subcontractorLookup = res.filter(x => x.IsSubcontractor);
        },
        error: err => this.errorMessage = err.message
      });
  }

  getCustomerList() {
    this._customerService.getCustomerLookUp()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(res => this.customerList = res);
  }

  getLocationList() {
    this._locationService.getLocationLookUp()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(res => this.LocationList = res);
  }

  getProjectList() {
    this._projectService.getProjectLookUp()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(res => this.ProjectList = res);
  }

  getStatusList() {
    this.StatusList = [
      { Id: 0, Name: 'Pending' },
      { Id: 1, Name: 'Approved' },
      { Id: 2, Name: 'Rejected' },
      { Id: 3, Name: 'Cancelled' }
    ];
  }

  // ---------------- LOAD BY ID ---------------- //

  getInspectionById(id: number) {
    this._inspectionReqService.getInspectionReqOrderById(id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: res => {

          this.data = res;

          const finalSeries = res.series + res.RequestNumber;

          const match = res.series.match(/^(.+?)(.)$/);
          this.form.patchValue({
            RequestNumber: finalSeries,
            SeriesCode: match ? match[1] : '',
            Separator: match ? match[2] : '',
            SeriesNumber: res.RequestNumber,
            ServiceTypeId: res.ServiceTypeId,
            LocationId: res.LocationId,
            ProjectId: res.ProjectId,
            CustomerId: res.CustomerId,
            AvailableDate: new Date(res.AvailableDate),
            EquipmentQty: res.EquipmentQty,
            Status: res.Status,
            ItemToBeInspected: res.ItemToBeInspected,
            ContactPerson: res.ContactPerson,
            ContactPersonPhone: res.ContactPersonPhone,
            ContactPersonEmail: res.ContactPersonEmail,
            RequestDate: new Date(res.RequestDate),
            series: res.series,
            Notes: res.Notes,
            Tenant_ID: res.Tenant_ID
          });

          // DETAIL ROWS
          this.items.clear();
          res.InspectionRequestDetails.forEach(d => {
            const row = this.createDetailRow();
            row.patchValue({
              itemid: d.ServiceItemId,
              amount: d.Amount,
              InspectionMethodId: d.InspectionMethodId,
              InspectionMethodName: this.serviceOrderListAll.find(x => x.InspectionMethodId === d.InspectionMethodId)?.InspectionMethodName
            });
            this.items.push(row);
            this.wireItemAutoFill(row, false);
          });

          // SUBCONTRACTOR ROWS
          this.subcontractorItems.clear();
          res.InspectionRequestSubcontractorDetails.forEach(sd => {
            const row = this.createSubDetailRow();
            row.patchValue({
              itemid: sd.ServiceItemId,
              amount: sd.Amount,
              InspectionMethodId: sd.InspectionMethodId,
              InspectionMethodName: this.serviceOrderListAll.find(x => x.InspectionMethodId === sd.InspectionMethodId)?.InspectionMethodName,
              subcontractorname: sd.SubcontractorName
            });
            this.subcontractorItems.push(row);
            this.wireItemAutoFill(row, true);
            console.log(res)
          });
        }
      });
  }

  // ---------------- SAVE ---------------- //

  updateInspection() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();

    const details: InspectionRequestDetail[] =
      this.items.controls.map(g => {
        const v = g.getRawValue() as any;
        return {
          Id: 0,
          ServiceItemId: Number(v.itemid),
          Amount: Number(v.amount),
          InspectionMethodId: Number(v.InspectionMethodId),   
          InspectionRequestId: this.inspectionId,
          Tenant_ID: raw.Tenant_ID,
          IsSubcontractor: false
        };
      });

    const subcontractorDetails: InspectionRequestSubcontractorDetail[] =
      this.subcontractorItems.controls.map(g => {
        const v = g.getRawValue() as any;
        return {
          Id: 0,
          ServiceItemId: Number(v.itemid),
          Amount: Number(v.amount),
          InspectionMethodId: Number(v.InspectionMethodId), 
          InspectionRequestId: this.inspectionId,
          Tenant_ID: raw.Tenant_ID,
          SubcontractorName: v.subcontractorname,
          IsSubcontractor: true
        };
      });
console.log(this.subcontractorItems)
    const req: InspectionRequest = {
      Id: this.inspectionId,
      RequestNumber: raw.SeriesNumber!,
      ServiceTypeId: raw.ServiceTypeId!,
      LocationId: raw.LocationId!,
      ProjectId: raw.ProjectId!,
      CustomerId: raw.CustomerId!,
      AvailableDate: raw.AvailableDate ? new Date(raw.AvailableDate).toISOString() : new Date().toISOString(),
      EquipmentQty: raw.EquipmentQty!,
      Status: raw.Status!,
      ItemToBeInspected: raw.ItemToBeInspected!,
      ContactPerson: raw.ContactPerson!,
      ContactPersonPhone: raw.ContactPersonPhone!,
      ContactPersonEmail: raw.ContactPersonEmail!,
        RequestDate: raw.RequestDate ? new Date(raw.RequestDate).toISOString() : new Date().toISOString(),
        Notes: raw.Notes || '',
      series: raw.SeriesCode! + raw.Separator!,
      Tenant_ID: raw.Tenant_ID!,
      InspectionRequestDetails: details,
      InspectionRequestSubcontractorDetails: subcontractorDetails
    };
console.log(req);
    this._inspectionReqService.updateInspectionReqOrder(this.inspectionId, req)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
            this.data = res;
            this.form.reset();
            this._toastr.success(this.translate.instant('Service Order Updated successfully' ));
           setTimeout(() => this._router.navigate(['/inspection/operation/Inspection-Service-Order']), 1500);
          },
        error: err => this._toastr.error(this.translate.instant('Save failed'))
      });
  }

  // ---------------- FORM ARRAY HELPERS ---------------- //

  get items(): FormArray<FormGroup> {
    return this.form.get('InspectionRequestDetail') as FormArray<FormGroup>;
  }

  get subcontractorItems(): FormArray<FormGroup> {
    return this.form.get('InspectionRequestSubcontractorDetail') as FormArray<FormGroup>;
  }

  // ---------------- ROW FACTORIES ---------------- //

  private createDetailRow(): FormGroup {
    return new FormGroup({
      itemid: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
      InspectionMethodId: new FormControl(null, Validators.required),   
      InspectionMethodName: new FormControl('', Validators.required)  
    });
  }

  private createSubDetailRow(): FormGroup {
    return new FormGroup({
      itemid: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
      InspectionMethodId: new FormControl(null, Validators.required),
      InspectionMethodName: new FormControl('', Validators.required),
      subcontractorname: new FormControl('', Validators.required)
    });
  }

  addItem() {
    const row = this.createDetailRow();
    this.items.push(row);
    this.wireItemAutoFill(row, false);
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  addSubcontractorItem() {
    const row = this.createSubDetailRow();
    this.subcontractorItems.push(row);
    this.wireItemAutoFill(row, true);
  }

  removeSubcontractorItem(index: number) {
    this.subcontractorItems.removeAt(index);
  }

  // ---------------- AUTO FILL ---------------- //

  private wireItemAutoFill(group: FormGroup, isSub: boolean) {

    group.get('itemid')!
      .valueChanges.pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(id => {

        const list = isSub ? this.subcontractorLookup : this.detailsLookup;
        const selected = list.find(x => x.Id === id);

        group.patchValue({
          InspectionMethodId: selected?.InspectionMethodId ?? null,
          InspectionMethodName: selected?.InspectionMethodName ?? ''
        }, { emitEvent: false });

        // auto-fill subcontractor name
        if (isSub) {
          group.patchValue({
            subcontractorname: selected?.SubcontractorName ?? ''
          }, { emitEvent: false });
        }
      });
  }

  isInvalid(controlName: string) {
    const c = this.form.get(controlName);
    return c?.invalid && c.touched;
  }
}
