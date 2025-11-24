import { Component, DestroyRef, OnInit } from '@angular/core';
import { Employee } from '../../interface/employee';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../service/employee.service';
import { ToastrService } from 'ngx-toastr';
import { LocalizationService } from 'src/app/modules/localization/localization/localization.service';
import { DepartmentService } from '../../../Department/service/department.service';
import { Department } from '../../../Department/interface/department';
import { JobTitleLookup } from '../../../Job Title/interface/jobTitle';
import { AppCVLookup } from '../../../ApplicantCV/interface/appCV';
import { AppCVService } from '../../../ApplicantCV/service/appCV.service';
import { JobTitleService } from '../../../Job Title/service/jobTitle.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
data : Employee;
errorMessage : string = '';
DepartmentList: Department[];
JobTitleList: JobTitleLookup[];
AppCVList: AppCVLookup[];


  // form controls
  form = new FormGroup({
    FullName: new FormControl('', [Validators.required]),
    EmployeeCode: new FormControl('', [Validators.required]),
    CVId: new FormControl(0, [Validators.required]),
    DepartmentId: new FormControl(0, [Validators.required]),
    JobTitleId: new FormControl(0, [Validators.required]),
    NationalId: new FormControl('', [Validators.required]),
    PhotoUrl: new FormControl('', [Validators.required]),
    Qualifications: new FormControl('', [Validators.required]),
    HireDate: new FormControl(Date.now(), [Validators.required]),
  //   InsMethodNo: new FormControl<string>({ value: '', disabled: true }, Validators.required),
  //   series: new FormControl(''),
  //   SeriesNumber:new FormControl<string>('', Validators.required),
  //  SeriesCode:new FormControl<string>('', Validators.required),
  //  Separator:new FormControl<string>('', Validators.required)
  });

  constructor(private _empService: EmployeeService, private _toastr: ToastrService,private _destroyRef: DestroyRef ,
     private _Localization: LocalizationService,private _deptService: DepartmentService, private _appCVService: AppCVService,
     private _jobTitleService: JobTitleService
  ) { }

  ngOnInit() {
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
      this.getDepartmentList();
      this.getJobTitleList();
      this.getAppCvList();
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
getJobTitleList() {
    this._jobTitleService.getJobTitleLookUp()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.JobTitleList = res;
        },
        error: (err) => {
          this.errorMessage = err.message;
        }
      });
  }
  getAppCvList() {
    this._appCVService.getAppCvLookUp()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.AppCVList = res;
        },
        error: (err) => {
          this.errorMessage = err.message;
        }
      });
  }
createEmployee() {
  if (this.form.valid) {
     const raw = this.form.getRawValue();
    const req: Employee = {
      FullName: raw.FullName || '',
      EmployeeCode: raw.EmployeeCode || '',
      CVId: raw.CVId || 0,
      JobTitleId: raw.JobTitleId || 0,
      DepartmentId: raw.DepartmentId || 0,
      PhotoUrl: raw.PhotoUrl || '',
      NationalId: raw.NationalId || '',
      Qualifications: raw.Qualifications || '',
      HireDate: raw.HireDate ? new Date(raw.HireDate).toISOString() : new Date().toISOString()
      // InsMethodNo: raw.SeriesNumber!,
      // series: raw.SeriesCode! + raw.Separator! ,
    };

    this._empService.createEmployee(req)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.data = res;
          this.form.reset();
          const msg = this._Localization.instant('Employee.CREATE_SUCCESSFULLY');
          this._toastr.success(msg);
        },
        error: (err) => {
          this.errorMessage = err.message;
          const msg = this._Localization.instant('Employee.CREATE_FAILED '+ this.errorMessage);
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
