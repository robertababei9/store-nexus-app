export type AppPermissionsType = { [key: string]: PermissionItemType };

type PermissionItemType = {
    Path: string | string[] | null;
}

export type CreateRoleForm = {
    RoleName: string;
}

export type SaveRolePermissionsRequest = {
    rolePermissions: { [key: string]: boolean }
    
}
