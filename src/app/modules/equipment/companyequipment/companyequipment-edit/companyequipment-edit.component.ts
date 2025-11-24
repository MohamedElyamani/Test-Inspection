import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CalibrationStatus, CompanyEquipment, EquipmentAccessory, EquipmentCalibrationHistory, EquipmentMaintenanceAndRepairRecord, EquipmentPreventiveMaintenance, EquipmentSoftware } from '../interface/companyequipment';
import { CompanyequipmentService } from '../service/companyequipment.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-companyequipment-edit',
  templateUrl: './Companyequipment-edit.component.html',
  styleUrls: ['./companyequipment-edit.component.css']
})
export class CompanyequipmentEditComponent implements OnInit {

  id!: number;
  calibrationStatusOptions = Object.values(CalibrationStatus);
  data: CompanyEquipment;

  form = new FormGroup({
    Id: new FormControl<number | null>(null),
    Name: new FormControl('', Validators.required),
    SerialNumber: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required),
    Model: new FormControl('', Validators.required),
    EquipmentIdNo: new FormControl('', Validators.required),
    EquipmentLocation: new FormControl('', Validators.required),
    CalibrationDate: new FormControl('', Validators.required),
    ExpireDate: new FormControl('', Validators.required),
    Manufacturer: new FormControl('', Validators.required),
    StorageConditionTemperature: new FormControl('', Validators.required),
    InternalOperationTemperature: new FormControl('', Validators.required),
    StorageConditionRelativeHumidity: new FormControl('', Validators.required),
    InternalOperationRelativeHumidity: new FormControl('', Validators.required),
    CalibrationStatus: new FormControl('', Validators.required),
    Tenant_ID: new FormControl<string | null>('default-tenant-id'),

    EquipmentAccessories: new FormArray<FormGroup>([]),
    EquipmentSoftwares: new FormArray<FormGroup>([]),
    EquipmentCalibrationHistorys: new FormArray<FormGroup>([]),
    EquipmentPreventiveMaintenances: new FormArray<FormGroup>([]),
    EquipmentMaintenanceAndRepairRecords: new FormArray<FormGroup>([]),
  });

  equipmentid!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private equipmentService: CompanyequipmentService,
    private destroyRef: DestroyRef,
    private _activateRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    this.equipmentid = Number(this._activateRoute.snapshot.paramMap.get('id'));
    if (this.equipmentid) {
      this.companybyid(this.equipmentid);
    }
  }

  // ---------------- FormArray Getters ----------------
  get EquipmentAccessories(): FormArray { return this.form.get('EquipmentAccessories') as FormArray; }
  get EquipmentCalibrationHistorys(): FormArray { return this.form.get('EquipmentCalibrationHistorys') as FormArray; }
  get EquipmentMaintenanceAndRepairRecords(): FormArray { return this.form.get('EquipmentMaintenanceAndRepairRecords') as FormArray; }
  get EquipmentPreventiveMaintenances(): FormArray { return this.form.get('EquipmentPreventiveMaintenances') as FormArray; }
  get EquipmentSoftwares(): FormArray { return this.form.get('EquipmentSoftwares') as FormArray; }

  // ---------------- Row Factories ----------------
  private createAccessoryRow(): FormGroup {
    return this.fb.group({
      Id: [0],
      CompanyEquipmentId: [this.id],
      Description: [''],
      Model: [''],
      SerialNumber: [''],
      Status: [''],
      Note: [''],
      Tenant_ID: ['default-tenant-id']
    });
  }

  private createCalibrationHistoryRow(): FormGroup {
    return this.fb.group({
      Id: [0],
      CompanyEquipmentId: [this.id],
      CalDate: [''],
      CalibrationBody: [''],
      CertificateNo: [''],
      ExpiryDate: [''],
      Note: [''],
      Tenant_ID: ['default-tenant-id']
    });
  }

  private createMaintenanceRow(): FormGroup {
    return this.fb.group({
      Id: [0],
      CompanyEquipmentId: [this.id],
      MaintenanceNo: [''],
      DescriptionOfWorkDone: [''],
      Results: [''],
      Dte: [''],
      Tenant_ID: ['default-tenant-id']
    });
  }

  private createPreventiveMaintenanceRow(): FormGroup {
    return this.fb.group({
      Id: [0],
      CompanyEquipmentId: [this.id],
      Action: [''],
      Frequency: [''],
      PerformedBy: [''],
      Dte: [''],
      Note: [''],
      Tenant_ID: ['default-tenant-id']
    });
  }

  private createSoftwareRow(): FormGroup {
    return this.fb.group({
      Id: [0],
      CompanyEquipmentId: [this.id],
      Description: [''],
      Manufacturer: [''],
      Version: [''],
      Notes: [''],
      Tenant_ID: ['default-tenant-id']
    });
  }

  // ---------------- Add/Remove Methods ----------------
  addAccessory() { this.EquipmentAccessories.push(this.createAccessoryRow()); }
  removeAccessory(i: number) { this.EquipmentAccessories.removeAt(i); }

  addCalibrationHistory() { this.EquipmentCalibrationHistorys.push(this.createCalibrationHistoryRow()); }
  removeCalibrationHistory(i: number) { this.EquipmentCalibrationHistorys.removeAt(i); }

  addMaintenanceRecord() { this.EquipmentMaintenanceAndRepairRecords.push(this.createMaintenanceRow()); }
  removeMaintenanceRecord(i: number) { this.EquipmentMaintenanceAndRepairRecords.removeAt(i); }

  addPreventiveMaintenance() { this.EquipmentPreventiveMaintenances.push(this.createPreventiveMaintenanceRow()); }
  removePreventiveMaintenance(i: number) { this.EquipmentPreventiveMaintenances.removeAt(i); }

  addSoftware() { this.EquipmentSoftwares.push(this.createSoftwareRow()); }
  removeSoftware(i: number) { this.EquipmentSoftwares.removeAt(i); }

  // ---------------- Helper Methods ----------------
  private formatDateForInput(date: string | Date | null): string | null {
    if (!date) return null;
    const d = new Date(date);
    if (isNaN(d.getTime())) return null;
    return d.toISOString().split('T')[0]; // yyyy-MM-dd
  }

  private toDate(value: string | null): Date | null {
    if (!value) return null;
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }

  isInvalid(controlName: string) {
    const c = this.form.get(controlName);
    return c?.invalid && c.touched;
  }

  // ---------------- Load by ID ----------------
  companybyid(id: number) {
    this.equipmentService.getCompanyEquipmentById(id).subscribe({
      next: (res) => {
        this.data = res;
        this.id = res.Id || 0;

        // Patch main form
        this.form.patchValue({
          Id: res.Id,
          Name: res.Name,
          SerialNumber: res.SerialNumber,
          Description: res.Description,
          Model: res.Model,
          EquipmentIdNo: res.EquipmentIdNo,
          EquipmentLocation: res.EquipmentLocation,
          CalibrationStatus: res.CalibrationStatus,
          CalibrationDate: this.formatDateForInput(res.CalibrationDate),
          ExpireDate: this.formatDateForInput(res.ExpireDate),
          Manufacturer: res.Manufacturer,
          StorageConditionTemperature: res.StorageConditionTemperature,
          InternalOperationTemperature: res.InternalOperationTemperature,
          StorageConditionRelativeHumidity: res.StorageConditionRelativeHumidity,
          InternalOperationRelativeHumidity: res.InternalOperationRelativeHumidity,
          Tenant_ID: res.Tenant_ID,
        });

        // Patch FormArrays
        res.EquipmentCalibrationHistorys?.forEach(item => {
          const row = this.createCalibrationHistoryRow();
          this.EquipmentCalibrationHistorys.push(row);
          row.patchValue({
            ...item,
            CalDate: this.formatDateForInput(item.CalDate),
            ExpiryDate: this.formatDateForInput(item.ExpiryDate),
          });
        });

        res.EquipmentPreventiveMaintenances?.forEach(item => {
          const row = this.createPreventiveMaintenanceRow();
          this.EquipmentPreventiveMaintenances.push(row);
          row.patchValue({
            ...item,
            Dte: this.formatDateForInput(item.Dte),
          });
        });

        res.EquipmentMaintenanceAndRepairRecords?.forEach(item => {
          const row = this.createMaintenanceRow();
          this.EquipmentMaintenanceAndRepairRecords.push(row);
          row.patchValue({
            ...item,
            Dte: this.formatDateForInput(item.Dte),
          });
        });

        res.EquipmentAccessories?.forEach(item => {
          const row = this.createAccessoryRow();
          this.EquipmentAccessories.push(row);
          row.patchValue(item);
        });

        res.EquipmentSoftwares?.forEach(item => {
          const row = this.createSoftwareRow();
          this.EquipmentSoftwares.push(row);
          row.patchValue(item);
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // ---------------- Submit / Update ----------------
  UpdateCompanyEquipment() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastr.warning('Please fill all required fields');
      return;
    }

    const raw = this.form.getRawValue();

    const payload: CompanyEquipment = {
      Id: raw.Id!,
      Name: raw.Name!,
      SerialNumber: raw.SerialNumber!,
      Description: raw.Description!,
      Model: raw.Model!,
      EquipmentIdNo: raw.EquipmentIdNo!,
      EquipmentLocation: raw.EquipmentLocation!,
      CalibrationStatus: raw.CalibrationStatus?.replace(' ', '') as CalibrationStatus,
      CalibrationDate: this.toDate(raw.CalibrationDate),
      ExpireDate: this.toDate(raw.ExpireDate),
      Manufacturer: raw.Manufacturer!,
      StorageConditionTemperature: raw.StorageConditionTemperature!,
      InternalOperationTemperature: raw.InternalOperationTemperature!,
      StorageConditionRelativeHumidity: raw.StorageConditionRelativeHumidity!,
      InternalOperationRelativeHumidity: raw.InternalOperationRelativeHumidity!,
      Tenant_ID: 'default-tenant-id',

      EquipmentAccessories: (raw.EquipmentAccessories as EquipmentAccessory[]).map(a => ({
        Id: a.Id || 0,
        CompanyEquipmentId: this.id,
        Note: a.Note || '',
        Description: a.Description || '',
        Model: a.Model || '',
        SerialNumber: a.SerialNumber || '',
        Status: a.Status || '',
        Tenant_ID: a.Tenant_ID || 'default-tenant-id'
      })),

      EquipmentSoftwares: (raw.EquipmentSoftwares as EquipmentSoftware[]).map(s => ({
        Id: s.Id || 0,
        CompanyEquipmentId: this.id,
        Description: s.Description || '',
        Manufacturer: s.Manufacturer || '',
        Version: s.Version || '',
        Notes: s.Notes || '',
        Tenant_ID: s.Tenant_ID || 'default-tenant-id'
      })),

      EquipmentCalibrationHistorys: (raw.EquipmentCalibrationHistorys as EquipmentCalibrationHistory[]).map(c => ({
        Id: c.Id || 0,
        CompanyEquipmentId: this.id,
        Note: c.Note || '',
        CertificateNo: c.CertificateNo || '',
        CalibrationBody: c.CalibrationBody || '',
        CalDate: c.CalDate ? new Date(c.CalDate) : null,
        ExpiryDate: c.ExpiryDate ? new Date(c.ExpiryDate) : null,
        Tenant_ID: c.Tenant_ID || 'default-tenant-id'
      })),

      EquipmentPreventiveMaintenances: (raw.EquipmentPreventiveMaintenances as EquipmentPreventiveMaintenance[]).map(p => ({
        Id: p.Id || 0,
        CompanyEquipmentId: this.id,
        Action: p.Action || '',
        Frequency: p.Frequency || '',
        Dte: p.Dte ? new Date(p.Dte) : null,
        PerformedBy: p.PerformedBy || '',
        Note: p.Note || '',
        Tenant_ID: p.Tenant_ID || 'default-tenant-id'
      })),

      EquipmentMaintenanceAndRepairRecords: (raw.EquipmentMaintenanceAndRepairRecords as EquipmentMaintenanceAndRepairRecord[]).map(m => ({
        Id: m.Id || 0,
        CompanyEquipmentId: this.id,
        MaintenanceNo: m.MaintenanceNo || '',
        Dte: m.Dte ? new Date(m.Dte) : null,
        DescriptionOfWorkDone: m.DescriptionOfWorkDone || '',
        Results: m.Results || '',
        Tenant_ID: m.Tenant_ID || 'default-tenant-id'
      })),
    };

    this.equipmentService.updateCompanyEquipment(this.id, payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.toastr.success('Equipment updated successfully');
          this.router.navigate(['equipment/companyequipment']);
        },
        error: (error) => {
          console.error('Update error:', error);
          this.toastr.error('Failed to update equipment');
        }
      });
  }
}
