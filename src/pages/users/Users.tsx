import React, { useEffect, useState } from 'react';
import { Avatar, Table, Input, Space, Tooltip, Typography, Skeleton } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { AiOutlineHome } from "react-icons/ai";
import { useNavigate } from 'react-router';
import { ROUTES } from 'src/utils/Constants';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { openNotification } from 'src/utils/Notification';

import { Button, Card, Search, Breadcrumb, Layout } from 'src/components/_shared';


const Title = Typography.Title;


interface DataType {
    key: string;
    name: string;
    email: string;
    role: string,
    location: string;
    store: string;
    phoneNo: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => (
            <div className='flex justify-start items-center cursor-pointer hover:text-blue-500'>
                <Avatar size="default" src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=4" />
                <p className='ml-2'>{text}</p>
            </div>
        ),
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'E-mail',
        dataIndex: 'email',
        render: (text) => <p>{text}</p>,
        sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
        title: "Role",
        dataIndex: 'role',
        key: 'roleDept',
        render: (text) => <p>{text}</p>,
        sorter: (a, b) => a.role.localeCompare(b.role),
    },
    {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
        render: (text) => <p>{text}</p>,
        sorter: (a, b) => a.location.localeCompare(b.location),
    },
    {
        title: 'Store',
        dataIndex: 'store',
        render: (text) => <p>{text}</p>,
        sorter: (a, b) => a.store.localeCompare(b.store)
    },
    {
        title: 'Phone number',
        dataIndex: 'phoneNo',
        key: 'phoneNo',
    },

];

const data: DataType[] = [
    {
        key: '1',
        name: 'Razvan Ababei',
        email: "razvanababei@yahoo.com",
        role: 'Admin',
        location: "Iasi",
        store: 'Admir',
        phoneNo: "08593"
    },
    {
        key: '2',
        name: 'Robert Ababei',
        email: "robertababei@yahoo.com",
        role: 'Admin',
        location: "Iasi",
        store: 'Admir',
        phoneNo: "51325"
    },
    {
        key: '3',
        name: 'Dinu Ababei',
        email: "dinuababei@yahoo.com",
        role: 'Admin',
        location: "Iasi",
        store: 'Admir',
        phoneNo: "3333"
    },
    {
        key: '4',
        name: 'Codrin Ababei',
        email: "codrinababei@yahoo.com",
        role: 'Admin',
        location: "Iasi",
        store: 'Admir',
        phoneNo: "056243"
    },
    {
        key: '5',
        name: 'Dana Ababei',
        email: "danaababei@yahoo.com",
        role: 'Admin',
        location: "Iasi",
        store: 'Admir',
        phoneNo: "007382"
    },
    {
        key: '6',
        name: 'Sorin Ababei',
        email: "sorinababei@yahoo.com",
        role: 'Admin',
        location: "Iasi",
        store: 'Admir',
        phoneNo: "123"
    },
];

export default function Users()  {
    <Skeleton active/>

    const navigate = useNavigate();

    //states
    const [tableData, setTableData] = useState<DataType[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState<boolean>(false);


    // effects
    useEffect(() => {
        // API: get invoices
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            setLoading(true);
            const BASE_URL = "https://store-nexus-app.azurewebsites.net";
            const result = await axios.get(`${BASE_URL}/api/users/GetAll`, {
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
            setLoading(false);
        }
    }

    // const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    //     setSelectedRowKeys(newSelectedRowKeys);
    // };

    // const rowSelection = {
    //     selectedRowKeys,
    //     onChange: onSelectChange,
    // };

    const filteredData = data.filter((item) =>
        Object.values(item).some((value) => {
            if (typeof value === 'number') {
                return value.toString().includes(searchText);
            }
            if (value && typeof value === 'string') {
                return value.toLowerCase().includes(searchText.toLowerCase());
            }
            return false;
        })
    );



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
                        onClick={() => navigate(ROUTES.AddUser.replace(":id", record.key))}
                    />
                </Tooltip>
            </div>),
        },)
    }


    return (

        <Layout>
            <div className="flex items-center">
                <Title level={2}>Users</Title>
                <Breadcrumb
                    items={[
                        {
                            title: "Users"
                        }
                    ]}
                />
            </div>

            <Card className='w-full flex flex-col justify-between items-center mb-4'>
                <div className='w-full flex justify-between items-center mb-4'>
                    <Search className='w-64' placeholder='Search user ...' />
                    trb sa alegem
                    <div>
                        <Space direction='vertical' style={{ marginLeft: '24px' }}>
                            <Input
                                className='w-64'
                                placeholder='Search user...'
                                prefix={<SearchOutlined />}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </Space>
                    </div>

                    <Button
                        type='secondary'
                        className='flex justify-center items-center'
                        icon={<PlusOutlined />}
                        onClick={() => navigate(ROUTES.AddUser.replace(":id", "0"))}
                    >
                        Add user
                    </Button>
                </div>

                <Table
                    size='middle'
                    className='w-full'
                    dataSource={filteredData}
                    columns={columns}
                />
            </Card>



        </Layout>

        ////////


        // <div className='w-full h-full overflow-y-auto'>
        //     <div className='relative w-full h-full flex flex-col items-start sm:px-16 px-4 sm:py-8 py-6 z-30'>
        //         <Card className='w-full flex flex-col justify-between items-center mb-4'>
        //             <div className='w-full flex justify-between items-center mb-4'>
        //                 <Space direction='vertical' style={{ marginLeft: '24px' }}>
        //                     <Input
        //                         placeholder='Search user'
        //                         prefix={<SearchOutlined />}
        //                         value={searchText}
        //                         onChange={(e) => setSearchText(e.target.value)}
        //                         style={{ width: '200px' }}
        //                     />
        //                 </Space>
        //             </div>
        //           
        //         </Card>
        //     </div>
        // </div>



    );
}

