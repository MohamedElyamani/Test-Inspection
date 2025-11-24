import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppCV } from '../../interface/appCV';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppCVService } from '../../service/appCV.service';
import { ToastrService } from 'ngx-toastr';
import { LocalizationService } from 'src/app/modules/localization/localization/localization.service';
import { JobRequestService } from '../../../Job Request/service/jobRequest.service';
import { JobRequest } from '../../../Job Request/interface/jobRequest';

@Component({
  selector: 'app-appCV-add',
  templateUrl: './appCV-add.component.html',
  styleUrls: ['./appCV-add.component.css']
})
export class AppCVAddComponent implements OnInit {
  data : AppCV;
  errorMessage : string = '';
  JobReqList: JobRequest[];


  // form controls
  form = new FormGroup({
    FullName: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    Phone: new FormControl('', [Validators.required]),
    CVUrl: new FormControl('', [Validators.required]),
    Qualifications: new FormControl('', [Validators.required]),
    JobRequestId: new FormControl(0, [Validators.required]),
    IsInterviewed: new FormControl(false, [Validators.required]),
    Status: new FormControl(0, [Validators.required]),
  //   InsMethodNo: new FormControl<string>({ value: '', disabled: true }, Validators.required),
  //   series: new FormControl(''),
  //   SeriesNumber:new FormControl<string>('', Validators.required),
  //  SeriesCode:new FormControl<string>('', Validators.required),
  //  Separator:new FormControl<string>('', Validators.required)
  });
  constructor(private _appCvService: AppCVService, private _toastr: ToastrService,private _destroyRef: DestroyRef 
    ,   private _Localization: LocalizationService,private _jobReqService: JobRequestService
  ) { }

  ngOnInit() {
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
      this.getJobReqList();
        //this.getSeriesData();
  }

  getJobReqList() {
   this._jobReqService.getJobRequestList()
     .pipe(takeUntilDestroyed(this._destroyRef))
     .subscribe({
       next: (res) => {
         this.JobReqList = res;
       },
       error: (err) => {
         this.errorMessage = err.message;
       }
     });
 }

createAppCV() {
  if (this.form.valid) {
    const raw = this.form.getRawValue();
    const req: AppCV = {
      FullName: raw.FullName || '',
      Email: raw.Email || '',
      Phone: raw.Phone || '',
      CVUrl: raw.CVUrl || '',
      Qualifications: raw.Qualifications || '',
      Status: raw.Status || 0,
      IsInterviewed: raw.IsInterviewed || false,
      JobRequestId: raw.JobRequestId || 0,
      // InsMethodNo: this.form.value.SeriesNumber!,
      // series: this.form.value.SeriesCode! + this.form.value.Separator! ,

    };

    this._appCvService.createAppCV(req)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.data = res;
          this.form.reset();
          const msg = this._Localization.instant('ApplicaationCV.CREATE_SUCCESSFULLY');
          this._toastr.success(msg);
        },
        error: (err) => {
          this.errorMessage = err.message;
          const msg = this._Localization.instant('ApplicaationCV.CREATE_FAILED '+ this.errorMessage);
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
