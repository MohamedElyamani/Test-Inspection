import { Component, DestroyRef, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { InspectorService } from '../../service/inspector.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Inspector } from '../../interface/inspector';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { inspectorcategoryLookUP } from '../../../inspector-category/interface/inspectorCategory';
import { InspectorCategoryService } from '../../../inspector-category/service/inspector-category.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-inspector-add',
  templateUrl: './inspector-add.component.html',
  styleUrls: ['./inspector-add.component.css']
})
export class InspectorAddComponent implements OnInit {

   data : Inspector;
   errorMessage : string = '';
     inspectorLookUP: inspectorcategoryLookUP[];
   // form controls
   form = new FormGroup({
     Name: new FormControl('', [Validators.required]),
     InspectorCategoryId: new FormControl(null, [Validators.required]),
   });

   constructor(private _inspectorService: InspectorService, private _toastr: ToastrService,private _destroyRef: DestroyRef , private _inspectorcateg : InspectorCategoryService ,     private _router: Router
      , private translat: TranslateService
   ) { }
 
   ngOnInit() {
     this.form.valueChanges
       .pipe(takeUntilDestroyed(this._destroyRef))
       .subscribe();
       this.getInspectorCategoryList();
   }
   createInspector() {
     if (this.form.valid) {
       const req: Inspector = {
      Name: this.form.value.Name!,
        InspectorCategoryId: this.form.value.InspectorCategoryId!,

       };
       this._inspectorService.createInspector(req)
         .pipe(takeUntilDestroyed(this._destroyRef))
         .subscribe({
           next: (res) => {
             this.data = res;
             this.form.reset();
             this._toastr.success(this.translat.instant("Inspector  created successfully"));
               setTimeout(() => {
        this._router.navigate(['/inspection/operation/inspector']);
      }, 1500);
           },
           error: (err) => {
             this.errorMessage = err.message;
             this._toastr.error(this.translat.instant("Failed to create Inspector "));
           }
         });
     }
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

 isInvalid(controlName: string) {
         const control = this.form.get(controlName);
         return control?.invalid && (control.touched);
 }

}
