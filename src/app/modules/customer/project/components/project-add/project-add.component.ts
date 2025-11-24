import { Component, DestroyRef, OnInit } from '@angular/core';
import { Project } from '../../interface/project';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../service/project.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { companyLookup } from '../../../company/interface/company';
import { customerLookup } from '../../../customer-setub/interface/customerSetub';
import { CompanyService } from '../../../company/service/company.service';
import { CustomerSetubService } from '../../../customer-setub/service/customerSetub.service';
import { locationLookup } from '../../../location/interface/customerLocation';
import { LocationService } from '../../../location/service/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {

 data : Project;
   errorMessage : string = '';
   companyList : companyLookup[];
   customerList : customerLookup[];
  LocationList : locationLookup[];
 
   // form controls
   form = new FormGroup({
   Name: new FormControl('',[Validators.required]),
   CustomerId: new FormControl(null, [Validators.required]),
   CompanyId: new FormControl(null, [Validators.required]),
   LocationId: new FormControl(null, [Validators.required]),
    ProjectDate : new FormControl(new Date()),
 });
   constructor(private _projectService: ProjectService,private _toastr: ToastrService,private _destroyRef: DestroyRef,
     private translat: TranslateService,private _companyService: CompanyService, private _customerService: CustomerSetubService
     , private _locationService : LocationService , private _router: Router,
   ) { }
 
   ngOnInit() {
      this.form.valueChanges
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe();
        this.getCompanyList();
         this.getCustomerList();
         this.getLocationList();
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
createProject() {
  if (this.form.valid) {
    const raw = this.form.getRawValue();
    const req: Project = {
      Name: raw.Name!,
      CustomerId: raw.CustomerId!,
      CompanyId: raw.CompanyId!,
      LocationId: raw.LocationId!,
      ProjectDate: raw.ProjectDate
      ? raw.ProjectDate
      : new Date()
     
    };

    this._projectService.createProject(req)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.data = res;
          this.form.reset();
            this._toastr.success(this.translat.instant('Project Created successfully'));
              setTimeout(() => this._router.navigate(['/customer/project']), 1500);
        },
        error: (err) => {
          this.errorMessage = err.message;
             this._toastr.success(this.translat.instant('Failed to Create project: ' + this.errorMessage));
        },
      });
  } else {
   this._toastr.success(this.translat.instant('Please fill in all required fields before saving.'));
  }
}

 isInvalid(controlName: string) {
         const control = this.form.get(controlName);
         return control?.invalid && (control.touched);
 }
}
