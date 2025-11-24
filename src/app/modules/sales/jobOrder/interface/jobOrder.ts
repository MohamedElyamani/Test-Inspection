export interface JobOrder {
  Id?: number;
  JobOrderNo: string;
  CustomerId: number | null;
  QuotationId?: number | null;
  QuotationNo: string;
  LocationId: number | null;
  ProjectId: number | null;
  JobOrderTypeServicesTypeId: number | null;
  InspectionMethodId: number | null;
  ServiceList: string;
  InspectorCategoryId: number | null;
  AssignedTo: number | null;
  DateFrom: string;
  DateTo: string;
  SiteContactName: string;
  SiteContactMobile: string;
  SiteContactEmail: string;
  Description: string;
  Comments: string;
  series: string;
}
