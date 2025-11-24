import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { JobRequest } from '../../interface/jobRequest';
import { Department } from '../../../Department/interface/department';
import { JobTitleLookup } from '../../../Job Title/interface/jobTitle';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from '../../../Department/service/department.service';
import { JobTitleService } from '../../../Job Title/service/jobTitle.service';
import { ToastrService } from 'ngx-toastr';
import { LocalizationService } from 'src/app/modules/localization/localization/localization.service';
import { JobRequestService } from '../../service/jobRequest.service';

@Component({
  selector: 'app-jobRequest-add',
  templateUrl: './jobRequest-add.component.html',
  styleUrls: ['./jobRequest-add.component.css']
})
export class JobRequestAddComponent implements OnInit {
   data : JobRequest;
   errorMessage : string = '';
   DepartmentList: Department[];
   JobTitleList: JobTitleLookup[];
 
 
   // form controls
   form = new FormGroup({
     DepartmentId: new FormControl(0, [Validators.required]),
     JobTitleId: new FormControl(0, [Validators.required]),
     JobDescription: new FormControl("", [Validators.required]),
     NeededPositions: new FormControl(0, [Validators.required]),
     RequestedAt: new FormControl(Date.now()),
   //   InsMethodNo: new FormControl<string>({ value: '', disabled: true }, Validators.required),
   //   series: new FormControl(''),
   //   SeriesNumber:new FormControl<string>('', Validators.required),
   //  SeriesCode:new FormControl<string>('', Validators.required),
   //  Separator:new FormControl<string>('', Validators.required)
   });
   constructor(private _jobReqService : JobRequestService,private _jobtitleService: JobTitleService, private _toastr: ToastrService,private _destroyRef: DestroyRef 
     ,   private _Localization: LocalizationService,private _deptService: DepartmentService
   ) { }
 
   ngOnInit() {
     this.form.valueChanges
       .pipe(takeUntilDestroyed(this._destroyRef))
       .subscribe();
       this.getDepartmentList();
       this.getJobTitleList();
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
    this._jobtitleService.getJobTitleLookUp()
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
 
 createJobRequest() {
   if (this.form.valid) {
    const raw = this.form.getRawValue();
     const req: JobRequest = {
       DepartmentId: raw.DepartmentId || 0,
       JobTitleId: raw.JobTitleId || 0,
       JobDescription: raw.JobDescription || "",
       NeededPositions: raw.NeededPositions || 0,
       RequestedAt: new Date().toISOString(),
       // InsMethodNo: raw.value.SeriesNumber!,
       // series: raw.value.SeriesCode! + raw.value.Separator! ,
 
     };
 
     this._jobReqService.createJobRequest(req)
       .pipe(takeUntilDestroyed(this._destroyRef))
       .subscribe({
         next: (res) => {
           this.data = res;
           this.form.reset();
           const msg = this._Localization.instant('JobRequest.CREATE_SUCCESSFULLY');
           this._toastr.success(msg);
         },
         error: (err) => {
           this.errorMessage = err.message;
           const msg = this._Localization.instant('JobRequest.CREATE_FAILED '+ this.errorMessage);
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
