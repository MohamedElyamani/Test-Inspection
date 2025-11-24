import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerSetub } from '../../interface/customerSetub';
import { ToastrService } from 'ngx-toastr';
import { CustomerSetubService } from '../../service/customerSetub.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customer-setub-add',
  templateUrl: './customer-setub-add.component.html',
  styleUrls: ['./customer-setub-add.component.css']
})
export class CustomerSetubAddComponent implements OnInit {
data : CustomerSetub;
  errorMessage : string = '';
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
  constructor(private _customerService: CustomerSetubService, private _toastr: ToastrService,private _destroyRef: DestroyRef,private _router: Router,
          private translat: TranslateService,) { }

  ngOnInit() {
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }
  createCustomer() {
    if (this.form.valid) {
      const raw = this.form.getRawValue();
      const req: CustomerSetub = {
        EnName: raw.EnName || '',
        ArName: raw.ArName || '',
        PrimaryMobileNumber: raw.PrimaryMobileNumber || '',
        SecondryMobileNumber: raw.SecondryMobileNumber || '',
        Email: raw.Email || '',
        ContactPerson: raw.ContactPerson || '',
        Address: raw.Address || '',
        Tenant_ID: 'default'
      };
      this._customerService.createCustomer(req)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe({
          next: (res) => {
            this.data = res;
            this.form.reset();
                   this._toastr.success(this.translat.instant('Customer created successfully' ));
           setTimeout(() => this._router.navigate(['/customer/customer-setup']), 1500);
          },
          error: (err) => {
            this.errorMessage = err.message;
            this._toastr.error(this.translat.instant('Failed to Create Customer'));
          }
        });
    }
  }
isInvalid(controlName: string) {
        const control = this.form.get(controlName);
        return control?.invalid && (control.touched);
}
}
