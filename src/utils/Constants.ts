export const ROUTES = {
    // public routes
    SignIn: "/login",
    ForgotPassword: "/forgot-password",
    UserInvitation: "/user-invitation",

    // private routes
    Dashboard: "/dashboard",

    Stores: "/stores",
    StoresEdit: "/stores/edit/:id",
    StoresCreate: "/stores/add",

    Invoices: "/invoices",
    InvoicesCreate: "/invoices/create",
    InvoicesView: "/invoices/:id",

    CreateCompany: "/create-company",
    Users: "/users",
    EditUser: "/users/edit/:id",
    AddUser: "/users/add",

    Settings: "/settings"
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

export enum InvoiceStatus {
    Sent = 0,
    Overdue = 1,
    Paid = 2,
}

export const InvoiceStatusToStringMap = {
    [InvoiceStatus.Sent]: "Sent",
    [InvoiceStatus.Overdue]: "Overdue",
    [InvoiceStatus.Paid]: "Paid"
}
export const APP = {
    MENU_MAX_WIDTH: 200,
    MENU_COLLAPSED_MAX_WIDTH: 70,
    LAYOUT_PADDING_X: 50
}