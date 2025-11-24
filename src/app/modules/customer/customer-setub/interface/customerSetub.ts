export interface CustomerSetub {
     Id?: number,
    EnName: string,
    ArName: string,
    Address: string,
    PrimaryMobileNumber: string,
    SecondryMobileNumber?: string,
    Email: string,
    ContactPerson: string,
    Tenant_ID?: string
}
export interface customerLookup{
    Id: number;
    EnName: string;
    ArName: string;
}