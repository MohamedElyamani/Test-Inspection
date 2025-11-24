export interface AppCV {
    Id?: number,
    FullName: string,
    Email: string,
    Phone: string,
    CVUrl: string,
    Qualifications: string,
    JobRequestId: number,
    JobRequestTitle?: string,
    Status: number,
    IsInterviewed: boolean
}

export interface AppCVLookup{
    Id: number,
    Name: string
}
