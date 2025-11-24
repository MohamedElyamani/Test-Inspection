import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrRoutingModule } from './hr-routing.module';
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
import { SharedModule } from 'src/app/_metronic/shared/shared.module';


@NgModule({
  declarations: [
    //========= ApplicationCv =========
    AppCVListComponent,
    AppCVAddComponent,
    AppCVEditComponent,

    //========= Department =========
    DepartmentListComponent,
    DepartmentAddComponent,
    DepartmentEditComponent,

    //========= Employee =========
    EmployeeListComponent,
    EmployeeAddComponent,
    EmployeeEditComponent,

    //========= interview Evaluation =========
    InterviewEvaluationListComponent,
    InterviewEvaluationAddComponent,
    InterviewEvaluationEditComponent,

    //========= job advertisement =========
    JobAdvertisementListComponent,
    JobAdvertisementAddComponent,
    JobAdvertisementEditComponent,

    //========= job offer negotiation =========
    JobOfferNegotiationListComponent,
    JobOfferNegotiationAddComponent,
    JobOfferNegotiationEditComponent,

    //========= job request =========
    JobRequestListComponent,
    JobRequestAddComponent,
    JobRequestEditComponent,

    //========= job title ==========
    JobTitleListComponent,
    JobTitleAddComponent,
    JobTitleEditComponent,

    //========= training program =========
    TrainingProgramListComponent,
    TrainingProgramAddComponent,
    TrainingProgramEditComponent,

    //========= training session =========
    TrainingSessionAttendanceListComponent,
    TrainingSessionAttendanceAddComponent,
    TrainingSessionAttendanceEditComponent
  ],
  imports: [
    CommonModule,
    HrRoutingModule,
    SharedModule
  ]
})
export class HrModule { }
