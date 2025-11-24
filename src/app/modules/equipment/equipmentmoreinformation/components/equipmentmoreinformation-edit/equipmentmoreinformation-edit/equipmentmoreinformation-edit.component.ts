import { Component, DestroyRef, OnInit } from '@angular/core';
import { Equipmentmoreinformation } from '../../../interface/equipmentmoreinformation';
import { EquipmentLookup } from 'src/app/modules/equipment/equipment/interface/equipment';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SeriesService } from 'src/app/modules/sittengs/sub-modules/generals/series/service/series.service';
import { EquipmentService } from 'src/app/modules/equipment/equipment/services/equipment.service';
import { EquipmentmoreinformationService } from '../../../service/equipmentmoreinformation.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-equipmentmoreinformation-edit',
  templateUrl: './equipmentmoreinformation-edit.component.html',
  styleUrls: ['./equipmentmoreinformation-edit.component.css']
})
export class EquipmentmoreinformationEditComponent implements OnInit {

data!: Equipmentmoreinformation;
  errorMessage = '';
   EquipmentList: EquipmentLookup[] = [];
  Id: number;
  constructor(    
           private _toastr: ToastrService,
           private _destroyRef: DestroyRef,
           private _router: Router,
           private translat: TranslateService,
           private _seriesService : SeriesService,
           private  _equipment : EquipmentService,
           private _moreinformation : EquipmentmoreinformationService,
           private _activateRoute : ActivatedRoute
           ) { }
              form = new FormGroup({
                          EquipmentId: new FormControl<number | null>(null, [Validators.required]),
                          KeyName: new FormControl<string | null>(null, Validators.required),
                          KeyValue: new FormControl<string | null>(null, Validators.required),
                     
                        });

  ngOnInit() {
     this.form.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe();
       
        this.Id = Number(this._activateRoute.snapshot.paramMap.get('id'));
  if (this.Id) {
    this.EquipmentById(this.Id);
    this.getEquipmentList(); // ✅ Only load record, do NOT call getSeries()
  }
  }
UpdateEquipment() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const formValue = this.form.getRawValue();

  const req: Equipmentmoreinformation = {
     Id: this.Id,
    EquipmentId: formValue.EquipmentId!,
    KeyName: formValue.KeyName!,
    KeyValue: formValue.KeyValue!,
  };

  this._moreinformation.updateEquipmentInformation(this.Id, req)
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: res => {
        this.data = res;
     this._toastr.success(this.translat.instant('Equipment Updated successfully'));
        setTimeout(() => this._router.navigate(['/equipment/equipmentmoreinformation']), 1500);
      },
      error: err => {
        console.error('Update error:', err);
        this._toastr.error(this.translat.instant(err.error?.title || err.message));
      }
    });
}

  EquipmentById(id: number) {
    this._moreinformation.getEquipmentInformationById(id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res: Equipmentmoreinformation) => {
  
        
  
          this.form.patchValue({
           
              EquipmentId: res.EquipmentId!,
             KeyName: res.KeyName!,
             KeyValue: res.KeyValue!,
            
          });

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
