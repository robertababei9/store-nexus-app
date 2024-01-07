import jwt from 'jwt-decode';
import { AuthResponse, User } from "../types";



export const setAuthentication = (data: AuthResponse) => {
    localStorage.setItem("accessToken", data.access_token);
    localStorage.setItem("refreshToken", data.refresh_token);

    return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        loading: false,
        currentUser: jwt(data.access_token) as User,
        needsToCreateCompany: data.needsToCreateCompany,
        rolePermissions: data.rolePermissions
    }
}

export const getTokens = () => {
    const access_token = localStorage.getItem("accessToken")
    const refresh_token = localStorage.getItem("refreshToken")
    return {
        access_token,
        refresh_token,
    }
}

export const revoleAuthentication = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    return {
        accessToken: null,
        refreshToken: null,
        loading: false,
        currentUser: null,
        rolePermissions: null,
    }
}