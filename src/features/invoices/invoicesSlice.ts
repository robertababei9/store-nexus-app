import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'src/redux/store';
import { InvoicesState } from './types';
import { InvoiceFormType } from 'src/types/invoices';


const initialState: InvoicesState = {
    data: null,
    sendEmail: true,

}

export const authenticationSlice = createSlice({
    name: 'invoices',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<InvoiceFormType>) => {
            return {
                ...state,
                data: action.payload
            }
        },
        setSendEmail: (state, action: PayloadAction<boolean>) => {
            return {
                ...state,
                sendEmail: action.payload
            }
        }
    },

});


export const { setData, setSendEmail } = authenticationSlice.actions;


export default authenticationSlice.reducer;