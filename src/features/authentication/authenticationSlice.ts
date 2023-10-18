import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'src/redux/store';
import { AuthenticationState, AuthResponse } from './types';

import { setToken, revokeToken } from './services/authenticationServices';

const initialState: AuthenticationState = {
    currentUser: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    needsToCreateCompany: false
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
        },
        setNeedsToCreateCompany: (state, action: PayloadAction<boolean>) => {
            state.needsToCreateCompany = action.payload;
        }
    },

});


export const { 
    loggedOut, 
    tokenReceived, 
    setNeedsToCreateCompany 
} = authenticationSlice.actions;

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