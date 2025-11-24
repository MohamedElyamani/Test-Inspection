export interface SalesQuotation {

  Id?: number,
  QuotationNumber: string,
  CustomerId: number,
  LocationId: number,
  ContactName: string,
  IssueDate: Date,
  ExpireDate: Date,
  ReferenceNumber?: string,
  PONumber?: string,
  SalespersonId?: number,
  VersionNumber?: string,
  CheckedBy?: string,
  BranchId: number,
  AreaId: number,
  SubTotal?: number,
  Discount?: number,
  TaxValue?: number,
  TotalAmount?: number,
  CustomerNote?: string,
  TermsAndConditions?: string,
  Status?: number,
  series?: string,
  SalesQuotationItems: SalesQuotationItem[],
}
export interface SalesQuotationItem {
  itemid: number;
  price: number;
  qty: number;
  tax: number;
  total: number;
  description?: string;
  SalesQuotationId?: number; 
}
export interface QuotationLookup {
  QuotationId: number;
  QuotationNo: string;
}
