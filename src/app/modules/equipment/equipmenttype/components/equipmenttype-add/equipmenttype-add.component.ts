import { Component, DestroyRef, OnInit } from '@angular/core';
import { Equipmenttype } from '../../interface/equipmenttype';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SeriesService } from 'src/app/modules/sittengs/sub-modules/generals/series/service/series.service';
import { EquipmenttypeService } from '../../service/equipmenttype.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-equipmenttype-add',
  templateUrl: './equipmenttype-add.component.html',
  styleUrls: ['./equipmenttype-add.component.css']
})
export class EquipmenttypeAddComponent implements OnInit {
  data!: Equipmenttype;
  errorMessage = '';

  constructor(
    private _toastr: ToastrService,
    private _destroyRef: DestroyRef,
    private _router: Router,
    private translat: TranslateService,
    private _seriesService: SeriesService,
    private _Equipmenttype: EquipmenttypeService
  ) {}

  form = new FormGroup({
    Name: new FormControl<string | null>(null, Validators.required),
  });

  ngOnInit() {
    this.form.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe();
  }

  createEquipmenttype() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();
    const req: Equipmenttype = {
      Name: formValue.Name!,
    };

    this._Equipmenttype.createEquipmenttype(req)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: res => {
          this.data = res;
           this._toastr.success(this.translat.instant('Equipment type created successfully'));
          setTimeout(() => this._router.navigate(['/equipment/equipmenttype']), 1500);
        },
        error: err => {
          console.error('Equipment type create error:', err);
          this._toastr.error(this.translat.instant(err.error?.title || err.message));
        }
      });
  }

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control.touched;
  }
}
