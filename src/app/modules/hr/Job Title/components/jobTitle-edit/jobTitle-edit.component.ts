import { Component, DestroyRef, OnInit } from '@angular/core';
import { JobTitle } from '../../interface/jobTitle';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from '../../../Department/service/department.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { LocalizationService } from 'src/app/modules/localization/localization/localization.service';
import { JobTitleService } from '../../service/jobTitle.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Department } from '../../../Department/interface/department';

@Component({
  selector: 'app-jobTitle-edit',
  templateUrl: './jobTitle-edit.component.html',
  styleUrls: ['./jobTitle-edit.component.css']
})
export class JobTitleEditComponent implements OnInit {

data : JobTitle;
  errorMessage : string = '';
  jobTitleId : number;
  DepartmentList: Department[];
  // seriesNumber!: string;
  // separator!: string;
// form controls
  form = new FormGroup({
    Id: new FormControl<number | null>(null),
    Title: new FormControl('', [Validators.required]),
    DepartmentId: new FormControl(0, [Validators.required]),
  //     InsMethodNo: new FormControl<string>({ value: '', disabled: true }, Validators.required),
  //   series: new FormControl(''),
  //   SeriesNumber:new FormControl<string>('', Validators.required),
  //  SeriesCode:new FormControl<string>('', Validators.required),
  //  Separator:new FormControl<string>('', Validators.required)
  });

  constructor(private _deptService: DepartmentService, private _toastr: ToastrService,private _destroyRef: DestroyRef,
    private _activateRoute: ActivatedRoute , private _router: Router, private _jobTitleService: JobTitleService,
    private _location: Location ,   private _Localization: LocalizationService) { }

  ngOnInit() {
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
      this.getDepartmentList();

    this.jobTitleId = Number(this._activateRoute.snapshot.paramMap.get('id') || '');
    if (this.jobTitleId) {
      this.jobTitleById(this.jobTitleId);
      this.getDepartmentList();
    }
    
  }
    getDepartmentList() {
   this._deptService.getDeptLookUp()
     .pipe(takeUntilDestroyed(this._destroyRef))
     .subscribe({
       next: (res) => {
         this.DepartmentList = res;
       },
       error: (err) => {
         this.errorMessage = err.message;
       }
     });
 }
jobTitleById(id: number) {
  this._jobTitleService.getJobTitleById(id)
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: (res) => {
          // ✅ Combine series + number for display
        //const finalNumber = res.series + res.InsMethodNo;   // <-- "JO-2025-10*0003"

        // ✅ Extract parts back to form
        // const match = res.series.match(/^(.+?)(.)$/);
        // const seriesCode = match ? match[1] : '';
        // const separator = match ? match[2] : '';
        // const seriesNumber = res.InsMethodNo;
        this.data = res;
        this.form.patchValue({
          Title: this.data.Title,
          Id: res.Id,
          DepartmentId: res.DepartmentId,
          // InsMethodNo: finalNumber,
          // SeriesCode: seriesCode,
          // Separator: separator,
          // SeriesNumber: seriesNumber,
        });
      },
      error: (err) => {
        this.errorMessage = err.message;
        this._toastr.error(this.errorMessage);
      }
    });
  }


updateDepartment() {
  if (this.form.valid) {
    const req: JobTitle = {
      Id: this.jobTitleId,
      Title: this.form.value.Title || '',
      DepartmentId: this.form.value.DepartmentId || 0,
      // InsMethodNo: this.form.value.SeriesNumber!,
      // series: this.form.value.SeriesCode! + this.form.value.Separator! ,

    };

    this._jobTitleService.updateJobTitle(this.jobTitleId, req)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
    next: () => {
  this.form.reset();
  this.backAfterEdit();

  const msg = this._Localization.instant('JobTitle.UPDATE_SUCCESSFULLY');
  this._toastr.success(msg);
},
error: () => {
  const msg = this._Localization.instant('JobTitle.UPDATE_FAILED' + this.errorMessage);
  this._toastr.error(msg);
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
  const index = url.indexOf('/job-title');
  if (index !== -1) {
  
    const newUrl = url.substring(0, index + '/job-title'.length);
    this._router.navigate([newUrl]);
  } else {

    this._router.navigate(['/']);
  }
  }
  navigateToCreate() {
    this._router.navigate(['../../add'], { relativeTo: this._activateRoute });
  }

}
