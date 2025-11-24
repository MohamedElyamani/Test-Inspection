 export interface CompanyEquipment {
    Id: number | null;
  Name: string | null;
  SerialNumber: string | null; 
  Description: string | null;
  Model: string | null;
  EquipmentIdNo: string | null;
  EquipmentLocation: string | null;
  CalibrationStatus: CalibrationStatus | null;
  CalibrationDate: Date | null;
  ExpireDate: Date | null;
  Manufacturer: string | null;
  StorageConditionTemperature: string | null;
  InternalOperationTemperature: string | null;
  StorageConditionRelativeHumidity: string | null;
  InternalOperationRelativeHumidity: string | null;
  Tenant_ID: string | null;
  EquipmentAccessories: EquipmentAccessory[];
  EquipmentSoftwares: EquipmentSoftware[];
  EquipmentCalibrationHistorys: EquipmentCalibrationHistory[];
  EquipmentPreventiveMaintenances: EquipmentPreventiveMaintenance[];
  EquipmentMaintenanceAndRepairRecords: EquipmentMaintenanceAndRepairRecord[];
}

 export interface EquipmentAccessory {
  Id: number;
  CompanyEquipmentId: number;
  Note: string;
  Description: string;
  Model: string;
  SerialNumber: string;
  Status: EquipmentStatus; // example enum
  Tenant_ID: string;
}

 export interface EquipmentSoftware {
  Id: number;
  CompanyEquipmentId: number;
  Description: string;
  Manufacturer: string;
  Version: string;
  Notes: string;
  Tenant_ID: string;
}

 export interface EquipmentCalibrationHistory {
  Id: number;
  CompanyEquipmentId: number;
  Note: string;
  CertificateNo: string;
  CalibrationBody: string;
  CalDate: Date  | null; // ISO Date string
  ExpiryDate: Date | null; // ISO Date string
  Tenant_ID: string;
}

export interface EquipmentPreventiveMaintenance {
  Id: number;
  CompanyEquipmentId: number;
  Action: string;
  Frequency: string;
  Dte: Date  | null; // ISO Date string
  PerformedBy: string;
  Note: string;
  Tenant_ID: string;
}

export interface EquipmentMaintenanceAndRepairRecord {
  Id: number;
  CompanyEquipmentId: number;
  MaintenanceNo: string;
  Dte: Date  | null; // ISO Date string
  DescriptionOfWorkDone: string;
  Results: string;
  Tenant_ID: string;
}
export enum EquipmentStatus {
  Working  = 'Working',
  Stopped  = 'Stopped',
  HaveProplem  = 'Have Proplem',
}
export enum CalibrationStatus {
  Calibrated = 'Calibrated',
  NotCalibrated = 'Not Calibrated',
  
}