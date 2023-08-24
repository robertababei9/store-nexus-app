import { Avatar, Col, Input, Row, Table, Tag, Tooltip, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { Button, Card, Search, Breadcrumb, Layout } from 'src/components/_shared';
import { formatPrice } from 'src/utils/Utils';
import { InvoiceStatus, ROUTES } from 'src/utils/Constants';
import { renderInvoiceStatusTag } from 'src/components/invoices/Utils';

const Title = Typography.Title;

interface DataType {

    InvoiceId: string;
    Reference: string; // unique natural string key with invoice number
    BillTo: string; // email where the invoice was sent
    CreatedDate: string;
    DueDate: string;
    Status: string;
    Total: number;

    // inventoryLevel: string; // low, medium, high
    // noEmployees: number  
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Invoice #',
        dataIndex: 'Reference',
        key: 'Reference',
        render: (text) => <p>{text}</p>,
        sorter: (a, b) => a.Reference.localeCompare(b.Reference),
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
        Reference: 'Invoice#001',
        BillTo: 'robert.srl@gmail.com',
        CreatedDate: '22 Aug 2023',
        DueDate: '28 Sep 2023',
        Status: "Sent",
        Total: 1450,
    },
    {
        InvoiceId: "random-id-2",
        Reference: 'Invoice#002',
        BillTo: 'razvan.moto@motoemotion.com',
        CreatedDate: '10 Aug 2023',
        DueDate: '10 Sep 2023',
        Status: "Overdue",
        Total: 1200,
    },
    {
        InvoiceId: "random-id-3",
        Reference: 'Invoice#003',
        BillTo: 'contact@kaufland.de',
        CreatedDate: '05 Aug 2023',
        DueDate: '05 Sep 2023',
        Status: "Sent",
        Total: 12000,
    },
    {
        InvoiceId: "random-id-4",
        Reference: 'Invoice#004',
        BillTo: 'marfuri.romania@marfuriro.ro',
        CreatedDate: '22 Aug 2023',
        DueDate: '22 Nov 2023',
        Status: "Paid",
        Total: 25000,
    },
];

export default function Invoices() {

    const navigate = useNavigate();


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
                    dataSource={mockData} 
                    columns={columns}

                />
            </Card>

        </Layout>
    )
}
