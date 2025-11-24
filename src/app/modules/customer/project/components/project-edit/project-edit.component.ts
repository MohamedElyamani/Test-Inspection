import { Component, DestroyRef, OnInit } from '@angular/core';
import {  Project } from '../../interface/project';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProjectService } from '../../service/project.service';
import { companyLookup } from '../../../company/interface/company';
import { customerLookup } from '../../../customer-setub/interface/customerSetub';
import { CompanyService } from '../../../company/service/company.service';
import { CustomerSetubService } from '../../../customer-setub/service/customerSetub.service';
import { locationLookup } from '../../../location/interface/customerLocation';
import { LocationService } from '../../../location/service/location.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

 data : Project;
  errorMessage : string = '';
  projectId : number;
 companyList : companyLookup[];
   customerList : customerLookup[];
  LocationList : locationLookup[];


  // form controls
  form = new FormGroup({
  Name: new FormControl('',[Validators.required]),
  CustomerId: new FormControl(0, [Validators.required]),
  CompanyId: new FormControl(0, [Validators.required]),
  LocationId: new FormControl(0, [Validators.required]),
  ProjectDate : new FormControl(new Date(), [Validators.required]),
});
  constructor(private _ProjectService: ProjectService,private _toastr: ToastrService,private _destroyRef: DestroyRef,
    private translat: TranslateService,private _activateRoute: ActivatedRoute , private _router: Router, 
    private _location: Location, private _companyService: CompanyService, private _customerService: CustomerSetubService ,
    private _locationService : LocationService
  ) { }

  ngOnInit() {
    this.projectId = Number(this._activateRoute.snapshot.paramMap.get('id') || '');
    if (this.projectId) {
      this.getProjectById(this.projectId);
      this.getCompanyList();
        this.getCustomerList();
        this.getLocationList();
    }
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }

getCompanyList() {
  this._companyService.getCompanyLookUp()
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: (res) => {
        this.companyList = res;
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
}
getCustomerList() {
  this._customerService.getCustomerLookUp()
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe({
      next: (res) => {
        this.customerList = res;
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
}
getProjectById(id: number) {
  this._ProjectService.getProjectById(id).subscribe({
    next: (res: Project) => {
      this.data = res;
      this.form.patchValue({
        Name: res.Name,
       CustomerId: this.data.CustomerId,
      CompanyId: this.data.CompanyId!,
      LocationId: this.data.LocationId!,
       ProjectDate: this.data.ProjectDate
      ? this.data.ProjectDate
      : new Date()
        
      });
    },
    error: (err: any) => {
      this.errorMessage = err.message;
    }
  });
}
  getLocationList() {
   this._locationService.getLocationLookUp()
     .pipe(takeUntilDestroyed(this._destroyRef))
     .subscribe({
      
       next: (res) => {
         this.LocationList = res;
       },
       error: (err) => {
         this.errorMessage = err.message;
       }
     });
 }
updateProject() {
  if (this.form.valid && this.projectId) {
    console.log(this.form)
    const req: Project = {
      Id: this.projectId,
      Name: this.form.value.Name!,
      CustomerId: this.form.value.CustomerId!,
      CompanyId: this.form.value.CompanyId!,
      LocationId: this.form.value.LocationId!,
      ProjectDate: this.form.value.ProjectDate
      ? this.form.value.ProjectDate
      : new Date()
    }
    this._ProjectService.updateProject(this.projectId , req)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res: Project) => {
          this.data = res;
           this._toastr.success(this.translat.instant('Project updated successfully'));
            setTimeout(() => this._router.navigate(['/customer/project']), 1500);
        
        },
        error: (err) => {
          this.errorMessage = err.message;
         this._toastr.success(this.translat.instant('Failed to update project: ' + this.errorMessage));
  
        }
      });
  } else {
      this._toastr.success(this.translat.instant('Please fill in all required fields before saving.'));
       
  }
}



isInvalid(controlName: string) {
        const control = this.form.get(controlName);
        return control?.invalid && (control.touched);
}
backAfterEdit() {
 const url = this._location.path();

  // لو موجود كلمة "location" في المسار
  const index = url.indexOf('/Project');
  
  if (index !== -1) {
    // خُذ كل ما قبل نهاية كلمة "location"
    const newUrl = url.substring(0, index + '/Project'.length);
    this._router.navigate([newUrl]);
  } else {
    // fallback لو لأي سبب مفيش كلمة location
    this._router.navigate(['/']);
  }
  }
  navigateToCreate() {
    this._router.navigate(['../../add'], { relativeTo: this._activateRoute });
  }

}
