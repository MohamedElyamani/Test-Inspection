
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-action-btns',
  templateUrl: './action-btns.component.html',
  styleUrls: ['./action-btns.component.css']
})
export class ActionBtnsComponent {
  @Input() selectedRow: any[] = [];
  @Output() onDelete = new EventEmitter<any[]>();
  @Output() onAdd = new EventEmitter<void>();

  // علشان استخدمهم في اي مكان واتحكم انهي زرار يظهر فيهم
  @Input() showAdd: boolean = true;
  @Input() showDelete: boolean = true;
  @Input() showPrint: boolean = true;
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private translate : TranslateService
  ) {}

  get hasSelection(): boolean {
    return this.selectedRow && this.selectedRow.length > 0;
  }

  // navigateToCreate() {
  //   this.router.navigate(['add'], { relativeTo: this.activatedRoute });
  // }

  onAddClick(){
    this.onAdd.emit();
  }
  confirmDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.translate.instant('actions.message'),
      header: "Danger Zone",
      icon: 'pi pi-info-circle',
      rejectLabel: this.translate.instant('actions.rejectLabel'),
      rejectButtonProps: {
        label: this.translate.instant('actions.rejectLabel'),
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: this.translate.instant('actions.acceptButtonProps.label'),
        severity: 'danger',
      },
      accept: () => {
        if (this.selectedRow?.length) {
          const ids = this.selectedRow.map(x => x.Id);
          // Call the parent component's delete method
          this.onDelete.emit(ids);  // ابعت الـ id للـ parent
        }
        // this.messageService.add({ 
        //   severity: 'success', 
        //   summary: this.translate.instant('action.confirmDelete'), 
        //   detail:  this.translate.instant('action.confirmDelete')
        // });
      },
      reject: () => {
        this.messageService.add({ 
          severity: 'error', 
          summary: this.translate.instant('action.confirmReject'),
          detail: this.translate.instant('action.confirmReject') 
        });
      },
    });
  }
  print(){
    window.print();
  }
}