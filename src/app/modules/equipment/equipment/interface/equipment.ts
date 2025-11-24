export interface Equipment {
  Id?: number;
  EquipmentNo: string;
  Name: string;
  SerialNumber: string;
  Description: string;
  PurchaseDate: Date; 
  ExpiryDate: Date;
  LastMaintenanceDate: Date;
  MaintenanceIntervalDays: number;
  IsCalibrated: boolean;
  LastCalibrationDate: Date;
  NextCalibrationDueDate: Date;
  series: string;
}
export interface EquipmentLookup {
  Id?: number;
  Name: string;
  SerialNumber: string;
  series: string;
  EquipmentNo: string;
}
