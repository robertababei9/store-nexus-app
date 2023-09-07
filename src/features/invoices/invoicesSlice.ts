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
            // TODO: To find a solution for nested objects
            const { BillTo, BillFrom, Items, ...otherData } = action.payload;
            const copiedItems = Items.map(item => ({ ...item }));

            state.data = {
                ...otherData,
                BillTo: {
                    ...BillTo,
                },
                BillFrom: {
                    ...BillFrom,
                },
                Items: copiedItems,
            };
        },
        setSendEmail: (state, action: PayloadAction<boolean>) => {
            state.sendEmail = action.payload
        }
    },

});


export const { setData, setSendEmail } = authenticationSlice.actions;


export default authenticationSlice.reducer;