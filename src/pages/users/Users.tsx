import React, { useState } from 'react';
import { Avatar, Breadcrumb, Table, Input, Space, Tooltip, Button, Typography, Layout } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { AiOutlineHome } from "react-icons/ai";
import { useNavigate } from 'react-router';
import { ROUTES } from 'src/utils/Constants';
import { Card } from 'src/components/_shared';
import { Link } from 'react-router-dom';

const Title = Typography.Title;


interface DataType {
    key: string;
    name: string;
    email: string;
    location: string;
    roleDept: string,
    phoneNo: string;
    signedup: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'NAME',
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
        title: 'EMAIL',
        dataIndex: 'email',
        render: (text) => <p>{text}</p>,
        sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
        title: 'LOCATION',
        dataIndex: 'location',
        key: 'location',
        render: (text) => <p>{text}</p>,
        sorter: (a, b) => a.location.localeCompare(b.location),
    },
    {
        title: "Role/Dept",
        dataIndex: 'roleDept',
        key: 'roleDept',
        render: (text) => <p>{text}</p>,
        sorter: (a, b) => a.roleDept.localeCompare(b.roleDept),
    },
    {
        title: 'CONTACT',
        dataIndex: 'phoneNo',
        key: 'phoneNo',
    },
    {
        title: 'SIGNED UP',
        dataIndex: 'signedup',
        render: (text) => <p>{text}</p>,
        sorter: (a, b) => a.signedup.localeCompare(b.signedup)
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'Razvan Ababei',
        email: "razvanababei@yahoo.com",
        location: "Iasi",
        roleDept: "Manipulator mafra/ Legume",
        phoneNo: "08593",
        signedup: "asa"
    },
    {
        key: '2',
        name: 'Robert Ababei',
        email: "robertababei@yahoo.com",
        location: "Botosani",
        roleDept: "Manipulator mafra/ Legume",
        phoneNo: "091234",
        signedup: "asa"
    },
    {
        key: '3',
        name: 'Dinu Ababei',
        email: "dinuababei@yahoo.com",
        location: "Suceava",
        roleDept: "Manipulator mafra/ Legume",
        phoneNo: "16000",
        signedup: "asa"
    },
    {
        key: '4',
        name: 'Codrin Ababei',
        email: "codrinababei@yahoo.com",
        location: "Londra",
        roleDept: "Manipulator mafra/ Legume",
        phoneNo: "16000",
        signedup: "asa"
    },
    {
        key: '5',
        name: 'Dana Ababei',
        email: "danaababei@yahoo.com",
        location: "Botosani",
        roleDept: "Manipulator mafra/ Legume",
        phoneNo: "16000",
        signedup: "asa"
    },
    {
        key: '6',
        name: 'Sorin Ababei',
        email: "sorinababei@yahoo.com",
        location: "Hamburg",
        roleDept: "Sofer TIR",
        phoneNo: "000009",
        signedup: "asa"
    },
    // {
    //     key: '7',
    //     name: 'Dorin Ababei',
    //     email: "dorinababei@yahoo.com",
    //     location: "15 Jul 2022",
    //     contact: "16000",
    //     signedup: "asa"
    // },
    // {
    //     key: '8',
    //     name: 'Lili Ababei',
    //     email: "liliababei@yahoo.com",
    //     location: "15 Jul 2022",
    //     contact: "16000",
    //     signedup: "asa"
    // },
    // {
    //     key: '9',
    //     name: 'Eliza Giuborunca',
    //     email: "elizagiub@yahoo.com",
    //     location: "15 Jul 2022",
    //     contact: "16000",
    //     signedup: "asa"
    // },
    // {
    //     key: '10',
    //     name: 'Tiberiu Giuborunca',
    //     email: "tibigiub@yahoo.com",
    //     location: "15 Jul 2022",
    //     contact: "16000",
    //     signedup: "asa"
    // },
    // {
    //     key: '11',
    //     name: 'Bunicu',
    //     email: "bunica@yahoo.com",
    //     location: "Vorona",
    //     contact: "16000",
    //     signedup: "asa"
    // },
    // {
    //     key: '12',
    //     name: 'Bunica',
    //     email: "bunicu@yahoo.com",
    //     location: "Vorona",
    //     contact: "112",
    //     signedup: "13/03/2023"
    // },
    // {
    //     key: '13',
    //     name: 'Matusa',
    //     email: "matusa1@yahoo.com",
    //     location: "Botosani",
    //     contact: "123",
    //     signedup: "10/01/2022"
    // },
    // {
    //     key: '14',
    //     name: 'Alta Matusa',
    //     email: "altamatusa@yahoo.com",
    //     location: "15 Jul 2022",
    //     phone: "976321",
    //     signedup: "02/02/2020"
    // }, {
    //     key: '15',
    //     name: 'Unchiu',
    //     email: "unchiugiub@yahoo.com",
    //     location: "15 Jul 2022",
    //     phone: "0725321",
    //     signedup: "15/09/2020"
    // },
    // {
    //     key: '16',
    //     name: 'Sorina',
    //     email: "sorinagiub@yahoo.com",
    //     location: "15 Jul 2022",
    //     phone: "0749674772",
    //     signedup: "12/05/2021"
    // },
    // {
    //     key: '17',
    //     name: 'Nu mai am nume',
    //     email: "da@yahoo.com",
    //     location: "15 Jul 2023",
    //     phone: "074815231",
    //     signedup: "12/05/2020"
    // }
];

export default function Users() {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const [searchText, setSearchText] = useState('');

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

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
                        type='default'
                        shape="circle"
                        icon={<EditOutlined />}
                        onClick={() => navigate(ROUTES.AddUser.replace(":id", record.key))}
                    />
                </Tooltip>
            </div>),
        },)
    }


    return (
        <div className='w-full h-full overflow-y-auto'>
            <div className='relative w-full h-full flex flex-col items-start sm:px-16 px-4 sm:py-8 py-6 z-30'>
                <div className='flex items-center justify-between w-full'>

                    <div className="flex items-center">
                        <Title>Users</Title>
                        <Breadcrumb
                            className="ml-8"
                            items={[
                                {
                                    title: (
                                        <div className='b-6 '>
                                            <Link className='text-blue-500' to={ROUTES.Dashboard}>
                                                <AiOutlineHome size={22} className='text-blue-400' />
                                            </Link>

                                        </div>
                                    ),
                                },
                                {
                                    title: "Users",
                                },
                            ]}
                        />
                    </div>

                    <Button
                        type='primary'
                        icon={<PlusOutlined />}
                        style={{ height: '40px', backgroundColor: '#4361ee', borderColor: '#4361ee', marginRight: '24px' }}
                        onClick={() => navigate(ROUTES.AddUser.replace(":id", "0"))}

                    >
                        <strong style={{ fontWeight: 'bold' }}>Add user</strong>
                    </Button>
                </div>

                <Space direction='vertical' style={{ marginLeft: '24px' }}>
                    <Input
                        placeholder='Search user'
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: '200px' }}
                    />
                </Space>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={filteredData}
                    style={{ width: '100%', padding: '24px' }}
                />
            </div>
        </div>

    );
}