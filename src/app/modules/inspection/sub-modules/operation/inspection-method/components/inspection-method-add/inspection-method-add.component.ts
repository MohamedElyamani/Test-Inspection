import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InspectionMethod } from '../../interface/inspectionMethod';
import { InspectionMethodService } from '../../service/inspection-method.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LocalizationService } from 'src/app/modules/localization/localization/localization.service';
import { SeriesService } from 'src/app/modules/sittengs/sub-modules/generals/series/service/series.service';
import { SeriesForTables } from 'src/app/modules/sittengs/sub-modules/generals/series/interface/series';

@Component({
  selector: 'app-inspection-method-add',
  templateUrl: './inspection-method-add.component.html',
  styleUrls: ['./inspection-method-add.component.css']
})
export class InspectionMethodAddComponent implements OnInit {
 data : InspectionMethod;
  errorMessage : string = '';
  // form controls
  form = new FormGroup({
    
    Name: new FormControl('', [Validators.required]),
    InsMethodNo: new FormControl<string>({ value: '', disabled: true }, Validators.required),
    series: new FormControl(''),
    SeriesNumber:new FormControl<string>('', Validators.required),
   SeriesCode:new FormControl<string>('', Validators.required),
   Separator:new FormControl<string>('', Validators.required)
  });
  constructor(private _inspectMethodService: InspectionMethodService, private _toastr: ToastrService,private _destroyRef: DestroyRef 
    ,   private _Localization: LocalizationService , private _seriesService : SeriesService
  ) { }

  ngOnInit() {
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
        this.getSeriesData();
  }
createInspectionMethod() {
  if (this.form.valid) {
    const row = this.form.getRawValue();
    const req: InspectionMethod = {
      Name: row.Name || '',
      InsMethodNo: row.SeriesNumber!,
      series: row.SeriesCode! + row.Separator! ,

    };

    this._inspectMethodService.createInspectionMethod(req)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.data = res;
          this.form.reset();
          const msg = this._Localization.instant('INSPECTION_METHOD.CREATE_SUCCESSFULLY');
          this._toastr.success(msg);
        },
        error: (err) => {
          this.errorMessage = err.message;

          
          const msg = this._Localization.instant('INSPECTION_METHOD.CREATE_FAILED '+ this.errorMessage);
          this._toastr.error(msg);
        }
      });
  }
}

isInvalid(controlName: string) {
        const control = this.form.get(controlName);
        return control?.invalid && (control.touched);
}
  getSeriesData(){
  this._seriesService.getSeriesInfoForTables('InspectionMethod', 'InsMethodNo', 'Inspection Method')
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: (res: SeriesForTables) => {
        this.form.patchValue(
          { 
            InsMethodNo: res.FinelSeriesCodeAndSeriesNumber ,
            SeriesNumber: res.SeriesNumber ,
            SeriesCode: res.SeriesCode ,
            Separator: res.Separator ,
  
          });
      },
      error: err => console.error('Series API Error:', err)
    });
}
}
