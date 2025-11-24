import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { LocalizationService } from './localization.service';
import { DeleteDialogComponent } from 'src/app/_metronic/shared/components/delete-dialog/delete-dialog.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { LocalizationItem } from './local';

@Component({
  selector: 'app-localization',
  templateUrl: './localization.component.html',
  styleUrls: []
})
export class LocalizationComponent implements OnInit {

  localization: any[] = [];
  filteredData: any[] = [];
  selectedLocale: any;
  viewAddButton = false;
  visible = false;

  localeForm = new FormGroup({
    caption: new FormControl(null, [Validators.required]),
    translate: new FormControl(null, [Validators.required]),
    localeCode: new FormControl(null, [Validators.required]),
    tooltip: new FormControl(''),
    system: new FormControl(false),
  });

  items: any[] = [
    { label: 'Localization', routerLink: '/localization' },
  ];

  @ViewChild(DeleteDialogComponent) deleteDialog!: DeleteDialogComponent;

  constructor(
    private localizationService: LocalizationService,
    private cd: ChangeDetectorRef,
    private toastr: ToastrService,
    private appComponent: AppComponent
  ) {}

  languages: any[] = [
    { LocaleCode: 'en', DisplayName: 'English' },
    { LocaleCode: 'ar', DisplayName: 'Arabic' },
    { LocaleCode: 'fr', DisplayName: 'French' },
  ];

  selectedLanguage: any = this.languages[0]; // default English

  ngOnInit(): void {
    this.getLanguages();
    this.getLocalization(); // ✅ load English by default
  }

  showDialog() {
    this.visible = true;
  }

insertLocale() {
  if (this.localeForm.invalid) return;

  const data: LocalizationItem = {
    Caption: this.localeForm.value.caption ?? "",
    Translate: this.localeForm.value.translate ?? "",
    LocaleCode: this.selectedLanguage.LocaleCode ?? "",
    Tooltip: this.localeForm.value.tooltip ?? "",
    System: this.localeForm.value.system ?? false
  };

  this.localizationService.insertLocale(data).subscribe({
    next: () => {
      this.visible = false;
      this.cd.markForCheck();
    },
    error: (err) => {
      console.error(err);
      this.toastr.error("Insert failed");
    },
    complete: () => {
      this.getLocalization();
      this.toastr.success("Locale Added");
      this.clearForm();
      this.appComponent.changeLanguage(this.selectedLanguage.LocaleCode);
    }
  });
}



clearForm() {
  this.localeForm.reset();
  this.visible = false;
  this.selectedLocaleId = null;
  this.localeForm.controls['localeCode'].setValue(
    this.selectedLanguage?.LocaleCode || ''
  );
}


  getLanguages() {
    this.cd.markForCheck();
  }

  getLocalization() {
    if (!this.selectedLanguage) return;

    const data = {
      sorts: [],
      skip: 0,
      take: 0,
      getTotal: true,
      filters: [['LocaleCode', '=', this.selectedLanguage.LocaleCode]],
    };

    this.localizationService.getLocalization(data).subscribe({
      next: (res: any) => {
        const items: any[] = Array.isArray(res)
          ? res
          : res?.data || res?.items || [];

        this.localization = items;
        this.filteredData = [...items];
        this.localeForm.controls['localeCode'].setValue(this.selectedLanguage.LocaleCode);
        this.localeForm.controls['system'].setValue(false);

        this.cd.markForCheck();

        console.log('Localization loaded successfully:', items);
      },
      error: (err) => {
        console.error('getLocalization error', err);
        this.toastr.error(err?.title || 'Error loading localization');
      },
      complete: () => {
        this.viewAddButton = true;
        this.clearForm();
      }
    });
  }

  onDeleteLocale(locale: any) {
    console.log('Delete clicked for:', locale);
    this.selectedLocale = locale;
    this.deleteDialog.confirmDelete(
      `Are you sure you want to delete this Language?`,
      `Delete Locale (${locale.Caption})`
    );
  }

  onDeleteConfirmed() {
    if (!this.selectedLocale || !this.selectedLanguage) return;

    const data = [
      { key: 'Caption', value: this.selectedLocale.Caption },
      { key: 'LocaleCode', value: this.selectedLanguage.LocaleCode }
    ];
    this.localizationService.deleteLocale(data).subscribe({
      next: () => {
        this.cd.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.toastr.error(err.title || 'Delete failed');
      },
      complete: () => {
        this.getLocalization();
        this.toastr.success('Locale Deleted', 'Success');
        this.appComponent.changeLanguage(this.selectedLanguage.LocaleCode); // refresh globally
      },
    });
  }

  onDeleteCancelled() {
    this.selectedLocale = null;
  }
  selectedLocaleId: number | null = null;

onEditLocale(locale: any) {
  this.selectedLocaleId = locale.Id;

  this.localeForm.patchValue({
    caption: locale.Caption,
    translate: locale.Translate,
    localeCode: locale.LocaleCode,
    tooltip: locale.Tooltip,
    system: locale.System,
  });

  this.visible = true;
}
updateLocale() {
  if (this.localeForm.invalid || !this.selectedLocaleId) return;

  const formValue = this.localeForm.value;

  const data: LocalizationItem = {
    Caption: formValue.caption!,     // ✅ required
    Translate: formValue.translate!, // ✅ required
    LocaleCode: this.selectedLanguage.LocaleCode, // ✅ safe & required
    Tooltip: formValue.tooltip || "", // ✅ optional
    System: formValue.system ?? false // ✅ boolean fallback
  };

  this.localizationService.updateLocale(this.selectedLocaleId, data).subscribe({
    next: () => {
      this.visible = false;
      this.cd.markForCheck();
    },
    error: (err) => {
      console.error(err);
      this.toastr.error(err?.title || "Update failed");
    },
    complete: () => {
      this.getLocalization();
      this.toastr.success("Locale Updated", "Success");
      this.appComponent.changeLanguage(this.selectedLanguage.LocaleCode);

      this.clearForm();
    }
  });
}

}
