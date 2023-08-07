import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'src/redux/store';
import { AuthenticationState, AuthResponse } from './types';

import { setToken, revokeToken } from './services/authenticationServices';

const initialState: AuthenticationState = {
    currentUser: {
        email: "robert@gmail.com",
        role: "Admin",
        exp: 123456,
        iat: 123456,
        iss: "asd123",
        sub: "GUID-random-id"
    },
    accessToken: null,
    refreshToken: null,
    loading: false,
}

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        tokenReceived: (state, action: PayloadAction<AuthResponse>) => {
            return {
                ...state,
                ...setToken(action.payload),
            }
        },
        loggedOut: (state, action: PayloadAction<null>) => {
            return {
                ...state,
                ...revokeToken(),
            }
        }
    },

});


export const { loggedOut, tokenReceived } = authenticationSlice.actions;

export const authStatus = (state: RootState) => {
    if (state.authentication.loading) {
        return "loading";
    } else if (state.authentication.currentUser) {
        return "loggedIn";
    } else {
        return "loggedOut";
    }
}

export default authenticationSlice.reducer;