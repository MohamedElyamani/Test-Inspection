import { Component, DestroyRef, OnInit } from '@angular/core';
import { CustomerLocation } from '../../interface/customerLocation';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationService } from '../../service/location.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { companyLookup } from '../../../company/interface/company';
import { customerLookup } from '../../../customer-setub/interface/customerSetub';
import { CompanyService } from '../../../company/service/company.service';
import { CustomerSetubService } from '../../../customer-setub/service/customerSetub.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.css']
})
export class LocationAddComponent implements OnInit {
data : CustomerLocation;
  errorMessage : string = '';
  companyList : companyLookup[];
  customerList : customerLookup[];


  // form controls
  form = new FormGroup({
  Name: new FormControl('',[Validators.required]),
  CustomerId: new FormControl(null, [Validators.required]),
  CompanyId: new FormControl(null, [Validators.required]),
});
  constructor(private _locationService: LocationService,private _toastr: ToastrService,private _destroyRef: DestroyRef,
    private translat: TranslateService,private _companyService: CompanyService, private _customerService: CustomerSetubService , private _router: Router,
  ) { }

  ngOnInit() {
     this.form.valueChanges
       .pipe(takeUntilDestroyed(this._destroyRef))
       .subscribe();
       this.getCompanyList();
        this.getCustomerList();
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
  createLocation() {
  if (this.form.valid) {
    const raw = this.form.getRawValue();
    const req: CustomerLocation = {
      Name: raw.Name!,
      CustomerId: raw.CustomerId!,
      CompanyId: raw.CompanyId!,
     
    };
    this._locationService.createLocation(req)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.data = res;
          this.form.reset();
           this._toastr.success(this.translat.instant('Location created successfully'));
              setTimeout(() => this._router.navigate(['/customer/location']), 1500);
        },
        error: (err) => {
          this.errorMessage = err.message;
           this._toastr.success(this.translat.instant('Failed to create Location' + this.errorMessage));
        }
      });
  }
}
isInvalid(controlName: string) {
        const control = this.form.get(controlName);
        return control?.invalid && (control.touched);
}
}
