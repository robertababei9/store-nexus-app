import { configureStore, combineReducers } from '@reduxjs/toolkit'

import authenticationReducer from 'src/features/authentication/authenticationSlice';
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
    authentication:  authenticationReducer,

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;