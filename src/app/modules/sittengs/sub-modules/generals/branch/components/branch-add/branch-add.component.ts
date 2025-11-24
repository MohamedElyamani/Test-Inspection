import { Component, DestroyRef, OnInit } from '@angular/core';
import { Branch } from '../../interface/branch';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BranchService } from '../../service/branch.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-branch-add',
  templateUrl: './branch-add.component.html',
  styleUrls: ['./branch-add.component.css']
})
export class BranchAddComponent implements OnInit {
  data : Branch;
  errorMessage : string = '';
  // form controls
  form = new FormGroup({
    NameAr: new FormControl('', [Validators.required]),
    NameEn: new FormControl('', [Validators.required]),
    Address: new FormControl('', [Validators.required]),
    Phone: new FormControl('', [Validators.required]),
  });
  constructor(private _branchService: BranchService, private _toastr: ToastrService,private _destroyRef: DestroyRef , private translat: TranslateService , private _router: Router) { }

  ngOnInit() {
    this.form.valueChanges
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe();
  }
    createBranch() {
      if (this.form.valid) {
        const req: Branch = {
          NameAr: this.form.value.NameAr || '',
          NameEn: this.form.value.NameEn || '',
          Address: this.form.value.Address || '',
          Phone: this.form.value.Phone || '',
        };
        console.log('Request Body:', req);
        this._branchService.createBranch(req)
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe({
            next: (res) => {
              this.data = res;
              
              // reset form
              this.form.reset();
              this._toastr.success(this.translat.instant("Branch created successfully"));
              
               setTimeout(() => this._router.navigate(['/general/setting/branch']), 1500);
            },
            error: (err) => {
              this.errorMessage = err.message;
              console.log(err);
              this._toastr.error(this.translat.instant("Failed to create Branch"));
            }
          });
      }
    }
  isInvalid(controlName: string) {
          const control = this.form.get(controlName);
          return control?.invalid && (control.touched);
  }

}
