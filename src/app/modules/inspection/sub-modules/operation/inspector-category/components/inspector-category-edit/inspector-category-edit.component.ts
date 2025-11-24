import { Component, DestroyRef, OnInit } from '@angular/core';
import { InspectorCategory } from '../../interface/inspectorCategory';
import { InspectorCategoryService } from '../../service/inspector-category.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-inspector-category-edit',
  templateUrl: './inspector-category-edit.component.html',
  styleUrls: ['./inspector-category-edit.component.css']
})
export class InspectorCategoryEditComponent implements OnInit {
 data : InspectorCategory;
  errorMessage : string = '';
  inspectCategId : number;
// form controls
  form = new FormGroup({
    Name: new FormControl('', [Validators.required]),
  });

  constructor(private _inspectCategService: InspectorCategoryService, private _toastr: ToastrService,private _destroyRef: DestroyRef,
    private _activateRoute: ActivatedRoute , private _router: Router, 
    private _location: Location ,  private translat: TranslateService) { }

  ngOnInit() {
    this.inspectCategId = Number(this._activateRoute.snapshot.paramMap.get('id') || '');
        if (this.inspectCategId) {
          this.inspectorCategoryById(this.inspectCategId);
        }
        this.form.valueChanges
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe();
  }
inspectorCategoryById(id: number) {
  this._inspectCategService.getInspectorCategoryById(id)
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


  updateInspectCategory() {
    if (this.form.valid) {
      const req: InspectorCategory = {
        Id : this.inspectCategId,
        Name: this.form.value.Name || '',
      };
      this._inspectCategService.updateInspectorCategory(this.inspectCategId ,req)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe({ next: (res) => {
            this.data = res;
            this.form.reset({
              Name: '',
            });
            
              this._toastr.success(this.translat.instant('Inspector Category Updated successfully'));
              setTimeout(() => this._router.navigate(['inspection/operation/inspector-category']), 1500);
          },
          error: (err) => {
            this.errorMessage = err.message;
            this._toastr.error(this.translat.instant('Failed to update Inspector Category'));
          }
        
        })
    }
  }
isInvalid(controlName: string) {
        const control = this.form.get(controlName);
        return control?.invalid && (control.touched);
}

  navigateToCreate() {
    this._router.navigate(['../../add'], { relativeTo: this._activateRoute });
  }
}
