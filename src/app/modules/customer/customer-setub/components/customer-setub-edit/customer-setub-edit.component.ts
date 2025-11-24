import { Component, DestroyRef,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerSetub } from '../../interface/customerSetub';
import { ToastrService } from 'ngx-toastr';
import { CustomerSetubService } from '../../service/customerSetub.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-customer-setub-edit',
  templateUrl: './customer-setub-edit.component.html',
  styleUrls: ['./customer-setub-edit.component.css']
})
export class CustomerSetubEditComponent implements OnInit {
data : CustomerSetub;
  errorMessage : string = '';
  customerId : number;
// form controls
  form = new FormGroup({
   EnName: new FormControl('', [Validators.required]),
    ArName: new FormControl('', [Validators.required]),
    PrimaryMobileNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    SecondryMobileNumber: new FormControl('', [Validators.pattern('^[0-9]+$')]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    ContactPerson: new FormControl('', [Validators.required]),
    Address: new FormControl('', [Validators.required]),
  });

  constructor(private _customerService: CustomerSetubService, private _toastr: ToastrService,private _destroyRef: DestroyRef,
    private _activateRoute: ActivatedRoute , private _router: Router, 
    private _location: Location, private translat: TranslateService,) { }

  ngOnInit() {
    this.customerId = Number(this._activateRoute.snapshot.paramMap.get('id') || '');
        if (this.customerId) {
          this.customerById(this.customerId);
        }
        this.form.valueChanges
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe();
  }
customerById(id: number) {
  this._customerService.getCustomerById(id)
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: (res) => {
        this.data = res;
        this.form.patchValue({
          EnName: this.data.EnName,
          ArName: this.data.ArName,
          PrimaryMobileNumber: this.data.PrimaryMobileNumber,
          SecondryMobileNumber: this.data.SecondryMobileNumber,
          Email: this.data.Email,
          ContactPerson: this.data.ContactPerson,
          Address: this.data.Address
        });
      },
      error: (err) => {
        this.errorMessage = err.message;
        this._toastr.error(this.errorMessage);
      }
    });
  }


  updateCustomer() {
    if (this.form.valid) {
      const req: CustomerSetub = {
        Id : this.customerId,
        EnName: this.form.value.EnName || '',
        ArName: this.form.value.ArName || '',
        PrimaryMobileNumber: this.form.value.PrimaryMobileNumber || '',
        SecondryMobileNumber: this.form.value.SecondryMobileNumber || '',
        Email: this.form.value.Email || '',
        ContactPerson: this.form.value.ContactPerson || '',
        Address: this.form.value.Address || '',
        Tenant_ID: this.data.Tenant_ID || ''
      };
      this._customerService.updateCustomer(this.customerId,req)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe({ next: (res) => {
            this.data = res;
            this.form.reset();
            this._toastr.success(this.translat.instant('Customer Updated successfully' ));
           setTimeout(() => this._router.navigate(['/customer/customer-setup']), 1500);
          },
          error: (err) => {
            this.errorMessage = err.message;
            this._toastr.error(this.translat.instant('Failed to Update Customer'));
          }
        
        })
    }
  }
isInvalid(controlName: string) {
        const control = this.form.get(controlName);
        return control?.invalid && (control.touched);
}

}
