import { InvoiceFormType } from "src/types/invoices"

export type InvoicesState = {
    data: InvoiceFormType | null,
    sendEmail: boolean
}