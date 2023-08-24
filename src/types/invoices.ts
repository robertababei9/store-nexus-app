export type InvoiceFormType = {
    dueDate: string;
    invoiceNo: string;
    billTo: BillToType,
    billFrom: BillFromType,
    items: ItemType[];
    notes: string;
    subtotal: number;
    tax: number;
    taxSubtotal: number;
    discount: number;
    discountSubtotal: number;
    total: number;
};

type BillToType = {
    to: string;
    email: string;
    address: string;
}

type BillFromType = {
    from: string;
    email: string;
    address: string;
}

export type ItemType = {
    name: string;
    description: string;
    qty: number;
    price: number;
}