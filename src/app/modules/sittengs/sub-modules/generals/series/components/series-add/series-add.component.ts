import { Component, DestroyRef, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { ResetPolicy, ScreenCode, Series } from '../../interface/series';
import { SeriesService } from '../../service/series.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-series-add',
  templateUrl: './series-add.component.html',
  styleUrls: ['./series-add.component.css']
})
export class SeriesAddComponent implements OnInit {
  data : Series;
  errorMessage : string = '';
  screenCodeList : ScreenCode[];
   // تحويل enum لـ array من objects
  ResetPolicyOptions = Object.keys(ResetPolicy)
    .filter(key => !isNaN(Number(ResetPolicy[key as any]))) // فلتر الأسماء
    .map(key => ({
      value: ResetPolicy[key as any],
      label: key
    }));

  // form controls
  form = new FormGroup({
  SeriesCode: new FormControl('',[Validators.required]),
  SeriesName: new FormControl('', [Validators.required]),
  Separator: new FormControl('', [Validators.required]),
  ScreenCode_Id: new FormControl('', [Validators.required]),
  PaddingLength: new FormControl('', [Validators.required]),
  ResetPolicy: new FormControl(0, [Validators.required]),
});
  constructor(private _SeriesService: SeriesService,private _toastr: ToastrService,private _destroyRef: DestroyRef,
    private translat: TranslateService , private _router: Router
  ) { }

  ngOnInit() {
     this.form.valueChanges
       .pipe(takeUntilDestroyed(this._destroyRef))
       .subscribe();
       this.getScreenCode();
  }
getScreenCode() {
  this._SeriesService.getScreenCode()
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: (res) => {
        this.screenCodeList = res;
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
}
  createSeries() {
  if (this.form.valid) {
    const req: Series = {
      SeriesCode: this.form.value.SeriesCode || '',
      SeriesName: this.form.value.SeriesName || '',
      Separator: this.form.value.Separator || '',
      ScreenCode_Id: this.form.value.ScreenCode_Id || '',
      PaddingLength: this.form.value.PaddingLength ?? '',
      ResetPolicy: this.form.value.ResetPolicy || 0,
     
    };
    this._SeriesService.createSeries(req)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.data = res;
          this.form.reset({
            SeriesCode: '',
            SeriesName: '',
            Separator: '',
            ScreenCode_Id: '',
            PaddingLength: null,
            ResetPolicy: null
          });
          this._toastr.success(this.translat.instant("Series created successfully"));
               setTimeout(() => this._router.navigate(['/general/setting/series']), 1500);
        },
        error: (err) => {
          this.errorMessage = err.message;
          this._toastr.error(this.translat.instant("Failed to create series"));
        }
      });
  }
}
isInvalid(controlName: string) {
        const control = this.form.get(controlName);
        return control?.invalid && (control.touched);
}
 /*cancel() {
    // get current url
    const url = this._location.path();
    // remove the last part of the url
    const newUrl = url.substring(0, url.lastIndexOf('/'));// ده بيرجع الصفحة اللي قبلها
    this._router.navigate([newUrl]);
}*/

  }
