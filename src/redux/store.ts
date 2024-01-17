import { configureStore, combineReducers } from '@reduxjs/toolkit'

import appReducer from 'src/features/app/appSlice';
import authenticationReducer from 'src/features/authentication/authenticationSlice';
import invoicesReducer from 'src/features/invoices/invoicesSlice';

import {
    persistReducer,
} from "redux-persist"
import storage from "redux-persist/lib/storage" //
import persistStore from 'redux-persist/es/persistStore';


const persistConfig = {
    key: "root",
    storage,
    version: 1,
    whitelist: ['authentication']
}


const rootReducer = combineReducers({
    app: appReducer,
    authentication:  authenticationReducer,
    invoices: invoicesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;