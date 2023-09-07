import { useEffect } from 'react';
import { AiOutlineCloudDownload } from 'react-icons/ai';

import InvoiceTemplateDefault from "./InvoiceTemplateDefault";
import { Button } from "../_shared";
import { InvoiceFormType } from 'src/types/invoices';

const FadeAnimation = require('react-reveal/Fade');

type CreateInvoiceStepThreeProps = {
    // To add when necessary
    invoiceData: InvoiceFormType | null,
    sendEmail?: boolean,
}


export default function CreateInvoiceStepThree({
    invoiceData,
    sendEmail
}: CreateInvoiceStepThreeProps) {


    // effects
    useEffect(() => {
        // We will scroll at the top of the page in the LAST STEP
        if (window) {
            window.scrollTo({top: 0, left: 0, behavior: "smooth"});
        }
    }, []);

    // handlers
    const handleDownload = () => {

    }

    return (
        <div className='w-full flex flex-col justify-start items-center pt-8'>
            <FadeAnimation delay={50}>
                {
                    sendEmail ? (
                        <p className="text-4xl text-gray-600 font-semibold">
                            Invoice created and sent successfully to <span className=" underline">{invoiceData?.BillTo.To}</span>
                        </p>
                    ) : (
                        <p className="text-3xl text-gray-500 font-semibold">
                            Invoice created successfully.
                        </p>
                    )
                }
            </FadeAnimation>
            <FadeAnimation delay={200}>
                <p className="text-xl text-gray-500 font-semibold mb-4 mt-2">You can download the invoice by clicking on this button</p>
            </FadeAnimation>
            <FadeAnimation bottom>
                <Button className="flex justify-center items-center mb-8" type="secondary" onClick={handleDownload}>
                    <AiOutlineCloudDownload size={24} className="mr-3"/>
                    Download
                </Button>
            </FadeAnimation>

            <InvoiceTemplateDefault invoiceData={invoiceData}/>
        </div>
    )
}
