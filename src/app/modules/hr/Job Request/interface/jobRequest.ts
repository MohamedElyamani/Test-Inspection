export interface JobRequest {
    Id?: number,
    DepartmentId: number,
    DepartmentName?: string,
    JobTitleId: number,
    JobTitleName?: string,
    JobDescription: string,
    NeededPositions: number,
    Status?: 0,
    RequestedAt?: string
}
