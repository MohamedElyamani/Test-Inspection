import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutoCompleteComponent),
      multi: true
    }
  ]
})
export class AutoCompleteComponent implements ControlValueAccessor, OnInit, OnChanges {

  // 📥 Inputs
  @Input() data: any[] = [];                // بيانات القائمة
  @Input() displayField: string[] = [];     // الحقول المعروضة
  @Input() searchFields: string[] = [];     // الحقول المستخدمة للبحث
  @Input() valueField: string = '';         // الحقل المرجعي للقيمة المختارة
  @Input() validStyle: any;                 // ستايل الفاليديشن
  @Input() formControl: FormControl | null = null; // الكنترول داخل الفورم
  @Input() readonly: boolean = false;
  @Input() lookupData: any[] = [];          // للـ writeValue
  @Input() placeholder: string = 'Select item'; // ✅ placeholder الجديد

  // 📤 Outputs
  @Output() selectedDataChange = new EventEmitter<any>();
  @Output() validStyleChange = new EventEmitter<any>();

  // 🔎 References
  @ViewChild(AutoComplete) private autoComplete?: AutoComplete;

  // 🧠 State variables
  filteredDataAutocomplete: any[] = [];
  selectedData: any;
  filteredData: any[] = [];
  visible: boolean = false;
  showPopup: boolean = false;
  dropdownOpen = false;          // ✅ فتح/غلق القائمة
  selectedText = '';             // ✅ النص المعروض في input
  private internalValue: any;

  // ControlValueAccessor callbacks
  onChange = (data: any) => {};
  onTouched = () => {};

  ngOnInit(): void {
    if (Array.isArray(this.data)) {
      this.filteredDataAutocomplete = [...this.data];
      this.filteredData = [...this.data];
    } else {
      this.filteredDataAutocomplete = [];
      this.filteredData = [];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lookupData'] && this.lookupData && this.internalValue != null) {
      this.selectedData =
        this.lookupData.find(item => item[this.valueField] == this.internalValue) || null;
      if (this.selectedData) {
        this.selectedText = this.getDisplayText(this.selectedData);
      }
    }
  }

  // 🧩 البحث في القائمة
  searchData(event: any) {
    const query = event.query?.toLowerCase?.() || '';
    if (Array.isArray(this.data) && this.data.length > 0) {
      this.filteredDataAutocomplete = this.data
        .filter((data) =>
          this.searchFields.some((field) =>
            data[field]?.toString().toLowerCase().includes(query)
          )
        )
        .slice(0, 8);
    } else {
      this.filteredDataAutocomplete = [];
    }
  }

  // 🧩 تغيير القيمة في input (بدل الـ parser error)
  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchData({ query: input.value });
  }
onDropdownSearch(event: Event) {
  const input = event.target as HTMLInputElement;
  this.searchData({ query: input.value });
}
  // 🧩 اختيار عنصر من القائمة أو الجدول
  handleSelection(data: any) {
    this.selectedData = data.value || data.data;
    this.selectedText = this.getDisplayText(this.selectedData);
    this.onChange(this.selectedData[this.valueField]);
    this.onTouched();
    this.visible = false;
    this.dropdownOpen = false;
    this.selectedDataChange.emit(this.selectedData);
    this.validStyleChange.emit(this.validStyle);
  }

  // 🧩 عرض النص في الـ input من حقول displayField
  private getDisplayText(item: any): string {
    if (!item || !this.displayField.length) return '';
    const parts = this.displayField.map(f => item[f]).filter(Boolean);
    return parts.join(' - ');
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    this.internalValue = value;
    if (Array.isArray(this.lookupData)) {
      this.selectedData =
        this.lookupData.find(item => item[this.valueField] == value) || null;
      if (this.selectedData) {
        this.selectedText = this.getDisplayText(this.selectedData);
      }
    } else {
      this.selectedData = null;
      this.selectedText = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // 🧩 فلترة الجدول في الـ dialog
  filterGlobal(event: Event, field: string) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredData = query
      ? this.data.filter((data) =>
          data[field]?.toString().toLowerCase().includes(query)
        )
      : [...this.data];
  }

  // 🧩 فتح نافذة البحث المتقدم
  handleSearchMore() {
    this.visible = true;
    this.filteredData = [...this.data];
  }

  // 🧩 التحكم في فتح/غلق القائمة
  toggleDropdown() {
    if (this.readonly) return;
    this.dropdownOpen = !this.dropdownOpen;
    if (this.dropdownOpen) {
      this.searchData({ query: '' });
    }
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  // 🧩 فتح الـ dialog من الزر "More Filter"
  openDialog(event: Event) {
    event.stopPropagation();
    this.closeDropdown();
    this.handleSearchMore();
  }

  handleEnterKey() {
    if (this.filteredDataAutocomplete.length > 0) {
      this.handleSelection({ value: this.filteredDataAutocomplete[0] });
    }
  }
}
