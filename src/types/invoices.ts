export type InvoiceFormType = {
    CreatedDate: string;
    DueDate: string;
    InvoiceNo: string;
    BillTo: BillToType,
    BillFrom: BillFromType,
    Items: ItemType[];
    Notes: string;
    Subtotal: number;
    Tax: number;
    TaxSubtotal: number;
    Discount: number;
    DiscountSubtotal: number;
    Total: number;
};

type BillToType = {
    To: string;
    Email: string;
    Address: string;
}

type BillFromType = {
    From: string;
    Email: string;
    Address: string;
}

export type ItemType = {
    Name: string;
    Description: string;
    Qty: number;
    Price: number;
}