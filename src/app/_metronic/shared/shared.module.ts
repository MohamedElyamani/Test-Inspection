import {forwardRef, NgModule} from '@angular/core';
import {KeeniconComponent} from './keenicon/keenicon.component';
import {CommonModule} from "@angular/common";
import { ToastModule } from 'primeng/toast';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';


import {  TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { PaginatorModule } from 'primeng/paginator';
import { TagModule } from 'primeng/tag';
import { MultiSelectModule } from 'primeng/multiselect';
import { DataListComponent } from './components/data-list/data-list.component';
import { ActionBtnsComponent } from './components/action-btns/action-btns.component';
import { SubmitBtnsComponent } from './components/submit-btns/submit-btns.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BreadcrumpComponent } from './components/breadcrump/breadcrump.component';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import {  AutoCompleteModule } from 'primeng/autocomplete';
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { CheckboxModule } from 'primeng/checkbox';
@NgModule({
  declarations: [
    KeeniconComponent,
    DataListComponent,
    ActionBtnsComponent,
    SubmitBtnsComponent,
    BreadcrumpComponent,
    AutoCompleteComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    FormsModule,
    TableModule,
    MessageModule,
    DatePickerModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    TooltipModule,
    PaginatorModule,
    TagModule,
    MultiSelectModule,
    ToastModule,
    ConfirmDialogModule,
    BreadcrumbModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    AutoCompleteModule,
    CheckboxModule
  ],
  exports: [
    KeeniconComponent,
    BreadcrumpComponent,
    FormsModule,
    BreadcrumbModule,
    DataListComponent,
    ActionBtnsComponent,
    SubmitBtnsComponent,
    ReactiveFormsModule,
    TranslateModule,
    AutoCompleteComponent,
    DeleteDialogComponent,  
    TableModule,
    MessageModule,
    DatePickerModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    TooltipModule,
    PaginatorModule,
    TagModule,
    MultiSelectModule,
    ToastModule,
    ConfirmDialogModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    AutoCompleteModule,
    CheckboxModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutoCompleteComponent),
      multi: true,
    },
    ConfirmationService,
    MessageService
  ]
})
export class SharedModule {}
//m

