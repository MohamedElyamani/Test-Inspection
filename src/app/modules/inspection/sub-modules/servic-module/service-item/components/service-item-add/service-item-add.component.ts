import { Component, DestroyRef, OnInit } from '@angular/core';
import { ServiceItem } from '../../interface/serviceItem';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceItemService } from '../../service/serviceItem.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SeriesService } from 'src/app/modules/sittengs/sub-modules/generals/series/service/series.service';
import { SeriesForTables } from 'src/app/modules/sittengs/sub-modules/generals/series/interface/series';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-item-add',
  templateUrl: './service-item-add.component.html',
  styleUrls: ['./service-item-add.component.css']
})
export class ServiceItemAddComponent implements OnInit {
  data : ServiceItem;
  errorMessage : string = '';
  // form controls
  form = new FormGroup({
    Itemtitle: new FormControl('', [Validators.required]),
    Itemcode: new FormControl({ value: '', disabled: true }, [Validators.required]),
    Itemprice: new FormControl(0, [Validators.required]),
    series: new FormControl(''),
    SeriesNumber:new FormControl<string>('', Validators.required),
    SeriesCode:new FormControl<string>('', Validators.required),
    Separator:new FormControl<string>('', Validators.required)
  });
  constructor(private _serviceItemService: ServiceItemService, private _toastr: ToastrService,private _destroyRef: DestroyRef ,  private _seriesService : SeriesService
    , private translat: TranslateService ,private _router: Router,
  ) { }

  ngOnInit() {
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
      this.getSeriesData();
  }
  createSrviceItem() {
    if (this.form.valid) {
      const req: ServiceItem = {
        Itemtitle: this.form.value.Itemtitle || '',
        Itemcode: this.form.value.SeriesNumber!,
        Itemprice: this.form.value.Itemprice || 0,
        series: this.form.value.SeriesCode! + this.form.value.Separator! ,
      };
      this._serviceItemService.createServiceItem(req)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe({
          next: (res) => {
            this.data = res;
            this.form.reset();
            this._toastr.success(this.translat.instant('Service Item created successfully'));
             setTimeout(() => this._router.navigate(['inspection/service/service-item']), 1500);
          },
          error: (err) => {
            this.errorMessage = err.message;
            this._toastr.error(this.translat.instant('Failed to create Service Item' + this.errorMessage));
          }
        });
    }
  }
    getSeriesData(){
    this._seriesService.getSeriesInfoForTables('serviceItems', 'Itemcode', 'Services Item')
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res: SeriesForTables) => {
     
          this.form.patchValue(
            { 
              Itemcode: res.FinelSeriesCodeAndSeriesNumber ,
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
        return control?.invalid && (control.touched);
}
}
