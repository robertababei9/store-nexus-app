import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'src/redux/store';
import { InvoiceFormType } from 'src/types/invoices';
import { APP } from 'src/utils/Constants';
import { AppState } from './types';


const initialState: AppState = {
    isMenuCollapsed: APP.MENU_INITIALLY_COLLAPSED,

}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsMenuCollapsed: (state, action: PayloadAction<boolean>) => {
            state.isMenuCollapsed = action.payload;
        },

    },

});


export const { setIsMenuCollapsed } = appSlice.actions;


export default appSlice.reducer;