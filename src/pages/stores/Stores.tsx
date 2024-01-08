import { useState, useEffect } from 'react';
import { Avatar, Table, Tooltip, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { ROUTES } from 'src/utils/Constants';
import { formatPrice } from 'src/utils/Utils';
import { AiOutlineRight } from 'react-icons/ai';
import { Button, Card, Search, Breadcrumb, Layout } from 'src/components/_shared';
import { useNavigate } from 'react-router';

import SalesStatistics from 'src/components/stores/SalesStatistics';
import StoresByCountry from 'src/components/stores/StoresByCountry';
import { renderStoreStatusTag } from 'src/components/stores/Utils';
import { getDefaultApiUrl } from 'src/config';
import axios from 'axios';
import { openNotification } from 'src/utils/Notification';
import { Link } from 'react-router-dom';
import { ApiResponseModel } from 'src/types/_shared';

const Title = Typography.Title;

interface DataType {
    Id: string;
    Name: string;
    Description: string;
    Location: string;
    Contact: string;
    WorkingHours: string;
    ManagerName: string;
    ManagerId: string;
    TotalSales: number;
    StatusId: string;
    StoreStatusName: string;
    LastUpdated: string;

    // inventoryLevel: string; // low, medium, high
    // noEmployees: number  
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'Name',
        key: 'Name',
        render: (text) => <p>{text}</p>,
        sorter: (a, b) => a.Name.localeCompare(b.Name),
        filterSearch: true,
    },
    {
        title: 'Location',
        dataIndex: 'Location',
        key: 'Location',
        render: (text) => <p>{text}</p>,
        sorter: (a, b) => a.Location.localeCompare(b.Location),
        filterSearch: true,
    },
    {
        title: 'Contact',
        dataIndex: 'Contact',
        key: 'Contact',
        render: (text) => <p>{text}</p>,
        sorter: (a, b) => a.Contact.localeCompare(b.Contact)
    },
    {
        title: 'Working hours',
        dataIndex: 'WorkingHours',
        key: 'WorkingHours',
        render: (text) => <p>{text}</p>,
        sorter: (a, b) => a.WorkingHours.localeCompare(b.WorkingHours)
    },
    {
        title: 'Manager',
        dataIndex: 'ManagerName',
        key: 'ManagerName',
        render: (text, record) => (
            <Link
                to={ROUTES.EditUser.replace(":id", record.ManagerId)}
                className='flex justify-start items-center cursor-pointer hover:text-blue-500'
            >
                <Avatar size="default" src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=4" />
                <p className='ml-2'>{text}</p>
            </Link>
        ),
        sorter: (a, b) => a.ManagerName.localeCompare(b.ManagerName),
        filterSearch: true
    },
    {
        title: 'Total Sales',
        dataIndex: 'TotalSales',
        key: 'TotalSales',
        render: (text: number) => <p className='font-semibold'>{formatPrice(text)}</p>,
        sorter: (a, b) => a.TotalSales - b.TotalSales,
        defaultSortOrder: "descend"
    },
    {
        title: 'Status',
        dataIndex: 'StoreStatusName',
        key: 'StoreStatusName',
        render: (text) => renderStoreStatusTag(text),
    },
    {
        title: 'Last Updated',
        dataIndex: 'LastUpdated',
        key: 'LastUpdated',
        render: (text) => <p>{text}</p>,
        sorter: (a, b) => a.LastUpdated.localeCompare(b.LastUpdated)
    }
];


export default function Stores() {

    // navigation
    const navigate = useNavigate();

    // states
    const [initialStoreData, setInitialStoreData] = useState<DataType[]>([]);
    const [storesData, setStoresData] = useState<DataType[]>([]);
    const [storesLoading, setStoresLoading] = useState<boolean>(true);

    // effects
    useEffect(() => {
        fetchStores();
    }, []);


    // handlers
    const handleSearch = (value: string) => {
        if (!value) {
            setStoresData(initialStoreData);
            return;
        }

        const filteredStoreData = initialStoreData.filter(x => {
            return Object.values(x).some(item => item.toString().includes(value))
        })

        setStoresData(filteredStoreData);
    }


    // helpers
    const fetchStores = async () => {
        try {
            const BASE_URL = getDefaultApiUrl();
            const result = await axios.get<ApiResponseModel>(`${BASE_URL}/api/stores/GetAll`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });

            if (result.data) {
                const { Data } = result.data;

                setStoresData(Data);
                setInitialStoreData(Data);
            }
        }
        catch (err: any) {
            console.log(err);
            openNotification("error");
        }
        finally {
            setStoresLoading(false);
        }
    }

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
                        type='secondary'
                        shape="circle"
                        icon={<AiOutlineRight />}
                        onClick={() => navigate(ROUTES.StoresEdit.replace(":id", record.Id))}
                    />
                </Tooltip>
            </div>),
        },)
    }

    return (
        <Layout>
            <div className="w-full flex flex-col items-start">
                <div className="flex items-center">       
                    <Breadcrumb
                        items={[
                            {
                                title: "Stores"
                            }
                        ]}
                    />
                </div>
                <Title level={2} className='ml-4'>Stores</Title>

            </div>


            <Card className='w-full flex flex-col justify-between items-center mb-4'>
                <div className='w-full flex justify-between items-center mb-4'>
                    <Search className='w-64' placeholder='Search store ...' onChange={handleSearch} />
                    <Button
                        type='secondary'
                        className='flex justify-center items-center'
                        icon={<PlusOutlined />}
                        onClick={() => navigate(ROUTES.StoresCreate)}
                    >
                        Add 
                    </Button>
                </div>

                <Table
                    rowKey={(record) => record.Id}
                    size='middle'
                    className='w-full'
                    loading={storesLoading}
                    dataSource={storesData}
                    columns={columns}
                    pagination={{
                        pageSize: 6
                    }}

                />
            </Card>

            <SalesStatistics />

            <StoresByCountry />

        </Layout>
    )
}
