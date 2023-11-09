import { InvoiceFormType } from "src/types/invoices";
import InvoiceTemplateDefault from './InvoiceTemplateDefault';

type CreateInvoiceStepTwoProps = {
    invoiceData: InvoiceFormType | null
}


export default function CreateInvoiceStepTwo({
  invoiceData
}: CreateInvoiceStepTwoProps) {

  return (
    <>
        <InvoiceTemplateDefault invoiceData={invoiceData} showSendEmail={true}/>
    </>
  )
}
