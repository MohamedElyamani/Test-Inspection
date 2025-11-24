import { Component, DestroyRef, OnInit } from '@angular/core';
import { Equipment } from '../../interface/equipment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SeriesForTables } from 'src/app/modules/sittengs/sub-modules/generals/series/interface/series';
import { SeriesService } from 'src/app/modules/sittengs/sub-modules/generals/series/service/series.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EquipmentService } from '../../services/equipment.service';


@Component({
  selector: 'app-equipment-add',
  templateUrl: './equipment-add.component.html',
  styleUrls: ['./equipment-add.component.css']
})
export class EquipmentAddComponent implements OnInit {

data!: Equipment;
  errorMessage = '';
   form = new FormGroup({
    SerialNumber: new FormControl<string>('', Validators.required),
    Name: new FormControl<string | null>(null, Validators.required),
    MaintenanceIntervalDays: new FormControl<number | null>(null, Validators.required),
    Description: new FormControl<string>(''),
    PurchaseDate: new FormControl<Date | null>(null, Validators.required),
    ExpiryDate: new FormControl<Date | null>(null, Validators.required),
    LastMaintenanceDate: new FormControl<Date | null>(null, Validators.required),
    LastCalibrationDate: new FormControl<Date | null>(null, Validators.required),
    NextCalibrationDueDate: new FormControl<Date | null>(null, Validators.required),
    series: new FormControl(''),
    SeriesNumber:new FormControl<string>('', Validators.required),
    SeriesCode:new FormControl<string>('', Validators.required),
    Separator:new FormControl<string>('', Validators.required),
    EquipmentNo: new FormControl<string>({ value: '', disabled: true }, Validators.required),
  });
  
  constructor(
     private _toastr: ToastrService,
        private _destroyRef: DestroyRef,
        private _router: Router,
        private translat: TranslateService,
         private _seriesService : SeriesService,
         private  _equipment : EquipmentService,
  ) { }

  ngOnInit() {
      this.form.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe();
      this.getSeriesData();
  }
createEquipment() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const formValue = this.form.getRawValue();
  const req: Equipment = {
    EquipmentNo: formValue.SeriesNumber!,
    SerialNumber: formValue.SerialNumber!,
    Name: formValue.Name!,
    series: formValue.SeriesCode! + formValue.Separator!,
        LastCalibrationDate: new Date(formValue.LastCalibrationDate!),
            LastMaintenanceDate: new Date(formValue.LastMaintenanceDate!),
            NextCalibrationDueDate: new Date(formValue.NextCalibrationDueDate!),
            PurchaseDate: new Date(formValue.PurchaseDate!),
            ExpiryDate: new Date(formValue.ExpiryDate!),
    MaintenanceIntervalDays: formValue.MaintenanceIntervalDays!,
    Description: formValue.Description!,
    Id: 0,
    IsCalibrated: false
  };

  this._equipment.createEquipment(req)
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: res => {
  this.data = res;
   this._toastr.success(this.translat.instant('Equipment created successfully' ));
  setTimeout(() => this._router.navigate(['/equipment/equipment']), 1500);
},

      error: err => {
        console.error(this.translat.instant('Equipment create error:', err));
        this._toastr.error(err.error?.title || err.message);
      }
    });
}

  getSeriesData(){
  this._seriesService.getSeriesInfoForTables('Equipments', 'EquipmentNo', 'Equipments')
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: (res: SeriesForTables) => {
   
        this.form.patchValue(
          { 
            EquipmentNo: res.FinelSeriesCodeAndSeriesNumber ,
            SeriesNumber: res.SeriesNumber ,
            SeriesCode: res.SeriesCode ,
            Separator: res.Separator ,
  
          });
      },
      error: err => console.error('Series API Error:', err)
    });
}
 isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control.touched;
  }
}
