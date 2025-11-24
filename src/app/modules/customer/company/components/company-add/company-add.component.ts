import { Component, DestroyRef, OnInit } from '@angular/core';
import { Company } from '../../interface/company';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../service/company.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.css']
})
export class CompanyAddComponent implements OnInit {
data : Company;
  errorMessage : string = '';
  // form controls
  form = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    Address: new FormControl('', [Validators.required]),
  });
  constructor(private _companyService: CompanyService, private _toastr: ToastrService,private _destroyRef: DestroyRef, private _router: Router,
            private translat: TranslateService) { }

  ngOnInit() {
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }
  createCompany() {
    if (this.form.valid) {
      const raw = this.form.getRawValue();
      const req: Company = {
        Name: raw.Name || '',
        Address: raw.Address || '',
      };
      this._companyService.createCompany(req)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe({
          next: (res) => {
            this.data = res;
            this.form.reset();
            this._toastr.success(this.translat.instant('Company created successfully' ));
           setTimeout(() => this._router.navigate(['/customer/company']), 1500);
          },
          error: (err) => {
            this.errorMessage = err.message;
            this._toastr.error(this.translat.instant('Failed to Create Company'));
          }
        });
    }
  }
isInvalid(controlName: string) {
        const control = this.form.get(controlName);
        return control?.invalid && (control.touched);
}
}

