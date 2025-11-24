import { Component, DestroyRef, OnInit } from '@angular/core';
import { Equipment } from '../../interface/equipment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SeriesService } from 'src/app/modules/sittengs/sub-modules/generals/series/service/series.service';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SeriesForTables } from 'src/app/modules/sittengs/sub-modules/generals/series/interface/series';
import { EquipmentService } from '../../services/equipment.service';

@Component({
  selector: 'app-equipment-edit',
  templateUrl: './equipment-edit.component.html',
  styleUrls: ['./equipment-edit.component.css']
})
export class EquipmentEditComponent implements OnInit {

  data!: Equipment;
    errorMessage = '';
     Id: number;
     form = new FormGroup({
      Id :  new FormControl<number | null>(null, Validators.required),
      SerialNumber: new FormControl<string>('', Validators.required),
      Name: new FormControl<string | null>(null, Validators.required),
      MaintenanceIntervalDays: new FormControl<number | null>(null, Validators.required),
      Description: new FormControl<string>(''),
      PurchaseDate: new FormControl<string | null>(null, Validators.required),
      ExpiryDate: new FormControl<string | null>(null, Validators.required),
      LastMaintenanceDate: new FormControl<string | null>(null, Validators.required),
      LastCalibrationDate: new FormControl<string | null>(null, Validators.required),
      NextCalibrationDueDate: new FormControl<string | null>(null, Validators.required),
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
           private _activateRoute: ActivatedRoute,
    ) { }
  
    ngOnInit() {
        this.form.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe();
       
        this.Id = Number(this._activateRoute.snapshot.paramMap.get('id'));
  if (this.Id) {
    this.EquipmentById(this.Id); // ✅ Only load record, do NOT call getSeries()
  }
    }
  UpdateEquipment() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  
    const formValue = this.form.getRawValue();
    const req: Equipment = {
            SerialNumber:formValue.SerialNumber!,
            EquipmentNo: formValue.SeriesNumber!,
            Name: formValue.Name!,
            series: formValue.SeriesCode! + formValue.Separator!,
            LastCalibrationDate: new Date(formValue.LastCalibrationDate!),
            LastMaintenanceDate: new Date(formValue.LastMaintenanceDate!),
            NextCalibrationDueDate: new Date(formValue.NextCalibrationDueDate!),
            PurchaseDate: new Date(formValue.PurchaseDate!),
            ExpiryDate: new Date(formValue.ExpiryDate!),
            MaintenanceIntervalDays: formValue.MaintenanceIntervalDays!,
            Description: formValue.Description!,
            Id: formValue.Id!,
            IsCalibrated: false
    };
  
    this._equipment.createEquipment(req)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: res => {
    this.data = res;
     this._toastr.success(this.translat.instant('Equipment Updated successfully' ));
  setTimeout(() => this._router.navigate(['/equipment/equipment']), 1500);
  },
  
        error: err => {
          console.error(this.translat.instant('Equipment Updated error:', err));
          this._toastr.error(err.error?.title || err.message);
        }
      });
  }
  private formatDateForInput(date: any): string {
  return date ? new Date(date).toISOString().substring(0, 10) : '';
}

  EquipmentById(id: number) {
    this._equipment.getEquipmentById(id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res: Equipment) => {
  
          // ✅ Combine series + number for display
          const finalNumber = res.series + res.EquipmentNo;   // <-- "JO-2025-10*0003"
  
          // ✅ Extract parts back to form
          const match = res.series.match(/^(.+?)(.)$/);
          const seriesCode = match ? match[1] : '';
          const separator = match ? match[2] : '';
          const seriesNumber = res.EquipmentNo;
  
          this.form.patchValue({
            Id: res.Id,
            EquipmentNo: finalNumber,
            SerialNumber:res.SerialNumber,
            SeriesCode: seriesCode,
            Separator: separator,
            SeriesNumber: seriesNumber,
            Name: res.Name,
            MaintenanceIntervalDays: res.MaintenanceIntervalDays,
            Description: res.Description,
           LastCalibrationDate: this.formatDateForInput(res.LastCalibrationDate),
           LastMaintenanceDate: this.formatDateForInput(res.LastMaintenanceDate),
           NextCalibrationDueDate: this.formatDateForInput(res.NextCalibrationDueDate),
           PurchaseDate: this.formatDateForInput(res.PurchaseDate),
           ExpiryDate: this.formatDateForInput(res.ExpiryDate),
            
          });

          this.form.get('EquipmentNo')?.disable();
        }
      });
  }
  formatDateForApi(dateString: string | null): string | null {
  return dateString ? new Date(dateString).toISOString() : null;
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
