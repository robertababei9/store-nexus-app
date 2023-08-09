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
    Open,
    Closed,
    TemporarilyClosed,
    UnderRenovation,
    ComingSoon,
    PermanentlyClosed,

};

export const StoresStatusToStringMap = {
    [StoreStatus.Open]: 'Open',

    [StoreStatus.Closed]: 'Closed',
    [StoreStatus.TemporarilyClosed]: 'Temporarily Closed',
    [StoreStatus.PermanentlyClosed]: 'Permanently Closed',
    
    [StoreStatus.UnderRenovation]: 'Under Renovation',
    [StoreStatus.ComingSoon]: 'Coming Soon',
}