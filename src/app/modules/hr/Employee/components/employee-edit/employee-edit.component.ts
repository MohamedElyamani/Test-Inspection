import { Location } from '@angular/common';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { DepartmentService } from '../../../Department/service/department.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizationService } from 'src/app/modules/localization/localization/localization.service';
import { JobTitleService } from '../../../Job Title/service/jobTitle.service';
import { AppCVService } from '../../../ApplicantCV/service/appCV.service';
import { Employee } from '../../interface/employee';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Department } from '../../../Department/interface/department';
import { JobTitleLookup } from '../../../Job Title/interface/jobTitle';
import { AppCVLookup } from '../../../ApplicantCV/interface/appCV';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
data : Employee;
  errorMessage : string = '';
  empId : number;
  DepartmentList: Department[];
  JobTitleList: JobTitleLookup[];
  AppCVList: AppCVLookup[];
  // seriesNumber!: string;
  // separator!: string;

// form controls

  form = new FormGroup({
    Id: new FormControl<number | null>(null),
   FullName: new FormControl('', [Validators.required]),
    EmployeeCode: new FormControl('', [Validators.required]),
    CVId: new FormControl(0, [Validators.required]),
    DepartmentId: new FormControl(0, [Validators.required]),
    JobTitleId: new FormControl(0, [Validators.required]),
    NationalId: new FormControl('', [Validators.required]),
    PhotoUrl: new FormControl('', [Validators.required]),
    Qualifications: new FormControl('', [Validators.required]),
    HireDate: new FormControl("", [Validators.required]),
  //     InsMethodNo: new FormControl<string>({ value: '', disabled: true }, Validators.required),
  //   series: new FormControl(''),
  //   SeriesNumber:new FormControl<string>('', Validators.required),
  //  SeriesCode:new FormControl<string>('', Validators.required),
  //  Separator:new FormControl<string>('', Validators.required)
  });

  constructor(private _empService: EmployeeService,private _deptService: DepartmentService, private _toastr: ToastrService,
    private _destroyRef: DestroyRef,private _activateRoute: ActivatedRoute , private _router: Router, 
    private _location: Location ,   private _Localization: LocalizationService, private _appCVService: AppCVService,
         private _jobTitleService: JobTitleService) { }

  ngOnInit() {
    this.empId = Number(this._activateRoute.snapshot.paramMap.get('id') || '');
    if (this.empId) {
      this.empById(this.empId);
    }
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
      this.getDepartmentList();
      this.getJobTitleList();
      this.getAppCvList();
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
empById(id: number) {
  this._empService.getEmployeeById(id)
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: (res) => {
        this.data = res;
        this.form.patchValue({
          Id: res.Id,
          FullName: this.data.FullName,
          EmployeeCode: this.data.EmployeeCode,
          CVId: this.data.CVId,
          DepartmentId: this.data.DepartmentId,
          JobTitleId: this.data.JobTitleId,
          NationalId: this.data.NationalId,
          PhotoUrl: this.data.PhotoUrl,
          Qualifications: this.data.Qualifications,
          HireDate: this.data.HireDate || '',
        });
      },
      error: (err) => {
        this.errorMessage = err.message;
        this._toastr.error(this.errorMessage);
      }
    });
  }


updateEmployee() {
  if (this.form.valid) {
    const raw = this.form.getRawValue();
    const req: Employee = {
      Id: this.empId,
     FullName: raw.FullName || '',
      EmployeeCode: raw.EmployeeCode || '',
      CVId: raw.CVId || 0,
      JobTitleId: raw.JobTitleId || 0,
      DepartmentId: raw.DepartmentId || 0,
      PhotoUrl: raw.PhotoUrl || '',
      NationalId: raw.NationalId || '',
      Qualifications: raw.Qualifications || '',
      HireDate: raw.HireDate ? new Date(raw.HireDate).toISOString() : new Date().toISOString()
      // InsMethodNo: this.form.value.SeriesNumber!,
      // series: this.form.value.SeriesCode! + this.form.value.Separator! ,

    };

    this._empService.updateEmployee(this.empId, req)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
    next: () => {
  this.form.reset();
  this.backAfterEdit();

  const msg = this._Localization.instant('Employee.UPDATE_SUCCESSFULLY');
  this._toastr.success(msg);
},
error: (err) => {
  this.errorMessage = err.message;
  const msg = this._Localization.instant('Employee.UPDATE_FAILED' + this.errorMessage);
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
  const index = url.indexOf('/employee');
  if (index !== -1) {
  
    const newUrl = url.substring(0, index + '/employee'.length);
    this._router.navigate([newUrl]);
  } else {

    this._router.navigate(['/']);
  }
  }
  navigateToCreate() {
    this._router.navigate(['../../add'], { relativeTo: this._activateRoute });
  }
}
