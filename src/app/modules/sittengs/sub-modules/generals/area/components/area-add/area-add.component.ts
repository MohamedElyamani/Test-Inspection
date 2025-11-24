import { Component, DestroyRef, OnInit } from '@angular/core';
import { Area } from '../../interface/area';
import { AreaService } from '../../service/area.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-add',
  templateUrl: './area-add.component.html',
  styleUrls: ['./area-add.component.css']
})
export class AreaAddComponent implements OnInit {
  data : Area;
  errorMessage : string = '';
  // form controls
  form = new FormGroup({
    Name: new FormControl('', [Validators.required]),
  });
  constructor(private _areaService: AreaService, private _toastr: ToastrService,private _destroyRef: DestroyRef, private translat: TranslateService , private _router: Router) { }

  ngOnInit() {
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }
  createArea() {
    if (this.form.valid) {
      const req: Area = {
        Name: this.form.value.Name || '',
      };
      this._areaService.createArea(req)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe({
          next: (res) => {
            this.data = res;
            this.form.reset();
            this._toastr.success(this.translat.instant("Area created successfully"));
                 setTimeout(() => this._router.navigate(['/customer//general/setting/area']), 1500);
          },
          error: (err) => {
            this.errorMessage = err.message;
            this._toastr.error("Failed to create area");
          }
        });
    }
  }
isInvalid(controlName: string) {
        const control = this.form.get(controlName);
        return control?.invalid && (control.touched);
}
}
