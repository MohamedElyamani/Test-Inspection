import { Component, DestroyRef, OnInit } from '@angular/core';
import { JobTitle } from '../../interface/jobTitle';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JobTitleService } from '../../service/jobTitle.service';
import { ToastrService } from 'ngx-toastr';
import { LocalizationService } from 'src/app/modules/localization/localization/localization.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DepartmentService } from '../../../Department/service/department.service';
import { Department } from '../../../Department/interface/department';

@Component({
  selector: 'app-jobTitle-add',
  templateUrl: './jobTitle-add.component.html',
  styleUrls: ['./jobTitle-add.component.css']
})
export class JobTitleAddComponent implements OnInit {
  data : JobTitle;
  errorMessage : string = '';
  DepartmentList: Department[];


  // form controls
  form = new FormGroup({
    Title: new FormControl('', [Validators.required]),
    DepartmentId: new FormControl(0, [Validators.required]),
  //   InsMethodNo: new FormControl<string>({ value: '', disabled: true }, Validators.required),
  //   series: new FormControl(''),
  //   SeriesNumber:new FormControl<string>('', Validators.required),
  //  SeriesCode:new FormControl<string>('', Validators.required),
  //  Separator:new FormControl<string>('', Validators.required)
  });
  constructor(private _jobtitleService: JobTitleService, private _toastr: ToastrService,private _destroyRef: DestroyRef 
    ,   private _Localization: LocalizationService,private _deptService: DepartmentService
  ) { }

  ngOnInit() {
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
      this.getDepartmentList();
        //this.getSeriesData();
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

createJobTitle() {
  if (this.form.valid) {
     const raw = this.form.getRawValue();
    const req: JobTitle = {
      Title: raw.Title || '',
      DepartmentId: raw.DepartmentId || 0,
      // InsMethodNo: raw.SeriesNumber!,
      // series: raw.SeriesCode! + raw.Separator! ,

    };

    this._jobtitleService.createJobTitle(req)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.data = res;
          this.form.reset();
          const msg = this._Localization.instant('JobTitle.CREATE_SUCCESSFULLY');
          this._toastr.success(msg);
        },
        error: (err) => {
          this.errorMessage = err.message;
          const msg = this._Localization.instant('JobTitle.CREATE_FAILED '+ this.errorMessage);
          this._toastr.error(msg);
        }
      });
  }
}

isInvalid(controlName: string) {
        const control = this.form.get(controlName);
        return control?.invalid && (control.touched);
}

}
