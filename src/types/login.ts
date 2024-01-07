import { RolePermissionsType } from "src/features/authentication/types";

export type LoginResponse = {
    token: string;
    needsToCreateCompany: boolean;
    // rolePermissions: {[key: string]: boolean}; // e.g. ViewDashboard: 1, EditDashboard: 0, ViewStores: 1, ...
    rolePermissions: RolePermissionsType
}

export type LoginFormValues = {
    Email:string;
    Password:string;
}