import { Component, DestroyRef, OnInit } from '@angular/core';
import { BranchService } from '../../service/branch.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Branch } from '../../interface/branch';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrls: ['./branch-edit.component.css']
})
export class BranchEditComponent implements OnInit {
data : Branch;
  errorMessage : string = '';
 branchId : number;
  
// form controls
  form = new FormGroup({
    NameAr : new FormControl('', [Validators.required]),
    NameEn : new FormControl('', [Validators.required]),
    Address : new FormControl('', [Validators.required]),
    Phone : new FormControl('', [Validators.required]),
  });
  constructor(private _branchService: BranchService, private _toastr: ToastrService,private _destroyRef: DestroyRef,
    private _activateRoute: ActivatedRoute , private _router: Router, 
    private _location: Location , private translat: TranslateService ) { }

  ngOnInit() {
    this.branchId = Number( this._activateRoute.snapshot.paramMap.get('id') || '');
        if (this.branchId) {
          this.branchById(this.branchId);
        }
         this.form.valueChanges
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe();
  }

  branchById(id: number) {
  this._branchService.getBranchById(id)
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: (res) => {
        this.data = res;
        this.form.patchValue({
          NameAr: this.data.NameAr,
          NameEn: this.data.NameEn,
          Address: this.data.Address,
          Phone: this.data.Phone,
        });
      },
      error: (err) => {
        this.errorMessage = err.message;
        this._toastr.error(this.errorMessage);
      }
    });
  }
  updateBranch() {
    if (this.form.valid && this.branchId) {
      const req: Branch = {
        Id : this.branchId,
        NameAr: this.form.value.NameAr || '',
        NameEn: this.form.value.NameEn || '',
        Address: this.form.value.Address || '',
        Phone: this.form.value.Phone || '',
      };
      this._branchService.updateBranch(this.branchId,req)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe({ next: (res) => {
            this.data = res;
            this.form.reset();
            this.backAfterEdit();
            this._toastr.success(this.translat.instant("Branch updated successfully"));
             setTimeout(() => this._router.navigate(['/general/setting/branch']), 1500);
          },
          error: (err) => {
            this.errorMessage = err.message;
            this._toastr.error(this.translat.instant("Failed to update Branch"));
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

  // لو موجود كلمة "branch" في المسار
  const index = url.indexOf('/branch');
  
  if (index !== -1) {
    // خُذ كل ما قبل نهاية كلمة "branch"
    const newUrl = url.substring(0, index + '/branch'.length);
    this._router.navigate([newUrl]);
  } else {
    // fallback لو لأي سبب مفيش كلمة branch
    this._router.navigate(['/']);
  }
  }
  navigateToCreate() {
    this._router.navigate(['../../add'], { relativeTo: this._activateRoute });
  }

}
