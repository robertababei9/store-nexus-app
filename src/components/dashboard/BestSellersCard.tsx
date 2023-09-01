import { Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table';

import { Card } from '../_shared';

import tempImg from '../../assets/images/humans.png';
import { formatPrice } from 'src/utils/Utils';
import { Link } from 'react-router-dom';

interface DataType {
    key: string;
    image?: string,
    name: string;
    category: string;
    addedDate: string;
    total: number;
}

const columns: ColumnsType<DataType> = [
    {
        title: (
            <p className='font-semibold text-2xl  text-blue-400'>Best seller</p>
        ),
        dataIndex: 'name',
        key: 'name',
        render: (text) => (
            <div className='flex justify-start items-center'>
                <img  width={65} height={65} src={tempImg} alt="product"/>
                <p className='ml-2 text-base font-semibold text-blue-400'>{text}</p>
            </div>
        ),
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        render: (text) => <p>{text}</p>,
    },
    {
        title: 'Added Date',
        dataIndex: 'addedDate',
        key: 'addedDate',
        render: (text) => <p>{text}</p>,
    },
    {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        render: (text: number) => <p className='font-semibold '>{formatPrice(text)}</p>,
    },
    {
        title: '',
        dataIndex: 'actions',
        key: 'action',
        render: (text) => (
            <div className='flex flex-end items-center'>
                <Space align='end'>
                    <Link className='font-semibold text-blue-700 ' to={"#"}>View</Link>
                </Space>
            </div>
        ),
        width: 120
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'Creme brulee icecream',
        category: "Icecreams",
        addedDate: "24 Jan 2023",
        total: 50000,
    },
    {
        key: '2',
        name: 'Salmon',
        category: "Fish",
        addedDate: "07 Mar 2021",
        total: 20000,
    },
    {
        key: '3',
        name: 'Chicken',
        category: "Meat",
        addedDate: "17 Apr 2019",
        total: 29000,
    },
    {
        key: '4',
        name: 'Sparkling water - Ababei',
        category: "Water",
        addedDate: "01 Jun 2016",
        total: 80000,
    },
    {
        key: '5',
        name: 'Bio Tomatos',
        category: "Vegetables",
        addedDate: "15 Jul 2022",
        total: 16000,
    },
  ];

export default function BestSellersCard() {
  return (
    <Card className=''>
        <Table 
            dataSource={data} 
            columns={columns} 
            size="small"
            scroll={{y: 420}}
            pagination={false}
        />
    </Card>
  )
}
