export interface Project {
    Id?: number,
    Name: string,
    CompanyId: number,
    CustomerId: number,
    LocationId: number,
    ProjectDate: Date,
    Tenant_ID?: string,
    CompanyName?: string,
    CustomerEnglishName?: string,
    CustomerArabicName?: string,
    LocationName?: string
}

export interface projectLookup{
    Id: number;
    Name: string;
}
