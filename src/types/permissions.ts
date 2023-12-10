export type AppPermissionsType = { [key: string]: PermissionItemType };

type PermissionItemType = {
    Path: string | string[] | null;
}

export type CreateRoleForm = {
    RoleId: string;
}