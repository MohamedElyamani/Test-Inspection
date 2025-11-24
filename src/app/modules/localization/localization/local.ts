export interface LocalizationItem {
  Translate: string;
  LocaleCode: string;
  Caption: string;
  Tooltip?: string | null;
  System?: boolean | null;
}

export interface Language {
  LocaleCode: string;
  DisplayName: string;
}

export interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  data?: T;
}