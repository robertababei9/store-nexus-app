import React, { useEffect, useState } from 'react';
import { Avatar, Table, Input, Space, Typography, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { AiOutlineRight } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import { ROUTES } from 'src/utils/Constants';
import axios from 'axios';
import { openNotification } from 'src/utils/Notification';
import { Button, Card, Search, Breadcrumb, Layout } from 'src/components/_shared';
import { getDefaultApiUrl } from 'src/config';
import { UserResponse } from 'src/types/users';


const Title = Typography.Title;


interface DataType {
    Key: string;
    Name: string;
    Email: string;
    Role: string,
    Location: string;
    Store: string;
    PhoneNo: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'Name',
        key: 'Name',
        render: (text, record) => (
            <div className='flex justify-start items-center cursor-pointer hover:text-blue-500'>
                <Avatar size="default" src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=4" />
                <p className='ml-2'>{text}</p>
            </div>
        ),
        sorter: (a, b) => a.Name.localeCompare(b.Name),
    },
    {
        title: 'E-mail',
        dataIndex: 'Email',
        render: (text) => <p>{text}</p>,
        sorter: (a, b) => a.Email.localeCompare(b.Email),
    },
    {
        title: "Role",
        dataIndex: 'Role',
        key: 'Role',
        render: (text) => <p>{text}</p>,
        sorter: (a, b) => a.Role.localeCompare(b.Role),
    },
    {
        title: 'Location',
        dataIndex: 'Location',
        key: 'Location',
        render: (text) => <p>{text}</p>,
        sorter: (a, b) => a.Location.localeCompare(b.Location),
    },
    {
        title: 'Store',
        dataIndex: 'Store',
        render: (text) => <p>{text}</p>,
        sorter: (a, b) => a.Store.localeCompare(b.Store)
    },
    {
        title: 'Phone Number',
        dataIndex: 'PhoneNo',
        key: 'PhoneNo',
        render: (text) => <p>{text}</p>,
        sorter: (a, b) => a.Store.localeCompare(b.Store)
    },

];

export default function Users() {
    const navigate = useNavigate();

    //states
    const [tableData, setTableData] = useState<DataType[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState<boolean>(true);


    // effects
    useEffect(() => {
        // API: get invoices
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const BASE_URL = getDefaultApiUrl();
            const result = await axios.get<UserResponse[]>(`${BASE_URL}/api/users/GetAll`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });

            if (result.data) {
                setTableData(result.data.map(x => ({
                    Key: x.Id,
                    Name: x.FirstName + " " + x.LastName,
                    Email: x.Email,
                    Role: x.Role,
                    Location: x.Country + ", " + x.City,
                    Store: "Coming Soon",
                    PhoneNo: x.PhoneNumber
                })))
                // setTableData(result.data);
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


    // const filteredData = data.filter((item) =>
    //     Object.values(item).some((value) => {
    //         if (typeof value === 'number') {
    //             return value.toString().includes(searchText);
    //         }
    //         if (value && typeof value === 'string') {
    //             return value.toLowerCase().includes(searchText.toLowerCase());
    //         }
    //         return false;
    //     })
    // );



    // adding the actions column so we can use navigate
    if (!columns.find(x => x.key == 'actions')) {
        // we add it only ONCE
        columns.push({
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) =>
            (<div>
                <Tooltip title="Edit">
                    <Button
                        className='flex justify-center items-center'
                        type='secondary'
                        shape="circle"
                        icon={<AiOutlineRight />}
                        onClick={() => navigate(ROUTES.EditUser.replace(":id", record.Key))}
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
                                title: "Users"
                            }
                        ]}
                    />
                </div>
                <Title level={2} className='ml-4'>Users</Title>
            </div>

            <Card className='w-full flex flex-col justify-between items-center mb-4'>
                <div className='w-full flex justify-between items-center mb-4'>
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
                        onClick={() => navigate(ROUTES.AddUser)}
                    >
                        Add User
                    </Button>
                </div>

                <Table
                    rowKey="Key"
                    size='middle'
                    className='w-full'
                    dataSource={tableData}
                    columns={columns}
                />
            </Card>

        </Layout>

    );
}

