import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LocalizationRoutingModule } from './localization-routing-module';
import { LocalizationComponent } from './localization/localization.component';

// PrimeNG
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
// Shared Module
import { SharedModule } from 'src/app/_metronic/shared/shared.module';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  providers: [ConfirmationService],
  declarations: [LocalizationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LocalizationRoutingModule,
    SharedModule,

    // PrimeNG
    TableModule,
    DropdownModule,
    DialogModule,
    CheckboxModule,
    BreadcrumbModule,
    InputTextModule,
    ButtonModule,
    MatDialogModule,
    MatButtonModule,
    ConfirmDialogModule,
  ]
})
export class LocalizationModule { }
//y

