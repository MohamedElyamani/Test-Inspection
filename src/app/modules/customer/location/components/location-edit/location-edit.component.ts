import { Component, DestroyRef, OnInit } from '@angular/core';
import {  CustomerLocation } from '../../interface/customerLocation';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocationService } from '../../service/location.service';
import { companyLookup } from '../../../company/interface/company';
import { customerLookup } from '../../../customer-setub/interface/customerSetub';
import { CompanyService } from '../../../company/service/company.service';
import { CustomerSetubService } from '../../../customer-setub/service/customerSetub.service';
@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.css']
})
export class LocationEditComponent implements OnInit {
 data : CustomerLocation;
  errorMessage : string = '';
  locationId : number;
 companyList : companyLookup[];
   customerList : customerLookup[];


  // form controls
  form = new FormGroup({
  Name: new FormControl('',[Validators.required]),
  CustomerId: new FormControl(0, [Validators.required]),
  CompanyId: new FormControl(0, [Validators.required]),
});
  constructor(private _locationService: LocationService,private _toastr: ToastrService,private _destroyRef: DestroyRef,
    private translat: TranslateService,private _activateRoute: ActivatedRoute , private _router: Router, 
    private _location: Location, private _companyService: CompanyService, private _customerService: CustomerSetubService
  ) { }

  ngOnInit() {
    this.locationId = Number(this._activateRoute.snapshot.paramMap.get('id') || '');
    if (this.locationId) {
      this.locationById(this.locationId);
      this.getCompanyList();
        this.getCustomerList();
    }
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }

getCompanyList() {
  this._companyService.getCompanyLookUp()
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: (res) => {
        this.companyList = res;
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
locationById(id: number) {
  this._locationService.getLocationById(id).subscribe({
    next: (res: CustomerLocation) => {
      this.data = res;
      this.form.patchValue({
        Name: this.data.Name,
        CustomerId: this.data.CustomerId,
        CompanyId: this.data.CompanyId,
      });
    },
    error: (err:any) => {
      this.errorMessage = err.message;
    }
  })
}
  updateLocation() {
  if (this.form.valid && this.locationId) {
    const req:CustomerLocation = {
      Id : this.locationId,
      Name: this.form.value.Name!,
      CustomerId: this.form.value.CustomerId!,
      CompanyId: this.form.value.CompanyId!,
      Tenant_ID: this.data.Tenant_ID
    };
    this._locationService.updateLocation(this.locationId, req)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.data = res;
           this._toastr.success(this.translat.instant("Location updated successfully"));
          setTimeout(() => this._router.navigate(['/customer/location']), 1500);
        },
        error: (err) => {
          this.errorMessage = err.message;
           this._toastr.success(this.translat.instant("Failed to update Location" + this.errorMessage));
        }
      });
  }
}
isInvalid(controlName: string) {
        const control = this.form.get(controlName);
        return control?.invalid && (control.touched);
}
backAfterEdit() {
 const url = this._location.path();

  // لو موجود كلمة "location" في المسار
  const index = url.indexOf('/location');
  
  if (index !== -1) {
    // خُذ كل ما قبل نهاية كلمة "location"
    const newUrl = url.substring(0, index + '/location'.length);
    this._router.navigate([newUrl]);
  } else {
    // fallback لو لأي سبب مفيش كلمة location
    this._router.navigate(['/']);
  }
  }
  navigateToCreate() {
    this._router.navigate(['../../add'], { relativeTo: this._activateRoute });
  }
}
