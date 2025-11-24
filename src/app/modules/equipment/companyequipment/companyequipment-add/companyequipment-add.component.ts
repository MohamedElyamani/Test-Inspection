import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import {
  CalibrationStatus,
  CompanyEquipment,
  EquipmentAccessory,
  EquipmentCalibrationHistory,
  EquipmentMaintenanceAndRepairRecord,
  EquipmentPreventiveMaintenance,
  EquipmentSoftware,
  EquipmentStatus
} from '../interface/companyequipment';
import { CompanyequipmentService } from '../service/companyequipment.service';

@Component({
  selector: 'app-companyequipment-add',
  templateUrl: './companyequipment-add.component.html',
  styleUrls: ['./companyequipment-add.component.css']
})
export class CompanyequipmentAddComponent implements OnInit {

  constructor(
    private _toastr: ToastrService,
    private _destroyRef: DestroyRef,
    private _location: Location,
    private translate: TranslateService,
    private _activateRoute: ActivatedRoute,
    private _router: Router,
    private fb: FormBuilder,
    private _equipmentService: CompanyequipmentService,
  ) { }

  ngOnInit(): void {
    // Add initial row for each FormArray
    if (this.EquipmentAccessory.length === 0) this.addEquipmentAccessory();
    if (this.EquipmentSoftwar.length === 0) this.addEquipmentSoftware();
    if (this.EquipmentCalibrationHistor.length === 0) this.addEquipmentCalibrationHistory();
    if (this.EquipmentPreventiveMaintenanc.length === 0) this.addEquipmentPreventiveMaintenance();
    if (this.EquipmentMaintenanceAndRepaireRecord.length === 0) this.addEquipmentMaintenanceAndRepairRecord();
  }

  // Main form
 form = new FormGroup({
    Name: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required),
    Model: new FormControl('', Validators.required),
    Manufacturer: new FormControl('', Validators.required),
    SerialNumber: new FormControl('', Validators.required),
    EquipmentIdNo: new FormControl('', Validators.required),
    EquipmentLocation: new FormControl(),
    CalibrationStatus: new FormControl('', Validators.required),
    CalibrationDate:  new FormControl('', Validators.required),
    StorageConditionTemperature: new FormControl('', Validators.required),
    InternalOperationTemperature: new FormControl('', Validators.required),
    
    StorageConditionRelativeHumidity: new FormControl('', Validators.required),
    
    InternalOperationRelativeHumidity: new FormControl('', Validators.required),
    
 
    // FormArrays
    EquipmentAccessories: new FormArray([]),
    EquipmentSoftwares: new FormArray([]),
    EquipmentCalibrationHistorys: new FormArray([]),
    EquipmentPreventiveMaintenances: new FormArray([]),
    EquipmentMaintenanceAndRepairRecords: new FormArray([]),
  });


  // ---------------- FormArray Getters ----------------
  get EquipmentAccessory(): FormArray { return this.form.get('EquipmentAccessories') as FormArray; }
  get EquipmentSoftwar(): FormArray { return this.form.get('EquipmentSoftwares') as FormArray; }
  get EquipmentCalibrationHistor(): FormArray { return this.form.get('EquipmentCalibrationHistorys') as FormArray; }
  get EquipmentPreventiveMaintenanc(): FormArray { return this.form.get('EquipmentPreventiveMaintenances') as FormArray; }
  get EquipmentMaintenanceAndRepaireRecord(): FormArray { return this.form.get('EquipmentMaintenanceAndRepairRecords') as FormArray; }

  // ---------------- ROW FACTORIES ---------------- //
  createEquipmentAccessoryRow(): FormGroup {
    return this.fb.group({
      Id: [null],
      CompanyEquipmentId: [null],
      Description: ['', Validators.required],
      Note: [''],
      Model: ['', Validators.required],
      SerialNumber: ['', Validators.required],
      Status: ['', Validators.required],
      Tenant_ID: [''],
    });
  }
  addEquipmentAccessory(): void { this.EquipmentAccessory.push(this.createEquipmentAccessoryRow()); }
  removeEquipmentAccessory(i: number): void { this.EquipmentAccessory.removeAt(i); }

  createEquipmentSoftwareRow(): FormGroup {
    return this.fb.group({
      Id: [null],
      CompanyEquipmentId: [null],
      Description: ['', Validators.required],
      Manufacturer: ['', Validators.required],
      Version: ['', Validators.required],
      Notes: [''],
      Tenant_ID: [''],
    });
  }
  addEquipmentSoftware(): void { this.EquipmentSoftwar.push(this.createEquipmentSoftwareRow()); }
  removeEquipmentSoftware(i: number): void { this.EquipmentSoftwar.removeAt(i); }

  createEquipmentCalibrationHistoryRow(): FormGroup {
    return this.fb.group({
      Id: [null],
      CompanyEquipmentId: [null],
      Note: [''],
      CertificateNo: ['', Validators.required],
      CalibrationBody: ['', Validators.required],
      CalDate: [null, Validators.required],
      ExpiryDate: [null, Validators.required],
      Tenant_ID: [''],
    });
  }
  addEquipmentCalibrationHistory(): void { this.EquipmentCalibrationHistor.push(this.createEquipmentCalibrationHistoryRow()); }
  removeEquipmentCalibrationHistory(i: number): void { this.EquipmentCalibrationHistor.removeAt(i); }

  createEquipmentPreventiveMaintenanceRow(): FormGroup {
    return this.fb.group({
      Id: [null],
      CompanyEquipmentId: [null],
      Action: ['', Validators.required],
      Frequency: ['', Validators.required],
      Dte: [null, Validators.required],
      PerformedBy: ['', Validators.required],
      Note: [''],
      Tenant_ID: [''],
    });
  }
  addEquipmentPreventiveMaintenance(): void { this.EquipmentPreventiveMaintenanc.push(this.createEquipmentPreventiveMaintenanceRow()); }
  removeEquipmentPreventiveMaintenance(i: number): void { this.EquipmentPreventiveMaintenanc.removeAt(i); }

  createEquipmentMaintenanceAndRepairRecordRow(): FormGroup {
    return this.fb.group({
      Id: [null],
      CompanyEquipmentId: [null],
      MaintenanceNo: ['', Validators.required],
      Dte: [null, Validators.required],
      DescriptionOfWorkDone: ['', Validators.required],
      Results: ['', Validators.required],
      Tenant_ID: [''],
    });
  }
  addEquipmentMaintenanceAndRepairRecord(): void { this.EquipmentMaintenanceAndRepaireRecord.push(this.createEquipmentMaintenanceAndRepairRecordRow()); }
  removeEquipmentMaintenanceAndRepairRecord(i: number): void { this.EquipmentMaintenanceAndRepaireRecord.removeAt(i); }

  isInvalid(controlName: string) {
    const c = this.form.get(controlName);
    return !!(c && c.invalid && (c.touched || c.dirty));
  }

  // ---------------- Submit ----------------
  AddCompanyEquipment() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this._toastr.error(this.translate.instant('Please fix validation errors before submitting.'));
      return;
    }

    const f = this.form.value;

    const payload: CompanyEquipment = {
      Id:0,
      Name: f.Name!,
      SerialNumber: f.SerialNumber!,
      Description: f.Description!,
      Model: f.Model!,
      EquipmentIdNo: f.EquipmentIdNo!,
      EquipmentLocation: f.EquipmentLocation!,
      CalibrationStatus: f.CalibrationStatus as CalibrationStatus,
      CalibrationDate: new Date(),
      ExpireDate: new Date(),
      Manufacturer: f.Manufacturer!,
      StorageConditionTemperature: f.StorageConditionTemperature!,
      InternalOperationTemperature: f.InternalOperationTemperature!,
      StorageConditionRelativeHumidity: f.StorageConditionRelativeHumidity!,
      InternalOperationRelativeHumidity: f.InternalOperationRelativeHumidity!,
      Tenant_ID: 'default-tenant-id',
      EquipmentAccessories: (f.EquipmentAccessories ?? []).map((a: any) => ({
        Id: a.Id ?? 0,
        CompanyEquipmentId: a.CompanyEquipmentId ?? 0,
        Note: a.Note ?? '',
        Description: a.Description!,
        Model: a.Model!,
        SerialNumber: a.SerialNumber!,
        Status: a.Status ?? EquipmentStatus,
        Tenant_ID: 'default-tenant-id',
      })),
      EquipmentSoftwares: (f.EquipmentSoftwares ?? []).map((s: any) => ({
        Id: s.Id ?? 0,
        CompanyEquipmentId: s.CompanyEquipmentId ?? 0,
        Description: s.Description!,
        Manufacturer: s.Manufacturer!,
        Version: s.Version!,
        Notes: s.Notes ?? '',
        Tenant_ID: 'default-tenant-id',
      })),
      EquipmentCalibrationHistorys: (f.EquipmentCalibrationHistorys ?? []).map((c: any) => ({
        Id: c.Id ?? 0,
        CompanyEquipmentId: c.CompanyEquipmentId ?? 0,
        Note: c.Note ?? '',
        CertificateNo: c.CertificateNo!,
        CalibrationBody: c.CalibrationBody!,
        CalDate: c.CalDate!,
        ExpiryDate: c.ExpiryDate!,
        Tenant_ID: 'default-tenant-id',
      })),
      EquipmentPreventiveMaintenances: (f.EquipmentPreventiveMaintenances ?? []).map((p: any) => ({
        Id: p.Id ?? 0,
        CompanyEquipmentId: p.CompanyEquipmentId ?? 0,
        Action: p.Action!,
        Frequency: p.Frequency!,
        Dte: p.Dte!,
        PerformedBy: p.PerformedBy!,
        Note: p.Note ?? '',
        Tenant_ID: 'default-tenant-id',
      })),
      EquipmentMaintenanceAndRepairRecords: (f.EquipmentMaintenanceAndRepairRecords ?? []).map((m: any) => ({
        Id: m.Id ?? 0,
        CompanyEquipmentId: m.CompanyEquipmentId ?? 0,
        MaintenanceNo: m.MaintenanceNo!,
        Dte: m.Dte!,
        DescriptionOfWorkDone: m.DescriptionOfWorkDone!,
        Results: m.Results!,
        Tenant_ID: 'default-tenant-id',
      })),
    };

    console.log(payload);

    this._equipmentService.createCompanyEquipment(payload).subscribe({
      next: () => {
        this._toastr.success(this.translate.instant('Company equipment saved successfully.'));
        this._router.navigate(['equipment/companyequipment']);
      },
      error: (err) => {
        console.error(err);
        this._toastr.error(this.translate.instant('Failed to save company equipment.'));
      }
    });
  }
}
