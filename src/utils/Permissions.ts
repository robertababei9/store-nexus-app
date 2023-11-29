import { AppPermissionsType } from "src/types/permissions";
import { ROUTES } from "./Constants";
import { RolePermissionsType } from "src/features/authentication/types";

export const PERMISSIONS: AppPermissionsType = {
    "ViewDashboard": {
        Path: ROUTES.Dashboard,
    },
    "EditDashboard": {
        Path: null,
    },

    "ViewStore": {
        Path: ROUTES.Stores,
    },
    "EditStore": {
        Path: ROUTES.StoresEdit,
    },
    "CreateStore": {
        Path: ROUTES.StoresCreate,
    },
    "DeleteStore": {
        Path: null,
    },

    "ViewInvoice": {
        Path: [ROUTES.Invoices, ROUTES.InvoicesView],
    },
    "CreateInvoice": {
        Path: ROUTES.InvoicesCreate,
    },

    "ViewUser": {
        Path: ROUTES.Users,
    },
    "EditUser": {
        Path: ROUTES.EditUser,
    },
    "CreateUser": {
        Path: ROUTES.AddUser,
    },
    "DeleteUser": {
        Path: null,
    },

    "Settings": {
        Path: ROUTES.Settings
    }
}


export const getPathsFromRolePermissions = (rolePermissions: RolePermissionsType | null): string[] => {
    if (rolePermissions == null) return [];

    const resultPaths: string[] = [];
    rolePermissions.forEach(key => {
        // we have the permissions and it have a PATH ( is not an action, it's a path permission )
        if (PERMISSIONS[key] && PERMISSIONS[key]["Path"]) {
            const routePaths = PERMISSIONS[key]["Path"];    // get the path
            if (Array.isArray(routePaths)) {                // does it have more paths ?
                resultPaths.push(...routePaths)             // then -> add them all
            }
            else {
                resultPaths.push(routePaths as string)
            }
        }
    })


    // console.log("4. resultPaths = ", resultPaths);
    return resultPaths;
}