import { Component, DestroyRef, OnInit } from '@angular/core';
import { InspectionMethod } from '../../interface/inspectionMethod';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InspectionMethodService } from '../../service/inspection-method.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Location } from '@angular/common';
import { LocalizationService } from 'src/app/modules/localization/localization/localization.service';

@Component({
  selector: 'app-inspection-method-edit',
  templateUrl: './inspection-method-edit.component.html',
  styleUrls: ['./inspection-method-edit.component.css']
})
export class InspectionMethodEditComponent implements OnInit {
data : InspectionMethod;
  errorMessage : string = '';
  InspectMethodId : number;
  seriesNumber!: string;
  separator!: string;
// form controls
  form = new FormGroup({
      Id: new FormControl<number | null>(null),
    Name: new FormControl('', [Validators.required]),
      InsMethodNo: new FormControl<string>({ value: '', disabled: true }, Validators.required),
    series: new FormControl(''),
    SeriesNumber:new FormControl<string>('', Validators.required),
   SeriesCode:new FormControl<string>('', Validators.required),
   Separator:new FormControl<string>('', Validators.required)
  });

  constructor(private _inspectMethodService: InspectionMethodService, private _toastr: ToastrService,private _destroyRef: DestroyRef,
    private _activateRoute: ActivatedRoute , private _router: Router, 
    private _location: Location ,   private _Localization: LocalizationService) { }

  ngOnInit() {
    this.InspectMethodId = Number(this._activateRoute.snapshot.paramMap.get('id') || '');
        if (this.InspectMethodId) {
          this.inspectionMethodById(this.InspectMethodId);
        }
        this.form.valueChanges
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe();
  }
inspectionMethodById(id: number) {
  this._inspectMethodService.getInspectionMethodById(id)
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: (res) => {
          // ✅ Combine series + number for display
        const finalNumber = res.series + res.InsMethodNo;   // <-- "JO-2025-10*0003"

        // ✅ Extract parts back to form
        const match = res.series.match(/^(.+?)(.)$/);
        const seriesCode = match ? match[1] : '';
        const separator = match ? match[2] : '';
        const seriesNumber = res.InsMethodNo;
        this.data = res;
        this.form.patchValue({
          Name: this.data.Name,
            Id: res.Id,
          InsMethodNo: finalNumber,
          SeriesCode: seriesCode,
          Separator: separator,
          SeriesNumber: seriesNumber,
        });
      },
      error: (err) => {
        this.errorMessage = err.message;
        this._toastr.error(this.errorMessage);
      }
    });
  }


updateInspectionMethod() {
  if (this.form.valid) {
    const raw = this.form.getRawValue();
    const req: InspectionMethod = {
      Id: this.InspectMethodId,
      Name: raw.Name || '',
      InsMethodNo: raw.SeriesNumber!,
      series: raw.SeriesCode! + raw.Separator! ,

    };

    this._inspectMethodService.updateInspectionMethod(this.InspectMethodId, req)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
    next: () => {
  this.form.reset();
  this.backAfterEdit();

  const msg = this._Localization.instant('INSPECTION_METHOD.UPDATE_SUCCESSFULLY');
  this._toastr.success(msg);
},
error: () => {
  const msg = this._Localization.instant('INSPECTION_METHOD.UPDATE_FAILED');
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
  const index = url.indexOf('/method');
  if (index !== -1) {
  
    const newUrl = url.substring(0, index + '/method'.length);
    this._router.navigate([newUrl]);
  } else {

    this._router.navigate(['/']);
  }
  }
  navigateToCreate() {
    this._router.navigate(['../../add'], { relativeTo: this._activateRoute });
  }
}

