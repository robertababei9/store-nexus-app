export interface AuthResponse {
    access_token: string
    refresh_token: string
    token_type: string
    expires_in: number,
    needsToCreateCompany: boolean
    rolePermissions: RolePermissionsType
}

// This is the token that is returned from the server when a user logs in we're labeling it as current user
export interface User {
    email: string
    role: string;
    iat: number
    exp: number
    iss: string
    sub: string
}

// Keep the authentication state clean and simple //! Do not add states unless completely necessary
export interface AuthenticationState {
    currentUser: User | null
    accessToken: string | null

    loading: boolean
    refreshToken: string | null
    needsToCreateCompany: boolean,
    rolePermissions: RolePermissionsType | null
}

export type RolePermissionsType = string[];