import { LatLngType } from "./_shared";

export type StoreDtoType = {
  Id: string;
  Name: string;
  Description: string;
  Location: string;
  Contact: string;
  WorkingHours: string;
  ManagerName: string;
  ManagerId: string;
  TotalSales: string;
  StatusId: string;
  StoreStatusName: string;
  LastUpdated: string;
}

export type GroupedStoresByCountryType = {
  id: string;
  countryCode: string;
  name: string;
  noStores: number;
  coordinates: any[]
}

export type CreateStoreFormType = {
  Id: string | null;
  Name: string;
  Description: string;
  Contact: string;
  WorkingHours: string;
  ManagerId: string;
  StoreStatusId: string;
  
  // Location props
  Country: string;
  CountryCode: string;
  Location: string;
  LatLng: string;
}

export type StoreLocationGroup = {
  Id: string;
  Country: string;
  CountryCode: string;
  Stores: StoreLocationInfo[];
}

export type StoreLocationInfo = {
  StoreName: string;
  Lat: string;
  Lng: string;
}

export type UploadFileType = {
  StoreId: string;
  Blob: any;
}

export type FileType = {
  Name: string;
  CreatedBy: string;
  UploadedAt: string;
  fileType: string;
  Uri: string;
}