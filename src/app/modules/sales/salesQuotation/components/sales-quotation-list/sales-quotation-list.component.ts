import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  AfterViewInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataListComponent } from 'src/app/_metronic/shared/components/data-list/data-list.component';
import { SalesQuotationService } from '../../service/salesQuotation.service';
import { SalesQuotation } from '../../interface/salesQuotation';
import { finalize, forkJoin } from 'rxjs';
import { LocationService } from 'src/app/modules/customer/location/service/location.service';
import { locationLookup } from 'src/app/modules/customer/location/interface/customerLocation';
import { SeriesService } from 'src/app/modules/sittengs/sub-modules/generals/series/service/series.service';
import { SeriesForTables } from 'src/app/modules/sittengs/sub-modules/generals/series/interface/series';

@Component({
  selector: 'app-sales-quotation-list',
  templateUrl: './sales-quotation-list.component.html',
  styleUrls: ['./sales-quotation-list.component.css']
})
export class SalesQuotationListComponent implements OnInit, AfterViewInit {
  dataSource: SalesQuotation[] = [];
  selectedRow: any[] = [];
  LocationList: locationLookup[];
  seriesData: SeriesForTables;

  @ViewChild(DataListComponent) dataList!: DataListComponent;
  @ViewChild('statusTemplate', { static: true }) statusTemplate!: TemplateRef<any>;

  columnsSchema: any[] = [
    { key: `FinelSeriesCodeAndSeriesNumber`, label: 'Quotation No' },
    { key: 'CustomerName', label: 'Customer Name' },
    { key: 'LocationName', label: 'Location Name' },
    { key: 'ContactName', label: 'Contact Name' },
    { key: 'IssueDate', label: 'Issue Date' },
    { key: 'ExpireDate', label: 'Expire Date' },
    { key: 'ReferenceNumber', label: 'Reference No' },
    { key: 'PONumber', label: 'PO No' },
    { key: 'SalespersonId', label: 'Sales Person' },
    { key: 'VersionNumber', label: 'Version Number' },
    { key: 'CheckedBy', label: 'Checked By' },
    { key: 'BranchName', label: 'Branch Name' },
    { key: 'AreaName', label: 'Area Name' },
    { key: 'SubTotal', label: 'Sub Total' },
    { key: 'Discount', label: 'Discount' },
    { key: 'TaxValue', label: 'Tax Value' },
    { key: 'TotalAmount', label: 'Total Amount' },
    { key: 'CustomerNote', label: 'Customer Note' },
    { key: 'TermsAndConditions', label: 'Terms & Conditions' },
    { key: 'Status', label: 'Status' } // template assigned later
  ];

  showStatusDialog = false;
  selectedStatus: string;
  selectedOrder: any;

  statusOptions = [
    { label: 'Pending', value: 'Pending' },
    { label: 'Approved', value: 'Approved' },
    { label: 'Rejected', value: 'Rejected' },
    { label: 'Accepted', value: 'Accepted' }
  ];

  constructor(
    private _toastr: ToastrService,
    private _salesQuotationService: SalesQuotationService,
    private cd: ChangeDetectorRef,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _seriesService: SeriesService,
    private _locationService: LocationService
  ) {}

  ngOnInit() {
    this.salesQuotationList();
  }

  ngAfterViewInit() {
    const statusCol = this.columnsSchema.find(c => c.key === 'Status');
    if (statusCol) statusCol.template = this.statusTemplate;
    this.cd.detectChanges();
  }

  salesQuotationList() {
    this._salesQuotationService.getSalesQuotationList().subscribe({
      next: res => {
        this.dataSource = res.map(items => ({
          ...items,
          FinelSeriesCodeAndSeriesNumber: `${items.series}${items.QuotationNumber}`
        }));
        this.cd.detectChanges();
      },
      error: err => console.error('Error getting data', err)
    });
  }

  navigateToEdit(row: any) {
    if (row?.Id) {
      this._router.navigate(['edit', row.Id], { relativeTo: this._activateRoute });
    }
  }

  onSelectedRows(rows: any[]) {
    this.selectedRow = rows;
  }

  deleteSelected(selectedRows: any[]) {
    const deleteRequests = selectedRows.map(row =>
      this._salesQuotationService.deleteSalesQuotation(row.Id)
    );

    forkJoin(deleteRequests)
      .pipe(finalize(() => this.salesQuotationList()))
      .subscribe({
        next: () => {
          this._toastr.success('Sales Quotation deleted successfully');
          this.selectedRow = [];
          this.dataList.clearSelection();
          this.cd.detectChanges();
        },
        error: () => {
          this._toastr.error('Error deleting Sales Quotation');
        }
      });
  }

 // Open the dialog
openStatusDropdown(event: Event, row: any) {
  event.stopPropagation();
  this.selectedOrder = row;       // save the row being edited
  this.selectedStatus = row.Status; // pre-fill dropdown
  this.showStatusDialog = true;     // open dialog
}

// Save the selected status
saveStatus() {
  if (!this.selectedOrder || !this.selectedStatus) return;

  console.log('Selected Order:', this.selectedOrder);
  console.log('Selected Status:', this.selectedStatus);

  this._salesQuotationService.changeStatus(this.selectedOrder.Id, this.selectedStatus)
    .subscribe({
      next: () => {
        // Update status locally
        this.selectedOrder.Status = this.selectedStatus;

        // Close dialog
        this.showStatusDialog = false;

        // Show toast
        this._toastr.success('Status updated successfully');

        // Navigate to the Sales Quotation list page
        this._router.navigate(['/sales/sales-quotation']);
      },
      error: (err) => {
        console.error('Change status error:', err);
        this._toastr.error('Failed to update status');
      }
    });
}
onStatusChange(event: any) {
  this.selectedStatus = event.value;

  if (!this.selectedOrder || this.selectedStatus === this.selectedOrder.Status) return;

  // optimistically update UI and close dialog immediately
  const previousStatus = this.selectedOrder.Status;
  this.selectedOrder.Status = this.selectedStatus;
  this.showStatusDialog = false;
 

  // call server
  this._salesQuotationService.changeStatus(this.selectedOrder.Id, this.selectedStatus)
    .subscribe({
      next: () => {
        this._toastr.success('Status updated successfully');
        // optionally navigate
        this._router.navigate(['/sales/sales-quotation']);
          setTimeout(() => {
    this.saveStatus();
  }, 4000);
      },
      
      error: (err) => {
        console.error('Change status error:', err);
        // revert local status if you want
        this.selectedOrder.Status = previousStatus;
        this._toastr.error('Failed to update status');
      }
    });
}

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Pending':
        return 'bg-warning text-dark p-2 rounded';
      case 'Approved':
        return 'bg-success text-white p-2 rounded';
      case 'Rejected':
        return 'bg-danger text-white p-2 rounded';
      case 'Cancelled':
        return 'bg-secondary text-white p-2 rounded';
      case 'Accepted':
        return 'bg-info text-white p-2 rounded';
      default:
        return 'bg-light text-dark p-2 rounded';
    }
  }
}
