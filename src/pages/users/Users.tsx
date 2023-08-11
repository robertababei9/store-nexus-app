import React, { useState } from 'react';
import { Table, Input, Space, Pagination } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';

interface DataType {
    key: string;
    name: string;
    email: string;
    location: string;
    phone: number;
    signedup: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Location',
        dataIndex: 'location',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
    },
    {
        title: 'Signed up',
        dataIndex: 'signedup',
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: '111',
        email: "Vegetables",
        location: "15 Jul 2022",
        phone: 16000,
        signedup: "asa"
    },
    {
        key: '2',
        name: '111',
        email: "Vegetables",
        location: "15 Jul 2022",
        phone: 16000,
        signedup: "asa"
    },
    {
        key: '3',
        name: '222',
        email: "anduc",
        location: "15 Jul 2022",
        phone: 16000,
        signedup: "asa"
    },
    {
        key: '4',
        name: '222',
        email: "anduc",
        location: "15 Jul 2022",
        phone: 16000,
        signedup: "asa"
    },
    {
        key: '5',
        name: '333',
        email: "anduc",
        location: "15 Jul 2022",
        phone: 16000,
        signedup: "asa"
    },
    {
        key: '6',
        name: '333',
        email: "anduc",
        location: "15 Jul 2022",
        phone: 16000,
        signedup: "asa"
    },
    {
        key: '7',
        name: '444',
        email: "anduc",
        location: "15 Jul 2022",
        phone: 16000,
        signedup: "asa"
    },
    {
        key: '8',
        name: '444',
        email: "anduc",
        location: "15 Jul 2022",
        phone: 16000,
        signedup: "asa"
    },
    {
        key: '9',
        name: '555',
        email: "anduc",
        location: "15 Jul 2022",
        phone: 16000,
        signedup: "asa"
    },
    {
        key: '10',
        name: '555',
        email: "anduc",
        location: "15 Jul 2022",
        phone: 16000,
        signedup: "asa"
    },
    {
        key: '11',
        name: '666',
        email: "anduc",
        location: "15 Jul 2022",
        phone: 16000,
        signedup: "asa"
    },
    {
        key: '12',
        name: '666',
        email: "anduc",
        location: "15 Jul 2022",
        phone: 16000,
        signedup: "asa"
    },
    {
        key: '13',
        name: '777',
        email: "anduc",
        location: "15 Jul 2022",
        phone: 16000,
        signedup: "asa"
    },
    {
        key: '14',
        name: '777',
        email: "anduc",
        location: "15 Jul 2022",
        phone: 16000,
        signedup: "asa"
    }, {
        key: '15',
        name: '888',
        email: "anduc",
        location: "15 Jul 2022",
        phone: 16000,
        signedup: "asa"
    },
    {
        key: '16',
        name: '888',
        email: "anduc",
        location: "15 Jul 2022",
        phone: 16000,
        signedup: "asa"
    },
    {
        key: '17',
        name: '999',
        email: "anduc",
        location: "15 Jul 2023",
        phone: 16000,
        signedup: "asa"
    },
    {
        key: '18',
        name: '999',
        email: "anduc",
        location: "15 Jul 2022",
        phone: 16000,
        signedup: "asa"
    },
    {
        key: '19',
        name: '000',
        email: "anduc",
        location: "15 Jul 2022",
        phone: 16000,
        signedup: "asa"
    },



];

export default function Users() {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 5;
  
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    };
  
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };
  
    const filteredData = data.filter((item) =>
      Object.values(item).some(
        (value) =>
          value &&
          typeof value === 'string' &&
          value.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  
    const updatePaginatedData = (page: number) => {
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return filteredData.slice(startIndex, endIndex);
    };
  
    const paginatedData = updatePaginatedData(currentPage);
  
    const onShowSizeChange = (current: number, size: number) => {
      const newCurrentPage = Math.ceil((current * pageSize) / size);
      setCurrentPage(newCurrentPage);
    };
  
    const paginationConfig = {
      current: currentPage,
      pageSize: pageSize,
      total: filteredData.length,
      showTotal: (total: number, range: [number, number]) =>
        `${range[0]}-${range[1]} of ${total} items`,
      showSizeChanger: true,
      pageSizeOptions: ['5', '10'],
      onChange: (page: number) => {
        setCurrentPage(page);
      },
      onShowSizeChange: onShowSizeChange,
    };
  
    return (
      <div className='w-full h-full overflow-y-auto'>
        <div className='relative w-full h-full flex flex-col items-center sm:px-16 px-4 sm:py-8 py-6 z-30'>
          <h1 className='text-2xl font-bold mb-4'>Users</h1>
          <Space direction='vertical' style={{ marginBottom: 16 }}>
            <Input
              placeholder='Search user'
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Space>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={paginatedData}
            pagination={false}
            style={{ width: '100%', padding: '24px' }}

          />
          <Pagination
            current={currentPage}
            pageSize={paginationConfig.pageSize}
            total={filteredData.length}
            showTotal={paginationConfig.showTotal}
            showSizeChanger={paginationConfig.showSizeChanger}
            pageSizeOptions={paginationConfig.pageSizeOptions}
            onChange={(page: number) => {
              setCurrentPage(page);
            }}
            onShowSizeChange={onShowSizeChange}
            style={{ marginTop: '16px' }}
          />
        </div>
      </div>
    );
  }


// nu merge search cand esti pe alte pagini, doar pe pag 1


