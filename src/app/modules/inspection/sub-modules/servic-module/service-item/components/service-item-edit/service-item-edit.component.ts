import { ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ServiceItem } from '../../interface/serviceItem';
import { ServiceItemService } from '../../service/serviceItem.service';
import { SeriesService } from 'src/app/modules/sittengs/sub-modules/generals/series/service/series.service';
import { SeriesForTables } from 'src/app/modules/sittengs/sub-modules/generals/series/interface/series';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-service-item-edit',
  templateUrl: './service-item-edit.component.html',
  styleUrls: ['./service-item-edit.component.css']
})
export class ServiceItemEditComponent implements OnInit {
  data!: ServiceItem;
  errorMessage = '';
  serviceId!: number;
  seriesNumber!: string;
  separator!: string;

  form = new FormGroup({
    Id: new FormControl<number | null>(null),
    Itemtitle: new FormControl('', [Validators.required]),
    Itemcode: new FormControl({ value: '', disabled: true }, [Validators.required]),
    Itemprice: new FormControl(0, [Validators.required]),
    series: new FormControl(''),
    SeriesNumber: new FormControl<string>('', Validators.required),
    SeriesCode: new FormControl<string>('', Validators.required),
    Separator: new FormControl<string>('', Validators.required)
  });

  constructor(
    private _serviceItemService: ServiceItemService,
    private _toastr: ToastrService,
    private _destroyRef: DestroyRef,
    private _activateRoute: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private _seriesService: SeriesService,
     private cdr: ChangeDetectorRef,
      private translat: TranslateService
  ) {}

  ngOnInit() {
    this.form.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
    this.cdr.detectChanges();
  });
  this.serviceId = Number(this._activateRoute.snapshot.paramMap.get('id'));
  if (this.serviceId) {
    this.serviceById(this.serviceId); // ✅ Only load record, do NOT call getSeries()
  }


    // Optional: form reactivity
    this.form.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe();
  }

  /** 🔹 Fetch Service Item by ID */
  serviceById(id: number) {
    this._serviceItemService.getServiceItemById(id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res : ServiceItem) => {
          console.log(res.Itemcode)
          const finalNumber = res.series + res.Itemcode; // e.g. "SI-2025-0012"

          // Extract series code & separator
          const match = res.series.match(/^(.+?)(.)$/);
          const seriesCode = match ? match[1] : '';
          const separator = match ? match[2] : '';
          const seriesNumber = res.Itemcode;
          this.form.patchValue({
            Id: res.Id!,
            Itemcode: finalNumber,
            SeriesCode: seriesCode,
            Separator: separator,
            SeriesNumber: seriesNumber,
            Itemtitle: res.Itemtitle,
            Itemprice: res.Itemprice
          });
          
        },
        error: (err) => {
          this.errorMessage = err.message;
          this._toastr.error(this.errorMessage || 'Failed to load Service Item');
        }
      });
  }

  /** 🔹 Get next available Series Code (for creating new items only) */


  /** 🔹 Update existing Service Item */
  updateServiceItem() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();

    const req: ServiceItem = {
      Id: this.serviceId,
      Itemtitle: formValue.Itemtitle!,
      Itemcode: formValue.SeriesNumber!, // only the number part
      Itemprice: formValue.Itemprice!,
      series: formValue.SeriesCode! + formValue.Separator! // e.g. "SI-"
    };

    this._serviceItemService.updateServiceItem(this.serviceId, req)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this._toastr.success(this.translat.instant('Service Item updated successfully'));
           setTimeout(() => this._router.navigate(['inspection/service/service-item']), 1500);
          this.data = res;
         
        },
        error: (err) => {
          this.errorMessage = err.message;
          this._toastr.error(this.translat.instant('Failed to update Service Item'));
        }
      });
  }

  /** 🔹 Field validation helper */
  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control.touched;
  }

 
}
