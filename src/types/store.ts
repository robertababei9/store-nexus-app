import { LatLngType } from "./_shared";

export type StoreDataType = {
    name: string;
    description?: string;
    manager?: {}; // type Manager,
    contactInfo?: string;
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