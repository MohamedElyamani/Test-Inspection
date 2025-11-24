import { Component, DestroyRef, OnInit } from '@angular/core';
import { Department } from '../../interface/department';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from '../../service/department.service';
import { ToastrService } from 'ngx-toastr';
import { LocalizationService } from 'src/app/modules/localization/localization/localization.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.css']
})
export class DepartmentAddComponent implements OnInit {
 data : Department;
  errorMessage : string = '';
  // form controls
  form = new FormGroup({
    
    Name: new FormControl('', [Validators.required]),
  //   InsMethodNo: new FormControl<string>({ value: '', disabled: true }, Validators.required),
  //   series: new FormControl(''),
  //   SeriesNumber:new FormControl<string>('', Validators.required),
  //  SeriesCode:new FormControl<string>('', Validators.required),
  //  Separator:new FormControl<string>('', Validators.required)
  });
  constructor(private _deptService: DepartmentService, private _toastr: ToastrService,private _destroyRef: DestroyRef 
    ,   private _Localization: LocalizationService
  ) { }

  ngOnInit() {
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
        //this.getSeriesData();
  }
createDepartment() {
  if (this.form.valid) {
    const raw = this.form.getRawValue();
    const req: Department = {
      Name: raw.Name || '',
      // InsMethodNo: this.form.value.SeriesNumber!,
      // series: this.form.value.SeriesCode! + this.form.value.Separator! ,

    };

    this._deptService.createDept(req)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.data = res;
          this.form.reset();
          const msg = this._Localization.instant('DEPARTMENT.CREATE_SUCCESSFULLY');
          this._toastr.success(msg);
        },
        error: (err) => {
          this.errorMessage = err.message;
          const msg = this._Localization.instant('DEPARTMENT.CREATE_FAILED' + this.errorMessage);
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
