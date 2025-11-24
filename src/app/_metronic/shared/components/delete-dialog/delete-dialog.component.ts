import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialog } from "primeng/confirmdialog";
import { SharedModule } from "../../shared.module";

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',


  
})
export class DeleteDialogComponent {
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onDeleteConfirmed: EventEmitter<void> = new EventEmitter();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onDeleteCancelled: EventEmitter<void> = new EventEmitter();

  constructor(private confirmationService: ConfirmationService) { }

  // Method to show the confirmation dialog
  confirmDelete(message: string, header: string) {
    this.confirmationService.confirm({
      message: message,
      header: header,
      icon: 'pi pi-info-circle',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      acceptButtonStyleClass: 'p-button-danger mx-5 btn btn-sm btn-danger',
      rejectButtonStyleClass: 'p-button-secondary btn btn-sm btn-secondary',
      accept: () => {
        this.onDeleteConfirmed.emit(); // Emit delete confirmed
      },
      reject: () => {
        this.onDeleteCancelled.emit(); // Emit delete cancelled
      }
    });
  }
}
//k
