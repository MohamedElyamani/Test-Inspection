import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  TemplateRef,
  ChangeDetectorRef
} from '@angular/core';
import { Table } from 'primeng/table';
import { FilterMatchMode } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent {
  columnFilters: { [key: string]: string } = {};
  selectedRowsList: any[] = [];

  @Input() dataSource: any[] = [];

  // ✅ Added support for custom templates
  @Input() columnsSchema: {
    key: string;
    label: string;
    formatter?: (value: any, row?: any) => string;
    template?: TemplateRef<any>;
  }[] = [];

  @Input() loading: boolean = false;

  @Output() rowClick = new EventEmitter<any>();
  @Output() selectedRows = new EventEmitter<any[]>();
  @Output() onDelete = new EventEmitter<any[]>();

  @ViewChild('dt') table!: Table;

  displayedColumns: {
    key: string;
    label: string;
    formatter?: (value: any, row?: any) => string;
    template?: TemplateRef<any>;
  }[] = [];

  selectedColumns: {
    key: string;
    label: string;
    formatter?: (value: any, row?: any) => string;
    template?: TemplateRef<any>;
  }[] = [];

  constructor(
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.displayedColumns = [...this.columnsSchema];
    this.selectedColumns = [...this.columnsSchema];
  }

  updateDisplayedColumns() {
    if (this.selectedColumns && this.selectedColumns.length > 0) {
      this.displayedColumns = [...this.selectedColumns];
    } else {
      this.displayedColumns = [...this.columnsSchema];
    }

    if (this.table) this.table.reset();
    this.cd.detectChanges();
  }

  trackByKey(index: number, item: any): string {
    return item.key;
  }

  onRowClick(row: any) {
    this.rowClick.emit(row);
  }

  emitSelection() {
    this.selectedRows.emit(this.selectedRowsList);
  }

  handleDelete() {
    this.onDelete.emit(this.selectedRowsList);
  }

  get selectedCount(): number {
    return this.selectedRowsList.length;
  }

  filterColumn(event: any, field: string) {
    const value = (event.target as HTMLInputElement).value;
    this.columnFilters[field] = value;
    this.table.filter(value, field, FilterMatchMode.CONTAINS);
  }

  navigateToCreate() {
    this._router.navigate(['add'], { relativeTo: this._activateRoute });
  }

  clearSelection() {
    this.selectedRowsList = [];
  }
}
