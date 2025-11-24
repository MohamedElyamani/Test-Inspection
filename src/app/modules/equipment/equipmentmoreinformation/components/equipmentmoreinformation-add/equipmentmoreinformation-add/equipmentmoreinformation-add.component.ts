import { Component, DestroyRef, OnInit } from '@angular/core';
import { Equipmentmoreinformation } from '../../../interface/equipmentmoreinformation';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SeriesService } from 'src/app/modules/sittengs/sub-modules/generals/series/service/series.service';
import { EquipmentService } from 'src/app/modules/equipment/equipment/services/equipment.service';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EquipmentmoreinformationService } from '../../../service/equipmentmoreinformation.service';
import { EquipmentLookup } from 'src/app/modules/equipment/equipment/interface/equipment';

@Component({
  selector: 'app-equipmentmoreinformation-add',
  templateUrl: './equipmentmoreinformation-add.component.html',
  styleUrls: ['./equipmentmoreinformation-add.component.css']
})
export class EquipmentmoreinformationAddComponent implements OnInit {
data!: Equipmentmoreinformation;
  errorMessage = '';
   EquipmentList: EquipmentLookup[] = [];
  constructor(    
           private _toastr: ToastrService,
           private _destroyRef: DestroyRef,
           private _router: Router,
           private translat: TranslateService,
           private _seriesService : SeriesService,
           private  _equipment : EquipmentService,
           private _moreinformation : EquipmentmoreinformationService ) { }

             form = new FormGroup({
               EquipmentId:  new FormControl(null, [Validators.required]),
               KeyName: new FormControl<string | null>(null, Validators.required),
               KeyValue: new FormControl<string | null>(null, Validators.required),
          
             });

  ngOnInit() {
      this.form.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe();
      this.getEquipmentList();
  }
createEquipment() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const formValue = this.form.getRawValue();
  const req: Equipmentmoreinformation = {
    EquipmentId: formValue.EquipmentId!,
    KeyName: formValue.KeyName!,
    KeyValue: formValue.KeyValue!,
   
  };

  this._moreinformation.createEquipmentInformation(req)
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: res => {
  this.data = res;
   this._toastr.success(this.translat.instant('Equipment created successfully'));
  setTimeout(() => this._router.navigate(['/equipment/equipmentmoreinformation']), 1500);
},

      error: err => {
        console.error('Equipment create error:', err);
        this._toastr.error(this.translat.instant(err.error?.title || err.message));
      }
    });
}
 getEquipmentList()
  { this._equipment.EquipmentLookup()
    .pipe(takeUntilDestroyed(this._destroyRef))
    
  .subscribe({ next: res => this.EquipmentList = res, error: err => this.errorMessage = err.message }); 
  
}
 isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control.touched;
  }
}
