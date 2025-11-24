export interface InspectionReq {
   Id?: number,
    RequestNumber: string, 
    ServiceTypeId: number,
    LocationId: number,
    ProjectId: number,
    CustomerId?: number,
    AvailableDate: String, 
    EquipmentQty: number, 
    Status: InspectionStatus, 
    ItemToBeInspected: string,
    Notes: string,
    ContactPerson: string,
    ContactPersonEmail: string,
    ContactPersonPhone: string,
    Tenant_ID?: string,
    RequestDate: String, 
    LocationName?: string,  
    ServiceTypeName?: string, 
    ProjectName?: string,  
    series : string,
    InspectionRequestDetails: [],
    InspectionRequestSubcontractorDetails: []
}

export enum InspectionStatus {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
  Cancelled = 3
}