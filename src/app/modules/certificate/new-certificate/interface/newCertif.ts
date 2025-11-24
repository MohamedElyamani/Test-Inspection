export interface InspectionCertificate {
  Id: string;
  CertificateNumber: string;
  IssueDate: string;                 // ISO date string
  NextInspectionDate: string;        // ISO date string
  Status: string;
  CustomerId: number;
  CustomerName: string;
  CompanyId: number;
  CompanyName: string;
  LocationId: number;
  LocationName: string;
  ProjectId: number;
  ProjectName: string;
  InspectionOrderId: string;
  InspectorId: number;
  InspectorName: string;
  InspectionMethodId: number;
  InspectionMethodName: string;
  InspectionStartDate: string;       // ISO date string
  InspectionEndDate: string;         // ISO date string
  InspectionDuration: string;
  Findings: string;
  Recommendations: string;
  Remarks: string;
  PreparedBy: string;
  ApprovedBy: string;
  EquipmentsInspected: EquipmentInspection[];
  Tenant_ID: string;
  Series: string;
}

export interface EquipmentInspection {
  Id: string;
  EquipmentId: string;
  EquipmentName: string;
  EquipmentCondition: string;
  InspectionResult: string;
  Notes: string;
}

