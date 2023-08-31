export const ROUTES = {
    // public routes
    SignIn: "/login",

    // private routes
    Dashboard: "/dashboard",
    Stores: "/stores",
    StoresEdit: "/stores/edit/:id"
    // Users: "/users"
}


export const COUNTRY_CODE = {
    UnitedStates: "USA",
    Germany: "DE",
    France: "FR",
    UnitedKingdom: "UK",
    Romania: "RO",
    Greece: "GR",
    Italy: "IT"
}

export enum StoreStatus {
    Open = 0,
    Closed = 1,
    TemporarilyClosed = 2,
    UnderRenovation = 3,
    ComingSoon = 4,
    PermanentlyClosed = 5,

};

export const StoresStatusToStringMap = {
    [StoreStatus.Open]: 'Open',

    [StoreStatus.Closed]: 'Closed',
    [StoreStatus.TemporarilyClosed]: 'Temporarily Closed',
    [StoreStatus.PermanentlyClosed]: 'Permanently Closed',
    
    [StoreStatus.UnderRenovation]: 'Under Renovation',
    [StoreStatus.ComingSoon]: 'Coming Soon',
}