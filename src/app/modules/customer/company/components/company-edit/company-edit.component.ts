import { Component, DestroyRef, OnInit } from '@angular/core';
import { Company } from '../../interface/company';
import { CompanyService } from '../../service/company.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
data : Company;
  errorMessage : string = '';
  companyId : number;
// form controls
  form = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    Address: new FormControl('', [Validators.required]),
  });

  constructor(private _companyService: CompanyService, private _toastr: ToastrService,private _destroyRef: DestroyRef,
    private _activateRoute: ActivatedRoute , private _router: Router, 
    private _location: Location,private translat: TranslateService,) { }

  ngOnInit() {
    this.companyId = Number(this._activateRoute.snapshot.paramMap.get('id') || '');
        if (this.companyId) {
          this.companyById(this.companyId);
        }
        this.form.valueChanges
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe();
  }
companyById(id: number) {
  this._companyService.getCompanyById(id)
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: (res) => {
        this.data = res;
        this.form.patchValue({
          Name: this.data.Name,
          Address: this.data.Address
        });
      },
      error: (err) => {
        this.errorMessage = err.message;
        this._toastr.error(this.errorMessage);
      }
    });
  }


  updateCompany() {
    if (this.form.valid) {
      const req: Company = {
        Id : this.companyId,
        Name: this.form.value.Name || '',
        Address: this.form.value.Address || '',
        Tenant_ID: this.data.Tenant_ID || ''
      };
      this._companyService.updateCompany(this.companyId,req)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe({ next: (res) => {
            this.data = res;
            this.form.reset();
            this.backAfterEdit();
                    this._toastr.success(this.translat.instant('Company Updated successfully' ));
           setTimeout(() => this._router.navigate(['/customer/company']), 1500);
          },
          error: (err) => {
            this.errorMessage = err.message;
            this._toastr.error(this.translat.instant('Failed to update company'));
          }
        
        })
    }
  }
isInvalid(controlName: string) {
        const control = this.form.get(controlName);
        return control?.invalid && (control.touched);
}
backAfterEdit() {
 const url = this._location.path();

  // لو موجود كلمة "company" في المسار
  const index = url.indexOf('/company');
  
  if (index !== -1) {
    // خُذ كل ما قبل نهاية كلمة "company"
    const newUrl = url.substring(0, index + '/company'.length);
    this._router.navigate([newUrl]);
  } else {
    // fallback لو لأي سبب مفيش كلمة company
    this._router.navigate(['/']);
  }
  }
  navigateToCreate() {
    this._router.navigate(['../../add'], { relativeTo: this._activateRoute });
  }
}
