import { Typography } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ClipLoader } from 'react-spinners';
import { Breadcrumb, Layout } from 'src/components/_shared';
import InvoiceTemplateDefault from 'src/components/invoices/InvoiceTemplateDefault'
import { InvoiceFormType } from 'src/types/invoices';
import { ROUTES } from 'src/utils/Constants';

const Title = Typography.Title;

export default function InvociesView() {

    // states
    const [invoiceData, setInvoiceData] = useState<InvoiceFormType | null>(null)
    const [loading, setLoading] = useState<boolean>(true);

    const params = useParams();

    // get data for invoice with id = ...
    useEffect(() => {
        getInvoiceData();
    }, []);

    const getInvoiceData = async () => {
        try {
            const BASE_URL = "https://store-nexus-app.azurewebsites.net";
            // const BASE_URL = "https://localhost:7268";
            const result = await axios.get<InvoiceFormType>(`${BASE_URL}/api/invoices/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }  
            });

            console.log("Data = ", result.data);
            setInvoiceData(result.data);
        }
        catch (err: any) {
            console.log("Err: ", err);
        }
        finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col w-full h-full items-center justify-center">
                <p className='animate-pulse text-gray-400 font-semibold text-2xl mb-8'>Please wait while we get the invoice data</p>
                <ClipLoader color="#4F46E5" loading size={45} />
            </div>
        )
    }

    return (
        <Layout className='items-center '>
            <div className="w-full flex justify-start items-center ">
                <Title level={2}>View</Title>
                <Breadcrumb
                    items={[
                        {
                            title: "Invoices",
                            path: ROUTES.Invoices
                        },
                        {
                            title: "View"
                        }
                    ]}
                />
            </div>
            <InvoiceTemplateDefault invoiceData={invoiceData}/>
        </Layout>
    )
}
