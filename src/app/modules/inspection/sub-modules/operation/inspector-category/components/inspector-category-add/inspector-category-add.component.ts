import { Component, DestroyRef, OnInit } from '@angular/core';
import { InspectorCategory } from '../../interface/inspectorCategory';
import { InspectorCategoryService } from '../../service/inspector-category.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inspector-category-add',
  templateUrl: './inspector-category-add.component.html',
  styleUrls: ['./inspector-category-add.component.css']
})
export class InspectorCategoryAddComponent implements OnInit {
  data : InspectorCategory;
  errorMessage : string = '';
  // form controls
  form = new FormGroup({
    Name: new FormControl('', [Validators.required]),
  });
  constructor(private _inspectCategService: InspectorCategoryService, private _toastr: ToastrService,private _destroyRef: DestroyRef
    , private _router: Router,  private translat: TranslateService
  ) { }

  ngOnInit() {
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }
  createInspectCategory() {
    if (this.form.valid) {
      const req: InspectorCategory = {
        Name: this.form.value.Name || '',
      };
      this._inspectCategService.createInspectorCategory(req)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe({
          next: (res) => {
            this.data = res;
            this.form.reset();
            this._toastr.success(this.translat.instant('Inspector Category created successfully'));
           setTimeout(() => this._router.navigate(['inspection/operation/inspector-category']), 1500);
            
          },
          error: (err) => {
            this.errorMessage = err.message;
            this._toastr.error(this.translat.instant('Failed to create Inspector Category'));
          }
        });
    }
  }
isInvalid(controlName: string) {
        const control = this.form.get(controlName);
        return control?.invalid && (control.touched);
}

}
