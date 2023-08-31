import { useEffect, useState } from 'react';
import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { Button, Card, Search, Breadcrumb, Layout } from 'src/components/_shared';
import { formatPrice } from 'src/utils/Utils';
import { InvoiceStatus, ROUTES } from 'src/utils/Constants';
import { renderInvoiceStatusTag } from 'src/components/invoices/Utils';
import axios from 'axios';
import { openNotification } from 'src/utils/Notification';

const Title = Typography.Title;

interface DataType {
    InvoiceId: string;
    InvoiceNo: string; // unique natural string key with invoice number
    BillTo: string; // email where the invoice was sent
    CreatedDate: string;
    DueDate: string;
    Status: string;
    Total: number;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Invoice #',
        dataIndex: 'InvoiceNo',
        key: 'InvoiceNo',
        render: (text) => <p>{text}</p>,
        sorter: (a, b) => a.InvoiceNo.localeCompare(b.InvoiceNo),
        filterSearch: true,
    },
    {
        title: 'Bill To',
        dataIndex: 'BillTo',
        key: 'BillTo',
        render: (text) => <p>{text}</p>,
        sorter: (a, b) => a.BillTo.localeCompare(b.BillTo),
        filterSearch: true,
    },
    {
        title: 'Created Date',
        dataIndex: 'CreatedDate',
        key: 'CreatedDate',
        render: (text) => <p>{text}</p>,
        sorter: (a, b) => a.CreatedDate.localeCompare(b.CreatedDate),
        filterSearch: true,
    },
    {
        title: 'Due Date',
        dataIndex: 'DueDate',
        key: 'DueDate',
        render: (text) => <p>{text}</p>,
        sorter: (a, b) => a.DueDate.localeCompare(b.DueDate),
        filterSearch: true,
    },
    {
        title: 'Status',
        dataIndex: 'Status',
        key: 'Status',
        render: (text) => <p>{renderInvoiceStatusTag(text)}</p>,
        // sorter: (a, b) => a.Status.localeCompare(b.Status),
        filterSearch: true,
    },
    {
        title: 'Total',
        dataIndex: 'Total',
        key: 'Total',
        render: (text) => <p>{formatPrice(text)}</p>,
        sorter: (a, b) => a.Total - b.Total,
        filterSearch: true,
    }
];

const mockData: DataType[] = [
    {
        InvoiceId: "random-id-1",
        InvoiceNo: 'Invoice#001',
        BillTo: 'robert.srl@gmail.com',
        CreatedDate: '22 Aug 2023',
        DueDate: '28 Sep 2023',
        Status: "Sent",
        Total: 1450,
    },
    {
        InvoiceId: "random-id-2",
        InvoiceNo: 'Invoice#002',
        BillTo: 'razvan.moto@motoemotion.com',
        CreatedDate: '10 Aug 2023',
        DueDate: '10 Sep 2023',
        Status: "Overdue",
        Total: 1200,
    },
    {
        InvoiceId: "random-id-3",
        InvoiceNo: 'Invoice#003',
        BillTo: 'contact@kaufland.de',
        CreatedDate: '05 Aug 2023',
        DueDate: '05 Sep 2023',
        Status: "Sent",
        Total: 12000,
    },
    {
        InvoiceId: "random-id-4",
        InvoiceNo: 'Invoice#004',
        BillTo: 'marfuri.romania@marfuriro.ro',
        CreatedDate: '22 Aug 2023',
        DueDate: '22 Nov 2023',
        Status: "Paid",
        Total: 25000,
    },
];


export default function Invoices() {

    const navigate = useNavigate();

    // states
    const [tableData, setTableData] = useState<DataType[]>([]);
    const [loading, setloading] = useState<boolean>(false);

    // effects
    useEffect(() => {
        // API: get invoices
        getInvoices();
    }, []);


    // helpers
    const getInvoices = async () => {
        try {
            setloading(true);

            const BASE_URL = "https://store-nexus-app.azurewebsites.net";
            // const BASE_URL = "https://localhost:7268";
            const result = await axios.get(`${BASE_URL}/api/invoices/GetAll`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }  
            });

            if (result.data) {
                setTableData(result.data);
            }
        }
        catch (err: any) {
            console.log(err);
            openNotification("error");
        }
        finally {
            setloading(false);
        }

    }


    return (
        <Layout>
            <div className="flex items-center">
                <Title level={2}>Invoices</Title>
                <Breadcrumb
                    items={[
                    {
                        title: "Invoices"
                    }
                    ]}
                />
            </div>

            <Card className='w-full flex flex-col justify-between items-center mb-4'>
                <div className='w-full flex justify-between items-center mb-4'>
                    <div></div>
                    <Button 
                        className='flex justify-center items-center' 
                        icon={<PlusOutlined />}
                        onClick={() => navigate(ROUTES.InvoicesCreate)}
                    >
                            Create
                    </Button>
                </div>

                <Table 
                    size='middle' 
                    className='w-full' 
                    dataSource={tableData} 
                    columns={columns}
                    loading={loading}

                />
            </Card>

        </Layout>
    )
}
