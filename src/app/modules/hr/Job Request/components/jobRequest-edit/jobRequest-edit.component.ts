import { Component, DestroyRef, OnInit } from '@angular/core';
import { Department } from '../../../Department/interface/department';
import { JobRequest } from '../../interface/jobRequest';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JobTitleLookup } from '../../../Job Title/interface/jobTitle';
import { DepartmentService } from '../../../Department/service/department.service';
import { JobTitleService } from '../../../Job Title/service/jobTitle.service';
import { JobRequestService } from '../../service/jobRequest.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LocalizationService } from 'src/app/modules/localization/localization/localization.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-jobRequest-edit',
  templateUrl: './jobRequest-edit.component.html',
  styleUrls: ['./jobRequest-edit.component.css']
})
export class JobRequestEditComponent implements OnInit {
data : JobRequest;
  errorMessage : string = '';
  jobReqId : number;
  DepartmentList: Department[];
  JobTitleList: JobTitleLookup[];
  // seriesNumber!: string;
  // separator!: string;
// form controls
  form = new FormGroup({
    Id: new FormControl<number | null>(null),
    DepartmentId: new FormControl(0, [Validators.required]),
         JobTitleId: new FormControl(0, [Validators.required]),
         JobDescription: new FormControl("", [Validators.required]),
         NeededPositions: new FormControl(0, [Validators.required]),
         RequestedAt: new FormControl(Date.now()),
  //     InsMethodNo: new FormControl<string>({ value: '', disabled: true }, Validators.required),
  //   series: new FormControl(''),
  //   SeriesNumber:new FormControl<string>('', Validators.required),
  //  SeriesCode:new FormControl<string>('', Validators.required),
  //  Separator:new FormControl<string>('', Validators.required)
  });

  constructor(private _deptService: DepartmentService, private _jobReqService: JobRequestService, private _toastr: ToastrService,
    private _destroyRef: DestroyRef,private _activateRoute: ActivatedRoute , private _router: Router,
     private _jobTitleService: JobTitleService, private _location: Location ,   private _Localization: LocalizationService) { }

  ngOnInit() {
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
    this.getDepartmentList();
    this.getJobTitleList();

    this.jobReqId = Number(this._activateRoute.snapshot.paramMap.get('id') || '');
    if (this.jobReqId) {
      this.jobReqById(this.jobReqId);
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
jobReqById(id: number) {
  this._jobReqService.getJobRequestById(id)
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
          Id: res.Id,
          DepartmentId: res.DepartmentId,
          JobTitleId: res.JobTitleId,
          JobDescription: res.JobDescription,
          NeededPositions: res.NeededPositions,
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


updateJobRequest() {
  if (this.form.valid) {
    const req: JobRequest = {
      Id: this.jobReqId,
      DepartmentId: this.form.value.DepartmentId || 0,
      JobTitleId: this.form.value.JobTitleId || 0,
       JobDescription: this.form.value.JobDescription || "",
       NeededPositions: this.form.value.NeededPositions || 0,
       RequestedAt: new Date().toISOString(),
      // InsMethodNo: this.form.value.SeriesNumber!,
      // series: this.form.value.SeriesCode! + this.form.value.Separator! ,

    };

    this._jobReqService.updateJobRequest(this.jobReqId, req)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
    next: () => {
  this.form.reset();
  this.backAfterEdit();

  const msg = this._Localization.instant('JobTitle.UPDATE_SUCCESS');
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
  const index = url.indexOf('/job-request');
  if (index !== -1) {
  
    const newUrl = url.substring(0, index + '/job-request'.length);
    this._router.navigate([newUrl]);
  } else {

    this._router.navigate(['/']);
  }
  }
  navigateToCreate() {
    this._router.navigate(['../../add'], { relativeTo: this._activateRoute });
  }

}
