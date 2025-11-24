export interface Series {
    Id?: string;
    SeriesCode: string;
    SeriesName: string;
    Separator: string;
    PaddingLength: string;
    ScreenCode_Id: string;
    ResetPolicy: ResetPolicy;
}

export enum ResetPolicy {
    yearly= 0,
    never= 1
}

export interface ScreenCode{
    Screen_ID: string;
    Screen_Name: string;
}
export interface SeriesForTables{
  SeriesCode: string,
  SeriesNumber: string;
  Separator: string;
  FinelSeriesCodeAndSeriesNumber: string;
}
