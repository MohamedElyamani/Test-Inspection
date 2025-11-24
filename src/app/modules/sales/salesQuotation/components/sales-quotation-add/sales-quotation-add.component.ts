import { SeriesService } from './../../../../sittengs/sub-modules/generals/series/service/series.service';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { customerLookup } from 'src/app/modules/customer/customer-setub/interface/customerSetub';
import { locationLookup } from 'src/app/modules/customer/location/interface/customerLocation';
import { LocationService } from 'src/app/modules/customer/location/service/location.service';
import { SalesQuotation, SalesQuotationItem } from '../../interface/salesQuotation';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CustomerSetubService } from 'src/app/modules/customer/customer-setub/service/customerSetub.service';
import { SalesQuotationService } from '../../service/salesQuotation.service';
import { BranchService } from 'src/app/modules/sittengs/sub-modules/generals/branch/service/branch.service';
import { AreaService } from 'src/app/modules/sittengs/sub-modules/generals/area/service/area.service';
import { Area } from 'src/app/modules/sittengs/sub-modules/generals/area/interface/area';
import { branchLookup } from 'src/app/modules/sittengs/sub-modules/generals/branch/interface/branch';
import { serviceItemLookup } from 'src/app/modules/inspection/sub-modules/servic-module/service-item/interface/serviceItem';
import { ServiceItemService } from 'src/app/modules/inspection/sub-modules/servic-module/service-item/service/serviceItem.service';
import { SeriesForTables } from 'src/app/modules/sittengs/sub-modules/generals/series/interface/series';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-quotation-add',
  templateUrl: './sales-quotation-add.component.html',
  styleUrls: ['./sales-quotation-add.component.css']
})
export class SalesQuotationAddComponent implements OnInit {
  data : SalesQuotation; // master data
  salesItems: SalesQuotationItem[] = []; // details data
  errorMessage : string = '';
  customerList : customerLookup[];
  locationList : locationLookup[];
  branchList : branchLookup[];
  areaList : Area[];
  serviceItemList : serviceItemLookup[];


  // form controls
  form = new FormGroup({
  QuotationNumber: new FormControl( { value: '', disabled: true }, [Validators.required]),
  CustomerId: new FormControl(null, [Validators.required]),
  LocationId: new FormControl(null, [Validators.required]),
  ContactName: new FormControl('', [Validators.required]),
  IssueDate: new FormControl(new Date(), [Validators.required]),
  ExpireDate: new FormControl(new Date(), [Validators.required]),
  ReferenceNumber: new FormControl(''),
  PONumber: new FormControl(''),
  SalespersonId: new FormControl( { value: 0, disabled: true }),
  VersionNumber: new FormControl(''),
  CheckedBy: new FormControl(''),
  BranchId: new FormControl(null, [Validators.required]),
  AreaId: new FormControl(null, [Validators.required]),
  SubTotal : new FormControl( 0 ),
  Discount : new FormControl(0),
  TaxValue : new FormControl( 0 ),
  TotalAmount : new FormControl( { value: 0, disabled: true } ),
  CustomerNote: new FormControl(''),
  TermsAndConditions: new FormControl(''),
  Status: new FormControl(0),
  series: new FormControl(''),
  SalesQuotationItems : new FormArray<FormGroup>([]),

  //============ series code
  SeriesNumber:new FormControl<string>('', Validators.required),
  SeriesCode:new FormControl<string>('', Validators.required),
  Separator:new FormControl<string>('', Validators.required)
});
  constructor(private _salesQuotationService: SalesQuotationService, private _locationService: LocationService,private _toastr: ToastrService,private _destroyRef: DestroyRef,
    private translat: TranslateService, private _customerService: CustomerSetubService,
    private _branchService: BranchService, private _areaService : AreaService, 
    private _serviceItemService : ServiceItemService, private _seriesService : SeriesService , private _router: Router,
  ) { }

  ngOnInit() {
     this.form.valueChanges
       .pipe(takeUntilDestroyed(this._destroyRef))
       .subscribe(() => this.calculateTotal());
      this.getLocationList();
      this.getCustomerList();
      this.getBranchList();
      this.getAreaList();
      this.getServiceItemList();
      this.getSeriesData();
  }
  getLocationList() {
   this._locationService.getLocationLookUp()
     .pipe(takeUntilDestroyed(this._destroyRef))
     .subscribe({
      
       next: (res) => {
         this.locationList = res;
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
getBranchList() {
  this._branchService.getBranchLookup()
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: (res) => {
        this.branchList = res;
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
}
getAreaList() {
  this._areaService.getAreaLookup()
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: (res) => {
        this.areaList = res;
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
}
getServiceItemList() {
  this._serviceItemService.getServiceItemLookup()
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: (res) => {
        this.serviceItemList = res;
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
}
createQuotation() {
  if (this.form.valid) {
    const raw = this.form.getRawValue();
    const req: SalesQuotation = {
      QuotationNumber: raw.SeriesNumber!,
      CustomerId: raw.CustomerId!,
      LocationId: raw.LocationId!,
      ContactName: raw.ContactName!,
      IssueDate: raw.IssueDate!,
      ExpireDate: raw.ExpireDate!,
      ReferenceNumber: raw.ReferenceNumber!,
      PONumber: raw.PONumber!,
      SalespersonId: raw.SalespersonId!,
      VersionNumber: raw.VersionNumber!,
      CheckedBy: raw.CheckedBy!,
      BranchId: raw.BranchId!,
      AreaId: raw.AreaId!,
      SubTotal : raw.SubTotal!,
      Discount : raw.Discount!,
      TaxValue : raw.TaxValue!,
      TotalAmount : raw.TotalAmount!,
      CustomerNote: raw.CustomerNote!,
      TermsAndConditions: raw.TermsAndConditions!,
      Status: raw.Status!,
      series: raw.SeriesCode! + raw.Separator!,
      SalesQuotationItems: this.items.controls.map((itemGroup) => ({
        itemid: itemGroup.get('itemid')?.value,
        price: itemGroup.get('price')?.value,
        qty: itemGroup.get('qty')?.value,
        tax: itemGroup.get('tax')?.value,
        total: itemGroup.get('total')?.value,
        description: itemGroup.get('description')?.value,
      })),
    };
    this._salesQuotationService.createSalesQuotation(req)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.data = res;
          this.form.reset();
          (this.form.get('SalesQuotationItems') as FormArray).clear();
           this._toastr.success(this.translat.instant("Sales Quotation created successfully"));
             setTimeout(() => this._router.navigate(['/sales/sales-quotation']), 1500);
        },
        error: (err) => {
          this.errorMessage = err.message;
           this._toastr.error(this.translat.instant("Failed to create Sales Quotation" + this.errorMessage));
        }
      });
  }
}

get items(): FormArray {
  return this.form.get('SalesQuotationItems') as FormArray;
}
addItem() {
  const itemGroup = new FormGroup({
    itemid: new FormControl(null, Validators.required),
    price: new FormControl(0, Validators.required),
    qty: new FormControl(0, Validators.required),
    tax: new FormControl(0),
    total: new FormControl(0),
    description: new FormControl('')
  });

  // calculate total when price, qty, or tax changes
  itemGroup.valueChanges.subscribe(val => {
    const totalBeforTax = ((val.price || 0) * (val.qty || 0) );
    const totalAfterTax = totalBeforTax * ( ((val.tax || 0) / 100));
    const total = totalBeforTax + totalAfterTax;
    itemGroup.get('total')?.setValue(total, { emitEvent: false });
  });

  this.items.push(itemGroup);
}
removeItem(index: number) {
  this.items.removeAt(index);
}
calculateTotal() {
  const subtotal = Number(this.form.get('SubTotal')?.value) || 0;
  const discount = Number(this.form.get('Discount')?.value) || 0;
  const tax = Number(this.form.get('TaxValue')?.value) || 0;

  // ✅ اللوجيك الصحيح:
  // (subtotal - discount) + ((subtotal - discount) * (tax / 100))
  const afterDiscount = subtotal - discount;
  const taxValue = afterDiscount * (tax / 100);
  const total = afterDiscount + taxValue;

  // نحدّث القيمة في الفورم بدون ما نعمل loop
  this.form.get('TotalAmount')?.setValue(Number(total.toFixed(2)), { emitEvent: false });
}
getSeriesData(){
  this._seriesService.getSeriesInfoForTables('SalesQuotations', 'QuotationNumber', 'Sales Quotataion')
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: (res: SeriesForTables) => {
   
        this.form.patchValue(
          { 
            QuotationNumber: res.FinelSeriesCodeAndSeriesNumber ,
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
}

