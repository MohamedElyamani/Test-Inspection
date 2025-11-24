import { Component, DestroyRef, OnInit } from '@angular/core';
import { AppCV } from '../../interface/appCV';
import { JobRequest } from '../../../Job Request/interface/jobRequest';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppCVService } from '../../service/appCV.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizationService } from 'src/app/modules/localization/localization/localization.service';
import { ToastrService } from 'ngx-toastr';
import { JobRequestService } from '../../../Job Request/service/jobRequest.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Location } from '@angular/common';

@Component({
  selector: 'app-appCV-edit',
  templateUrl: './appCV-edit.component.html',
  styleUrls: ['./appCV-edit.component.css']
})
export class AppCVEditComponent implements OnInit {
data : AppCV;
  errorMessage : string = '';
  appCvId : number;
  JobReqList: JobRequest[];
  // seriesNumber!: string;
  // separator!: string;
// form controls
  form = new FormGroup({
    Id: new FormControl<number | null>(null),
    FullName: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    Phone: new FormControl('', [Validators.required]),
    CVUrl: new FormControl('', [Validators.required]),
    Qualifications: new FormControl('', [Validators.required]),
    JobRequestId: new FormControl(0, [Validators.required]),
    IsInterviewed: new FormControl(false, [Validators.required]),
    Status: new FormControl(0, [Validators.required]),
  //     InsMethodNo: new FormControl<string>({ value: '', disabled: true }, Validators.required),
  //   series: new FormControl(''),
  //   SeriesNumber:new FormControl<string>('', Validators.required),
  //  SeriesCode:new FormControl<string>('', Validators.required),
  //  Separator:new FormControl<string>('', Validators.required)
  });

  constructor(private _appCvService: AppCVService, private _toastr: ToastrService,
    private _destroyRef: DestroyRef,private _activateRoute: ActivatedRoute , private _router: Router,
     private _jobReqService: JobRequestService, private _location: Location ,   private _Localization: LocalizationService) { }

  ngOnInit() {
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
    this.getJobReqList();

    this.appCvId = Number(this._activateRoute.snapshot.paramMap.get('id') || '');
    if (this.appCvId) {
      this.appCvById(this.appCvId);
    }  
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
appCvById(id: number) {
  this._appCvService.getAppCVById(id)
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
        console.log(res);
        this.form.patchValue({
          Id: res.Id,
          FullName: res.FullName,
          Email: res.Email,
          Phone: res.Phone,
          CVUrl: res.CVUrl,
          Qualifications: res.Qualifications,
          JobRequestId: res.JobRequestId,
          IsInterviewed: res.IsInterviewed,

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


updateAppCv() {
  if (this.form.valid) {
    const row = this.form.getRawValue();
    const req: AppCV = {
      Id: this.appCvId,
      FullName: row.FullName || "",
      Email: row.Email || "",
      Phone: row.Phone || "",
      CVUrl: row.CVUrl || "",
      Qualifications: row.Qualifications || "",
      JobRequestId: row.JobRequestId || 0,
      IsInterviewed: row.IsInterviewed || false,
      Status: row.Status || 0,
      // InsMethodNo: row.SeriesNumber!,
      // series: row.SeriesCode! + row.Separator! ,

    };

    this._appCvService.updateAppCV(this.appCvId, req)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
    next: () => {
  this.form.reset();
  this.backAfterEdit();

  const msg = this._Localization.instant('ApplicationCV.UPDATE_SUCCESSFULLY');
  this._toastr.success(msg);
},
error: () => {
  const msg = this._Localization.instant('ApplicationCV.UPDATE_FAILED' + this.errorMessage);
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
  const index = url.indexOf('/application-cv');
  if (index !== -1) {
  
    const newUrl = url.substring(0, index + '/application-cv'.length);
    this._router.navigate([newUrl]);
  } else {

    this._router.navigate(['/']);
  }
  }
  navigateToCreate() {
    this._router.navigate(['../../add'], { relativeTo: this._activateRoute });
  }

}
