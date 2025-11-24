import { Component, DestroyRef, OnInit } from '@angular/core';
import { Department } from '../../interface/department';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from '../../service/department.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalizationService } from 'src/app/modules/localization/localization/localization.service';
import { Location } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.css']
})
export class DepartmentEditComponent implements OnInit {
data : Department;
  errorMessage : string = '';
  deptId : number;
  // seriesNumber!: string;
  // separator!: string;
// form controls
  form = new FormGroup({
    Id: new FormControl<number | null>(null),
    Name: new FormControl('', [Validators.required]),
  //     InsMethodNo: new FormControl<string>({ value: '', disabled: true }, Validators.required),
  //   series: new FormControl(''),
  //   SeriesNumber:new FormControl<string>('', Validators.required),
  //  SeriesCode:new FormControl<string>('', Validators.required),
  //  Separator:new FormControl<string>('', Validators.required)
  });

  constructor(private _deptService: DepartmentService, private _toastr: ToastrService,private _destroyRef: DestroyRef,
    private _activateRoute: ActivatedRoute , private _router: Router, 
    private _location: Location ,   private _Localization: LocalizationService) { }

  ngOnInit() {
    this.deptId = Number(this._activateRoute.snapshot.paramMap.get('id') || '');
    if (this.deptId) {
      this.departmentById(this.deptId);
    }
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }
departmentById(id: number) {
  this._deptService.getDeptById(id)
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
          Name: this.data.Name,
          Id: res.Id,
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


updateDepartment() {
  if (this.form.valid) {
    const req: Department = {
      Id: this.deptId,
      Name: this.form.value.Name || '',
      // InsMethodNo: this.form.value.SeriesNumber!,
      // series: this.form.value.SeriesCode! + this.form.value.Separator! ,

    };

    this._deptService.updateDept(this.deptId, req)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
    next: () => {
  this.form.reset();
  this.backAfterEdit();

  const msg = this._Localization.instant('DEPARTMENT.UPDATE_SUCCESSFULLY');
  this._toastr.success(msg);
},
error: () => {
  const msg = this._Localization.instant('DEPARTMENT.UPDATE_FAILED' + this.errorMessage);
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
  const index = url.indexOf('/department');
  if (index !== -1) {
  
    const newUrl = url.substring(0, index + '/department'.length);
    this._router.navigate([newUrl]);
  } else {

    this._router.navigate(['/']);
  }
  }
  navigateToCreate() {
    this._router.navigate(['../../add'], { relativeTo: this._activateRoute });
  }

}
