import { Component, DestroyRef, OnInit } from '@angular/core';
import { InspectorService } from '../../service/inspector.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Inspector } from '../../interface/inspector';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Location } from '@angular/common';
import { InspectorCategoryService } from '../../../inspector-category/service/inspector-category.service';
import { inspectorcategoryLookUP } from '../../../inspector-category/interface/inspectorCategory';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-inspector-edit',
  templateUrl: './inspector-edit.component.html',
  styleUrls: ['./inspector-edit.component.css']
})
export class InspectorEditComponent implements OnInit {
data : Inspector;
  errorMessage : string = '';
inspectorId: number;
   inspectorLookUP: inspectorcategoryLookUP[];
// form controls
  form = new FormGroup({
  Name: new FormControl('', [Validators.required]),
  InspectorCategoryId: new FormControl(0, [Validators.required]),

  });

  constructor(private _inspectorService: InspectorService, private _toastr: ToastrService,private _destroyRef: DestroyRef,
    private _activateRoute: ActivatedRoute , private _router: Router, 
    private _location: Location , private _inspectorcateg : InspectorCategoryService , private translat: TranslateService,) { }

  ngOnInit() {
    this.inspectorId = Number(this._activateRoute.snapshot.paramMap.get('id') || '');
        if (this.inspectorId) {
          this.inspectorById(this.inspectorId);
           this.getInspectorCategoryList();
        }
        this.form.valueChanges
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe();
         
       //this.form.InspectorCategoryId = this.data.InspectorCategoryId
  }
inspectorById(id: number) {
  this._inspectorService.getInspectorById(id)
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: (res) => {
        this.data = res;
        this.form.patchValue({
           Name: this.data.Name,
          InspectorCategoryId: this.data.InspectorCategoryId,
        });
      },
      error: (err) => {
        this.errorMessage = err.message;
        this._toastr.error(this.errorMessage);
      }
    });
  }
  getInspectorCategoryList() {
    this._inspectorcateg
      .InspectorCategoryLookup()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => (this.inspectorLookUP = res),
        error: (err) => (this.errorMessage = err.message),
      });
  }

  updateInspector() {
    if (this.form.valid) {
      const req: Inspector = {
        Id: this.inspectorId,
        Name: this.form.value.Name || '',
        InspectorCategoryId: this.form.value.InspectorCategoryId!,
      };
      this._inspectorService.updateInspector(this.inspectorId ,req)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe({ next: (res) => {
            this.data = res;
            this.form.reset({
              Name: '',
            });
            this.backAfterEdit();
            this._toastr.success(this.translat.instant("Inspector  updated successfully"));
          },
          error: (err) => {
            this.errorMessage = err.message;
            this._toastr.error(this.translat.instant("Failed to update Inspector "));
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

 
  const index = url.indexOf('/inspector');
  
  if (index !== -1) {
    // خُذ كل ما قبل نهاية كلمة "inspector-category"
    const newUrl = url.substring(0, index + '/inspector'.length);
    this._router.navigate([newUrl]);
  } else {
    // fallback لو لأي سبب مفيش كلمة inspector-category
    this._router.navigate(['/']);
  }
  }
  navigateToCreate() {
    this._router.navigate(['../../add'], { relativeTo: this._activateRoute });
  }

}
