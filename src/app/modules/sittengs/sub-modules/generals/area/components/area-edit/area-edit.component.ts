import { Component, DestroyRef, OnInit } from '@angular/core';
import { Area } from '../../interface/area';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AreaService } from '../../service/area.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-area-edit',
  templateUrl: './area-edit.component.html',
  styleUrls: ['./area-edit.component.css']
})
export class AreaEditComponent implements OnInit {
data : Area;
  errorMessage : string = '';
  areaId : number;
// form controls
  form = new FormGroup({
    Name: new FormControl('', [Validators.required]),
  });

  constructor(private _areaService: AreaService, private _toastr: ToastrService,private _destroyRef: DestroyRef,
    private _activateRoute: ActivatedRoute , private _router: Router, 
    private _location: Location ,private translat: TranslateService ) { }

  ngOnInit() {
    this.areaId = Number(this._activateRoute.snapshot.paramMap.get('id') || '');
        if (this.areaId) {
          this.areaById(this.areaId);
        }
        this.form.valueChanges
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe();
  }
areaById(id: number) {
  this._areaService.getAreaById(id)
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: (res) => {
        this.data = res;
        this.form.patchValue({
          Name: this.data.Name,
        });
      },
      error: (err) => {
        this.errorMessage = err.message;
        this._toastr.error(this.errorMessage);
      }
    });
  }


  updateArea() {
    if (this.form.valid) {
      const req: Area = {
        Id : this.areaId,
        Name: this.form.value.Name || '',
      };
      this._areaService.updateArea(this.areaId,req)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe({ next: (res) => {
            this.data = res;
            this.form.reset();
            this.backAfterEdit();
            this._toastr.success(this.translat.instant("Area Updated successfully"));
                 setTimeout(() => this._router.navigate(['/customer//general/setting/area']), 1500);
          },
          error: (err) => {
            this.errorMessage = err.message;
            this._toastr.error(this.translat.instant("Failed to update Area"));
          }
        
        })
    }
  }
isInvalid(controlName: string) {
        const control = this.form.get(controlName);
        return control?.invalid && (control.touched);
}
backAfterEdit() {
 const url = this._location.path();

  // لو موجود كلمة "area" في المسار
  const index = url.indexOf('/area');
  
  if (index !== -1) {
    // خُذ كل ما قبل نهاية كلمة "area"
    const newUrl = url.substring(0, index + '/area'.length);
    this._router.navigate([newUrl]);
  } else {
    // fallback لو لأي سبب مفيش كلمة area
    this._router.navigate(['/']);
  }
  }
  navigateToCreate() {
    this._router.navigate(['../../add'], { relativeTo: this._activateRoute });
  }
}
