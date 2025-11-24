import { ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { serviceLookUP, ServiceType  } from '../../interface/serviceType';
import { ServiceTypeService } from '../../service/serviceType.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-service-type-edit',
  templateUrl: './service-type-edit.component.html',
  styleUrls: ['./service-type-edit.component.css']
})
export class ServiceTypeEditComponent implements OnInit {

 dataSource: ServiceType[] = [];
  selectedRow: any[] = [];
  id!: number;
  data!: ServiceType;
  errorMessage = '';
  ServiceLookUP: serviceLookUP[] = [];

  form = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    Description: new FormControl('', [Validators.required]),
  });

  constructor(private _serviceTypeService: ServiceTypeService ,private cd: ChangeDetectorRef,
      private _router : Router, private _activateRoute: ActivatedRoute, private _toastr: ToastrService , private _destroyRef: DestroyRef,private _location: Location ,  private translate : TranslateService,) { }

  ngOnInit() {
      this.id = Number(this._activateRoute.snapshot.paramMap.get('id') || '');
        if (this.id) {
          this.getServiceTypeId(this.id);
         this.getServiceList();
        
        }
        this.form.valueChanges
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe();
      }
  getServiceList() {
    this._serviceTypeService.serviceTypeLookup()
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
     next: (res) => {
       this.ServiceLookUP = res;
      },
      error: (err) => {
       this.errorMessage = err.message;
     }
    });
 }


      
  getServiceTypeId(id: number) {
     this._serviceTypeService.getServiceTypeId(id).subscribe({
        next: (res: ServiceType) => {
          this.data = res;
          this.form.patchValue({
              Name: res.Name,
          Description: res.Description,
       
          });
        },
        error: (err: any) => {
          this.errorMessage = err.message;
        }
      });
  }
  updateService() {
 if (this.form.valid && this.id) {
    console.log(this.form)
    const req: ServiceType = {
       Id: this.id,
        Name: this.form.value.Name!,
        Description: this.form.value.Description!,
    }
    this._serviceTypeService.updateService(this.id , req)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res: ServiceType) => {
          this.data = res;
           this._toastr.success(this.translate.instant('Type updated successfully'));
         setTimeout(() => this._router.navigate(['inspection/service/service-type']), 1500);
       
        },
        error: (err) => {
          this.errorMessage = err.message;
         this._toastr.success(this.translate.instant('Failed to update Type: ' + this.errorMessage));
 
        }
      });
  } else {
      this._toastr.success(this.translate.instant('Please fill in all required fields before saving.'));
       
  }
}




isInvalid(controlName: string) {
        const control = this.form.get(controlName);
        return control?.invalid && (control.touched);
}
 navigateToCreate() {
    this._router.navigate(['../../add'], { relativeTo: this._activateRoute });
  }
backAfterEdit() {
  setTimeout(() => {
    this._router.navigate(['/inspection/service/service-type']);
  }, 1500);
}
}

