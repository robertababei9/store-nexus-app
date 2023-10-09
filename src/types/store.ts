export type StoreDataType = {
    name: string;
    description?: string;
    manager?: {}; // type Manager,
    contactInfo?: string;
}

type CoordinatesType = {
  lat: string;
  lng: string;
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
  Location: string;
  LatLng: string;
  Contact: string;
  WorkingHours: string;
  ManagerId: string;
  StoreStatusId: string;
  
}