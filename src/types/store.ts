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