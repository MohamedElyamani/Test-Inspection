import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificateRoutingModule } from './certificate-routing.module';
import { RouterModule } from '@angular/router';
import { NewCertifListComponent } from './new-certificate/components/new-certif-list/new-certif-list.component';
import { NewCertifAddComponent } from './new-certificate/components/new-certif-add/new-certif-add.component';
import { NewCertifEditComponent } from './new-certificate/components/new-certif-edit/new-certif-edit.component';
import { SharedModule } from "src/app/_metronic/shared/shared.module";


@NgModule({
  declarations: [
    //======== new certificate ===========
    NewCertifListComponent,
    NewCertifAddComponent,
    NewCertifEditComponent,
  ],
  imports: [
    CommonModule,
    CertificateRoutingModule,
    RouterModule,
    SharedModule
]
})
export class CertificateModule { }
