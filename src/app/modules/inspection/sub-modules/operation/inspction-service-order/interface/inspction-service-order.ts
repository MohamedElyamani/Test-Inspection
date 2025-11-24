export interface InspectionRequestDetail {
  Id: number;
  ServiceItemId: number;
  Amount: number;
  InspectionMethodId: number;
  InspectionRequestId: number;
Tenant_ID: string | null;

  IsSubcontractor: boolean;
}

export interface InspectionRequestSubcontractorDetail {
  Id: number;
  ServiceItemId: number;
  Amount: number;
  InspectionMethodId: number;
  InspectionRequestId: number;
Tenant_ID: string | null;

  SubcontractorName: string;
  IsSubcontractor: boolean;
}

export interface InspectionRequest {
  Id: number;
  RequestNumber: string;
  ServiceTypeId: number;
  LocationId: number;
  ProjectId: number;
  CustomerId: number;
  AvailableDate: string;
  EquipmentQty: number;
  Status: InspectionStatus;
  ItemToBeInspected: string;
  Notes: string;
  ContactPerson: string;
  ContactPersonEmail: string;
  ContactPersonPhone: string;
Tenant_ID: string | null;

  RequestDate: string;
  series: string;
  InspectionRequestDetails: InspectionRequestDetail[];
  InspectionRequestSubcontractorDetails: InspectionRequestSubcontractorDetail[];
}
export enum InspectionStatus {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
  Cancelled = 3
}
export interface InspectionServiceOrderLookup {
  Id: number;
  Itemtitle: string;
  Itemcode: string;
  SubcontractorName: string | null;
  IsSubcontractor: boolean | null;
  InspectionMethodId: number | null;
  InspectionMethodName: string | null;
}

