import jwt from 'jwt-decode';
import { AuthResponse, User } from "../types";



export const setToken = (data: AuthResponse) => {
    localStorage.setItem("accessToken", data.access_token);
    localStorage.setItem("refreshToken", data.refresh_token);
    return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        loading: false,
        currentUser: jwt(data.access_token) as User,
        needsToCreateCompany: data.needsToCreateCompany,
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

export const revokeToken = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    return {
        accessToken: null,
        refreshToken: null,
        loading: false,
        currentUser: null,
    }
}