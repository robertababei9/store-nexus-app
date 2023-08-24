import { useState } from 'react';
import { Typography } from 'antd';
import { Steps } from 'antd';

import { Breadcrumb, Layout, Button } from 'src/components/_shared';
import CreateInvoiceStepOne from 'src/components/invoices/CreateInvoiceStepOne';
import { useForm } from 'react-hook-form';
import { InvoiceFormType } from 'src/types/invoices';

const Title = Typography.Title;

const steps = [
    {
      title: 'Create',
      content: 'First-content',
    },
    {
      title: 'Confirmation',
      content: 'Second-content',
    },
    {
      title: 'Summary',
      content: 'Last-content',
    },
  ];


export default function Invoices() {

    // states
    const [current, setCurrent] = useState(0);

      // form
    const methods = useForm<InvoiceFormType>({
        defaultValues: {
        items: [
            {
            name: "",
            description: "",
            qty: 1,
            price: 1
            }
        ],
        tax: 0,                   // percentage
        discount: 0,              // percentage
        subtotal: 1,              // sum of all items
        taxSubtotal: 0,           // tax from subtotal
        discountSubtotal: 0,      // discount from subtotal
        total: 1                  // subtotal & tax & discount
        }
    });

    // handlers
    const handleNext = async () => {
        if (current == 0) {
            const isValid = await methods.trigger();

            if (!isValid) {
                return;
            }
        }

        setCurrent(prev => prev + 1);
    }


    const items = steps.map((item) => ({ key: item.title, title: item.title }));


    return (
        <div className='w-full h-full flex flex-col justify-start items-start '>
            <Layout className='relative'>
                <div className="flex items-center">
                    <Title level={2}>Create Invoice</Title>
                    <Breadcrumb
                        items={[
                        {
                            title: "Create Invoice"
                        }
                        ]}
                    />
                </div>


                {/* Stepper Create -> Review -> Success */}
                <div className='flex justify-center w-full mt-4'>
                    <Steps className='max-w-xl' current={current} items={items} />
                </div>

                <div className='flex justify-start items-start w-full h-full mt-6'>

                    {
                        current == 0 && (
                            <CreateInvoiceStepOne methods={methods}/>
                        )
                    }

                    {
                        current == 1 && (
                            <p>Let's review the invoice again and confirm</p>
                        )
                    }

                    {
                        current == 2 && (
                            <p>The invoice has successfully created and sent to _____</p>
                        )
                    }

                </div>
            </Layout>

            <div className='w-full flex justify-between items-center bg-[#111827] px-6 py-4'>
                {
                    current > 0 ? (
                        <Button onClick={() => setCurrent(prev => prev - 1)}>Previous</Button>
                    ) : (
                        <div></div>
                    )
                }
                {
                    (current < steps.length - 1) ? (
                        <Button onClick={handleNext}>Next</Button>
                    ) : (
                        <div></div>
                    )
                }
            </div>

        </div>
    )
}
