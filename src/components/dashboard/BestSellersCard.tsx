import { Avatar, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import { FaChevronRight } from "react-icons/fa";

import { Card } from '../_shared';

import tempImg from '../../assets/images/humans.png';
import { formatPrice } from 'src/utils/Utils';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { ROUTES } from 'src/utils/Constants';

interface DataType {
    key: string;
    image?: string,
    name: string;
    price: number;
    createdDate: string;
    total: number;
}

const columns: ColumnsType<DataType> = [
    {
        title: (
            <p className='font-semibold text-2xl  text-secondary'>Best seller</p>
        ),
        dataIndex: 'name',
        key: 'name',
        render: (text) => (
            <div className='flex justify-start items-center'>
                <Avatar 
                    src="https://picsum.photos/400" 
                    size={50}
                    alt="Product / Inventory / Item"
                />
                <p className='ml-2 text-base font-semibold text-secondary'>{text}</p>
            </div>
        ),
        width: "40%"
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        sorter: (a, b) => a.price - b.price,
        render: (text: number) => <p>{formatPrice(text)}</p>,
    },
    {
        title: 'Created',
        dataIndex: 'createdDate',
        key: 'createdDate',
        sorter: (a, b) => dayjs(a.createdDate).valueOf() - dayjs(b.createdDate).valueOf(),
        render: (text) => <p>{text}</p>,
    },
    {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        sorter: (a, b) => a.total - b.total,
        defaultSortOrder: "descend",
        render: (text: number) => <p className='font-semibold '>{formatPrice(text)}</p>,
    },
    {
        title: '',
        dataIndex: 'actions',
        key: 'action',
        render: () => (
            <Link className='flex justify-center items-center hover:text-secondary hover:bg-gray-100 hover:rounded-full hover:h-8' to={"#"}>
                <FaChevronRight size={20}/>
            </Link>
        ),
        width: 50
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'Creme brulee icecream',
        price: 43.22,
        createdDate: "24 Jan 2023",
        total: 175.25,
    },
    {
        key: '2',
        name: 'Salmon',
        price: 9.5,
        createdDate: "07 Mar 2021",
        total: 456.00,
    },
    {
        key: '3',
        name: 'Chicken',
        price: 4.2,
        createdDate: "17 Apr 2019",
        total: 2725.60,
    },
    {
        key: '4',
        name: 'Sparkling water - Ababei',
        price: 0.85,
        createdDate: "01 Jun 2016",
        total: 195.70,
    },
    {
        key: '5',
        name: 'Bio Tomatos',
        price: 2.6,
        createdDate: "15 Jul 2022",
        total: 266.30,
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
            // onRow={(record) => ({
            //     onClick: () => {
            //         console.log("row clicked = ", record);
            //     }
            // })}
        />
    </Card>
  )
}
