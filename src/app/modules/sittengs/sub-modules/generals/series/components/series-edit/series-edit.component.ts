import { Component, DestroyRef, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { ResetPolicy, ScreenCode, Series } from '../../interface/series';
import { SeriesService } from '../../service/series.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-series-edit',
  templateUrl: './series-edit.component.html',
  styleUrls: ['./series-edit.component.css']
})
export class SeriesEditComponent implements OnInit {
  data : Series;
  errorMessage : string = '';
  seriesId : string;
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
    private translat: TranslateService,private _activateRoute: ActivatedRoute , private _router: Router, 
    private _location: Location
  ) { }

  ngOnInit() {
    this.seriesId = this._activateRoute.snapshot.paramMap.get('id') || '';
    if (this.seriesId) {
      this.seriesById(this.seriesId);
      this.getScreenCode();
    }
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
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
seriesById(id: string) {
  this._SeriesService.getSeriesById(id).subscribe({
    next: (res: Series) => {
      this.data = res;
      this.form.patchValue({
        SeriesCode: res.SeriesCode,
        SeriesName: res.SeriesName,
        Separator: res.Separator,
        ScreenCode_Id: res.ScreenCode_Id,
        PaddingLength: res.PaddingLength,
        ResetPolicy: res.ResetPolicy,
      });
    },
    error: (err:any) => {
      this.errorMessage = err.message;
    }
  })
}
  updateSeries() {
  if (this.form.valid && this.seriesId) {
    const req: Series = {
      Id : this.seriesId,
      SeriesCode: this.form.value.SeriesCode || '',
      SeriesName: this.form.value.SeriesName || '',
      Separator: this.form.value.Separator || '',
      ScreenCode_Id: this.form.value.ScreenCode_Id || '',
      PaddingLength: this.form.value.PaddingLength || '',
      ResetPolicy: this.form.value.ResetPolicy || 0,
     
    };
    this._SeriesService.updateSeries(this.seriesId, req)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.data = res;
           this._toastr.success(this.translat.instant("Series Updated successfully"));
               setTimeout(() => this._router.navigate(['/general/setting/series']), 1500);
     
        },
        error: (err) => {
          this.errorMessage = err.message;
         this._toastr.error(this.translat.instant("Failed to Update series"));
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

  // لو موجود كلمة "series" في المسار
  const index = url.indexOf('/series');
  
  if (index !== -1) {
    // خُذ كل ما قبل نهاية كلمة "series"
    const newUrl = url.substring(0, index + '/series'.length);
    this._router.navigate([newUrl]);
  } else {
    // fallback لو لأي سبب مفيش كلمة series
    this._router.navigate(['/']);
  }
  }
  navigateToCreate() {
    this._router.navigate(['../../add'], { relativeTo: this._activateRoute });
  }
}
