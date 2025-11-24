import { Component, DestroyRef, OnInit } from '@angular/core';
import { Equipmenttype } from '../../interface/equipmenttype';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeriesService } from 'src/app/modules/sittengs/sub-modules/generals/series/service/series.service';
import { EquipmenttypeService } from '../../service/equipmenttype.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-equipmenttype-edit',
  templateUrl: './equipmenttype-edit.component.html',
  styleUrls: ['./equipmenttype-edit.component.css']
})
export class EquipmenttypeEditComponent implements OnInit {

  data!: Equipmenttype;
  errorMessage = '';
  Id: number;

  constructor(
    private _toastr: ToastrService,
    private _destroyRef: DestroyRef,
    private _router: Router,
    private translat: TranslateService,
    private _seriesService: SeriesService,
    private _Equipmenttype: EquipmenttypeService,
     private _activateRoute : ActivatedRoute
  ) {}

  form = new FormGroup({
    Id: new FormControl<number | null>(null, Validators.required),
    Name: new FormControl<string | null>(null, Validators.required),
  });

  ngOnInit() {
    this.form.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe();
           this.Id = Number(this._activateRoute.snapshot.paramMap.get('id'));
  if (this.Id) {
    this.EquipmenttypeById(this.Id);
 
  }
  
  }

  UpdateEquipmenttype() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();
    const req: Equipmenttype = {
      Id:formValue.Id!,
      Name: formValue.Name!,
    };

    this._Equipmenttype.updateEquipmenttype(this.Id,req)
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
  EquipmenttypeById(id: number) {
    this._Equipmenttype.getEquipmenttypeById(id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res: Equipmenttype) => {
  
        
  
          this.form.patchValue({
            Id: res.Id,
             Name: res.Name!,
           
            
          });

        }
      });
  }
  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control.touched;
  }

}
