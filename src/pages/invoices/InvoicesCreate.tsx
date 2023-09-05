import { lazy, useState, useEffect, useRef } from 'react';
import { Typography } from 'antd';
import { Steps } from 'antd';
import { useForm } from 'react-hook-form';

import { Breadcrumb, Layout, Button } from 'src/components/_shared';
import { InvoiceFormType } from 'src/types/invoices';
import CreateInvoiceStepOne from 'src/components/invoices/CreateInvoiceStepOne';
import { setData } from 'src/features/invoices/invoicesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import axios from 'axios';
import { openNotification } from 'src/utils/Notification';
import { ROUTES } from 'src/utils/Constants';

const CreateInvoiceStepTwo = lazy(() => import("src/components/invoices/CreateInvoiceStepTwo"));
const CreateInvoiceStepThree = lazy(() => import("src/components/invoices/CreateInvoiceStepThree"));

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

    // ref
    const layoutRef = useRef<null | HTMLDivElement>(null);

    // states
    const [current, setCurrent] = useState(0);
    const [nextLoading, setNextLoading] = useState<boolean>(false);

      // form
    const methods = useForm<InvoiceFormType>({
        defaultValues: {
            InvoiceNo: "to-do-something-with-this-id",
            Items: [
                {
                    Name: "",
                    Description: "",
                    Qty: 1,
                    Price: 1
                }
            ],
            Tax: 0,                   // percentage
            Discount: 0,              // percentage
            Subtotal: 1,              // sum of all items
            TaxSubtotal: 0,           // tax from subtotal
            DiscountSubtotal: 0,      // discount from subtotal
            Total: 1                  // subtotal & tax & discount
        }
    });

    // redux
    const dispatch = useDispatch();
    const { data: invoiceData, sendEmail } = useSelector(
        (state: RootState) => state.invoices
    )

    // effects
    useEffect(() => {
        // We will scroll at the top of the page in the LAST STEP
        if (current == 2 && window) {
            window.scrollTo({top: 0, left: 0, behavior: "smooth"})
            layoutRef.current!.scrollTop = 0;
        }
    }, [current]);

    // handlers
    const handleNext = async () => {
        if (current == 0) {
            const isValid = await methods.trigger();

            if (!isValid) {
                return;
            }
            
            dispatch(setData(methods.getValues()));
        }

        if (current == 1) {
            setNextLoading(true);


            try {
                const body =  methods.getValues();
                const BASE_URL = "https://store-nexus-app.azurewebsites.net";
                // const BASE_URL = "https://localhost:7268";

                const result = await axios.post(`${BASE_URL}/api/invoices/add`, body, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                      }  
                });
            } 
            catch(err: any) {
                console.log("err = ", err);
                openNotification("error");
                return;
            }
            finally {
                setNextLoading(false);
            }

        }



        setCurrent(prev => prev + 1);
    }

    const items = steps.map((item) => ({ key: item.title, title: item.title }));


    return (
        <div  className='w-full h-full flex flex-col justify-start items-start '>
            <Layout ref={layoutRef} className='relative'>
                <div className="flex items-center">
                    <Title level={2}>Create</Title>
                    <Breadcrumb
                        items={[
                            {
                                title: "Invoices",
                                path: ROUTES.Invoices
                            },
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
                            <div className='w-full flex justify-center'>
                                <CreateInvoiceStepTwo invoiceData={invoiceData}/>
                            </div>   
                        )
                    }

                    {
                        current == 2 && (
                            <CreateInvoiceStepThree invoiceData={invoiceData} sendEmail={sendEmail}/>
                        )
                    }

                </div>
            </Layout>

            {
                current === 2 ? (
                    // Step 3 will not have the bar down -- unecessary -- free up the space 
                    <></>
                ) : (
                    <div className='w-full flex justify-between items-center bg-primary px-6 py-4'>
                        {
                            ([1,2].includes(current)) ? (
                                <Button onClick={() => setCurrent(prev => prev - 1)}>Previous</Button>
                            ) : (
                                <div></div>
                            )
                        }
                        {
                            (current < steps.length - 1) ? (
                                <Button onClick={handleNext} loading={nextLoading}>
                                    {
                                        current == 1 ? 
                                        sendEmail ? "Send and Create" : "Create" 
                                        : 
                                        "Next"
                                    }
                                </Button>
                            ) : (
                                <div></div>
                            )
                        }
                    </div>
                )
            }



        </div>
    )
}
