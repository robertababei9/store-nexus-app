import { Avatar, Col, Input, Row, Table, Tag, Tooltip, Typography } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { ROUTES, StoreStatus, StoresStatusToStringMap } from 'src/utils/Constants';
import { formatPrice } from 'src/utils/Utils';
import { Button, Card, Search, Breadcrumb, Layout } from 'src/components/_shared';
import {  useNavigate } from 'react-router';

import SalesStatistics from 'src/components/stores/SalesStatistics';
import StoresByCountry from 'src/components/stores/StoresByCountry';
import { renderStoreStatusTag } from 'src/components/stores/Utils';

const Title = Typography.Title;

interface DataType {
    key: string;
    name: string;
    location: string;
    phoneNo: string;
    workingHours: string;
    manager: string;
    totalSales: number;
    status: string; // opened | closed | under renovation | building | to be opened | etc...
    lastUpdated: string;

    // inventoryLevel: string; // low, medium, high
    // noEmployees: number  
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <p>{text}</p>,
        sorter: (a, b) => a.name.localeCompare(b.name),
        filterSearch: true,
    },
    {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
        render: (text) => <p>{text}</p>,
        sorter: (a, b) => a.location.localeCompare(b.location),
        filterSearch: true,
    },
    {
        title: 'Contact',
        dataIndex: 'phoneNo',
        key: 'phoneNo',
        render: (text) => <p>{text}</p>,
        sorter: (a, b) => a.phoneNo.localeCompare(b.phoneNo)
    },
    {
        title: 'Working hours',
        dataIndex: 'workingHours',
        key: 'workingHours',
        render: (text) => <p>{text}</p>,
        sorter: (a, b) => a.workingHours.localeCompare(b.workingHours)
    },
    {
        title: 'Manager',
        dataIndex: 'manager',
        key: 'manager',
        render: (text, record) => (
            <div className='flex justify-start items-center cursor-pointer hover:text-blue-500'>
                <Avatar size="default" src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=4"/>
                <p className='ml-2'>{text}</p>
            </div>
        ),
        sorter: (a, b) => a.manager.localeCompare(b.manager),
        filterSearch: true
    },
    {
        title: 'Total Sales',
        dataIndex: 'totalSales',
        key: 'totalSales',
        render: (text: number) => <p className='font-semibold'>{formatPrice(text)}</p>,
        sorter: (a, b) => a.totalSales - b.totalSales,
        defaultSortOrder: "descend"
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text) => renderStoreStatusTag(text),
    },
    {
        title: 'Last Updated',
        dataIndex: 'lastUpdated',
        key: 'lastUpdated',
        render: (text) => <p>{text}</p>,
        sorter: (a, b) => a.lastUpdated.localeCompare(b.lastUpdated)
    }
];

const mockData: DataType[] = [
    {
        key: '1',
        name: 'Lidl Iasi',
        location: 'Romania, Iasi',
        phoneNo: '0745263777',
        workingHours: '08:00 - 22:00',
        manager: 'Robert Ababei',
        totalSales: 20000,
        status: 'Open',
        lastUpdated: new Date(Date.now()).toLocaleString(),
    },
    {
        key: '2',
        name: 'Lidl Bacau',
        location: 'Romania, Bacau',
        phoneNo: '0745263777',
        workingHours: '08:00 - 22:00',
        manager: 'Robert Ababei',
        totalSales: 17850,
        status: 'Temporarily Closed',
        lastUpdated: new Date(Date.now()).toLocaleString()
    },
    {
        key: '3',
        name: 'Lidl Botosani',
        location: 'Romania, Botosani',
        phoneNo: '0745263777',
        workingHours: '08:00 - 22:00',
        manager: 'Robert Ababei',
        totalSales: 12000,
        status: 'Closed',
        lastUpdated: new Date(Date.now()).toLocaleString()
    },
    {
        key: '4',
        name: 'Lidl Victoriei 1 Bucuresti',
        location: 'Romania, Bucuresti',
        phoneNo: '0745263777',
        workingHours: '08:00 - 22:00',
        manager: 'Razvan Ababei',
        totalSales: 19600,
        status: 'Under Renovation',
        lastUpdated: new Date(Date.now()).toLocaleString()
    },
    {
        key: '5',
        name: 'Lidl Victoriei 2 Bucuresti',
        location: 'Romania, Bucuresti',
        phoneNo: '0745263777',
        workingHours: '08:00 - 22:00',
        manager: 'Ioana Ababei',
        totalSales: 28500,
        status: 'Coming Soon',
        lastUpdated: new Date(Date.now()).toLocaleString()
    },
    {
        key: '6',
        name: 'Lidl Timisoara',
        location: 'Romania, Timisoara',
        phoneNo: '0745263777',
        workingHours: '08:00 - 22:00',
        manager: 'Dinu Ababei',
        totalSales: 22200,
        status: 'Permanently Closed',
        lastUpdated: new Date(Date.now()).toLocaleString()
    },
]

export default function Stores() {

    const navigate = useNavigate();

    // adding the actions column so we can use navigate
    if (!columns.find(x => x.key == 'actions')) {
        // we add it only ONCE
        columns.push({
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (<div>
                <Tooltip title="Edit">
                    <Button
                        className='bg-white flex justify-center items-center' 
                        type='primary' 
                        shape="circle" 
                        icon={<EditOutlined />} 
                        onClick={() => navigate(ROUTES.StoresEdit.replace(":id", record.key))}
                    />
                </Tooltip>
            </div>),
        },)
    }

  return (
    <Layout>
        <div className="flex items-center">
            <Title level={2}>Stores</Title>
            <Breadcrumb
                items={[
                  {
                    title: "Stores"
                  }
                ]}
              />
        </div>

        <Card className='w-full flex flex-col justify-between items-center mb-4'>
            <div className='w-full flex justify-between items-center mb-4'>
                <Search className='w-64' placeholder='Search store ...' />
                <Button 
                    className='flex justify-center items-center' 
                    icon={<PlusOutlined />}
                    onClick={() => navigate(ROUTES.StoresEdit.replace(":id", "0"))}
                >
                        Add
                </Button>
            </div>

            <Table 
                size='middle' 
                className='w-full' 
                dataSource={mockData} 
                columns={columns}

            />
        </Card>

        <SalesStatistics />

        <StoresByCountry />

    </Layout>
  )
}
