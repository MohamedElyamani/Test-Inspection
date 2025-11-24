import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppCVListComponent } from './ApplicantCV/components/appCV-list/appCV-list.component';
import { AppCVAddComponent } from './ApplicantCV/components/appCV-add/appCV-add.component';
import { AppCVEditComponent } from './ApplicantCV/components/appCV-edit/appCV-edit.component';
import { DepartmentListComponent } from './Department/components/department-list/department-list.component';
import { DepartmentAddComponent } from './Department/components/department-add/department-add.component';
import { DepartmentEditComponent } from './Department/components/department-edit/department-edit.component';
import { EmployeeListComponent } from './Employee/components/employee-list/employee-list.component';
import { EmployeeAddComponent } from './Employee/components/employee-add/employee-add.component';
import { EmployeeEditComponent } from './Employee/components/employee-edit/employee-edit.component';
import { InterviewEvaluationListComponent } from './Interview Evaluation/components/interviewEvaluation-list/interviewEvaluation-list.component';
import { InterviewEvaluationAddComponent } from './Interview Evaluation/components/interviewEvaluation-add/interviewEvaluation-add.component';
import { InterviewEvaluationEditComponent } from './Interview Evaluation/components/interviewEvaluation-edit/interviewEvaluation-edit.component';
import { JobAdvertisementListComponent } from './Job Advertisement/components/jobAdvertisement-list/jobAdvertisement-list.component';
import { JobAdvertisementAddComponent } from './Job Advertisement/components/jobAdvertisement-add/jobAdvertisement-add.component';
import { JobAdvertisementEditComponent } from './Job Advertisement/components/jobAdvertisement-edit/jobAdvertisement-edit.component';
import { JobOfferNegotiationListComponent } from './Job Offer Negotiation/components/jobOfferNegotiation-list/jobOfferNegotiation-list.component';
import { JobOfferNegotiationAddComponent } from './Job Offer Negotiation/components/jobOfferNegotiation-add/jobOfferNegotiation-add.component';
import { JobOfferNegotiationEditComponent } from './Job Offer Negotiation/components/jobOfferNegotiation-edit/jobOfferNegotiation-edit.component';
import { JobRequestListComponent } from './Job Request/components/jobRequest-list/jobRequest-list.component';
import { JobRequestAddComponent } from './Job Request/components/jobRequest-add/jobRequest-add.component';
import { JobRequestEditComponent } from './Job Request/components/jobRequest-edit/jobRequest-edit.component';
import { JobTitleListComponent } from './Job Title/components/jobTitle-list/jobTitle-list.component';
import { JobTitleAddComponent } from './Job Title/components/jobTitle-add/jobTitle-add.component';
import { JobTitleEditComponent } from './Job Title/components/jobTitle-edit/jobTitle-edit.component';
import { TrainingProgramListComponent } from './Training Program/components/trainingProgram-list/trainingProgram-list.component';
import { TrainingProgramAddComponent } from './Training Program/components/trainingProgram-add/trainingProgram-add.component';
import { TrainingProgramEditComponent } from './Training Program/components/trainingProgram-edit/trainingProgram-edit.component';
import { TrainingSessionAttendanceListComponent } from './Training Session Attendance/components/trainingSessionAttendance-list/trainingSessionAttendance-list.component';
import { TrainingSessionAttendanceAddComponent } from './Training Session Attendance/components/trainingSessionAttendance-add/trainingSessionAttendance-add.component';
import { TrainingSessionAttendanceEditComponent } from './Training Session Attendance/components/trainingSessionAttendance-edit/trainingSessionAttendance-edit.component';

const routes: Routes = [
  //========= ApplicationCv =========
  {path:'application-cv', component:AppCVListComponent},
  {path:'application-cv/add', component:AppCVAddComponent},
  {path:'application-cv/edit/:id', component:AppCVEditComponent},
  //========= Department =========
  {path:'department', component:DepartmentListComponent},
  {path:'department/add', component:DepartmentAddComponent},
  {path:'department/edit/:id', component:DepartmentEditComponent},
  //========= Employee =========
  {path:'employee', component:EmployeeListComponent},
  {path:'employee/add', component:EmployeeAddComponent},
  {path:'employee/edit/:id', component:EmployeeEditComponent},
  //========= InterviewEvaluation =========
  {path:'interview-evaluation', component:InterviewEvaluationListComponent},
  {path:'interview-evaluation/add', component:InterviewEvaluationAddComponent},
  {path:'interview-evaluation/edit/:id', component:InterviewEvaluationEditComponent},
  //========= job advertisement =========
  {path:'job-advertisement', component:JobAdvertisementListComponent},
  {path:'job-advertisement/add', component:JobAdvertisementAddComponent},
  {path:'job-advertisement/edit/:id', component:JobAdvertisementEditComponent},
  //========= job offer =========
  {path:'job-offer', component:JobOfferNegotiationListComponent},
  {path:'job-offer/add', component:JobOfferNegotiationAddComponent},
  {path:'job-offer/edit/:id', component:JobOfferNegotiationEditComponent},
  //========= job request =========
  {path:'job-request', component:JobRequestListComponent},
  {path:'job-request/add', component:JobRequestAddComponent},
  {path:'job-request/edit/:id', component:JobRequestEditComponent},
  //========= job title ==========
  {path:'job-title', component:JobTitleListComponent},
  {path:'job-title/add', component:JobTitleAddComponent},
  {path:'job-title/edit/:id', component:JobTitleEditComponent},
  //========= training program =========
  {path:'training-program', component:TrainingProgramListComponent},
  {path:'training-program/add', component:TrainingProgramAddComponent},
  {path:'training-program/edit/:id', component:TrainingProgramEditComponent},
  //========= training session =========
  {path:'training-session-attendance', component:TrainingSessionAttendanceListComponent},
  {path:'training-session-attendance/add', component:TrainingSessionAttendanceAddComponent},
  {path:'training-session-attendance/edit/:id', component:TrainingSessionAttendanceEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }
