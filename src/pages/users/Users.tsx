import React, { useState } from 'react';
import { Table, Input, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';

interface DataType {
    key: string;
    name: string;
    email: string;
    location: string;
    phone: string;
    signedup: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'NAME',
        dataIndex: 'name',
    },
    {
        title: 'EMAIL',
        dataIndex: 'email',
    },
    {
        title: 'LOCATION',
        dataIndex: 'location',
    },
    {
        title: 'PHONE',
        dataIndex: 'phone',
    },
    {
        title: 'SIGNED UP',
        dataIndex: 'signedup',
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'Razvan Ababei',
        email: "razvanababei@yahoo.com",
        location: "15 Jul 2022",
        phone: "08593",
        signedup: "asa"
    },
    {
        key: '2',
        name: 'Robert Ababei',
        email: "robertababei@yahoo.com",
        location: "15 Jul 2022",
        phone: "091234",
        signedup: "asa"
    },
    {
        key: '3',
        name: 'Dinu Ababei',
        email: "dinuababei@yahoo.com",
        location: "15 Jul 2022",
        phone: "16000",
        signedup: "asa"
    },
    {
        key: '4',
        name: 'Codrin Ababei',
        email: "codrinababei@yahoo.com",
        location: "15 Jul 2022",
        phone: "16000",
        signedup: "asa"
    },
    {
        key: '5',
        name: 'Dana Ababei',
        email: "danaababei@yahoo.com",
        location: "15 Jul 2022",
        phone: "16000",
        signedup: "asa"
    },
    {
        key: '6',
        name: 'Sorin Ababei',
        email: "sorinababei@yahoo.com",
        location: "15 Jul 2022",
        phone: "000009",
        signedup: "asa"
    },
    {
        key: '7',
        name: 'Dorin Ababei',
        email: "dorinababei@yahoo.com",
        location: "15 Jul 2022",
        phone: "16000",
        signedup: "asa"
    },
    {
        key: '8',
        name: 'Lili Ababei',
        email: "liliababei@yahoo.com",
        location: "15 Jul 2022",
        phone: "16000",
        signedup: "asa"
    },
    {
        key: '9',
        name: 'Eliza Giuborunca',
        email: "elizagiub@yahoo.com",
        location: "15 Jul 2022",
        phone: "16000",
        signedup: "asa"
    },
    {
        key: '10',
        name: 'Tiberiu Giuborunca',
        email: "tibigiub@yahoo.com",
        location: "15 Jul 2022",
        phone: "16000",
        signedup: "asa"
    },
    {
        key: '11',
        name: 'Bunicu',
        email: "bunica@yahoo.com",
        location: "Vorona",
        phone: "16000",
        signedup: "asa"
    },
    {
        key: '12',
        name: 'Bunica',
        email: "bunicu@yahoo.com",
        location: "Vorona",
        phone: "112",
        signedup: "13/03/2023"
    },
    {
        key: '13',
        name: 'Matusa',
        email: "matusa1@yahoo.com",
        location: "Botosani",
        phone: "123",
        signedup: "10/01/2022"
    },
    {
        key: '14',
        name: 'Alta Matusa',
        email: "altamatusa@yahoo.com",
        location: "15 Jul 2022",
        phone: "976321",
        signedup: "02/02/2020"
    }, {
        key: '15',
        name: 'Unchiu',
        email: "unchiugiub@yahoo.com",
        location: "15 Jul 2022",
        phone: "0725321",
        signedup: "15/09/2020"
    },
    {
        key: '16',
        name: 'Sorina',
        email: "sorinagiub@yahoo.com",
        location: "15 Jul 2022",
        phone: "0749674772",
        signedup: "12/05/2021"
    },
    {
        key: '17',
        name: 'Nu mai am nume',
        email: "da@yahoo.com",
        location: "15 Jul 2023",
        phone: "074815231",
        signedup: "12/05/2020"
    }
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

return (
  <div className='w-full h-full overflow-y-auto'>
    <div className='relative w-full h-full flex flex-col items-start sm:px-16 px-4 sm:py-8 py-6 z-30'>
      <h1 className='text-3xl font-bold mb-4' style={{ marginLeft: '24px', padding: '10px' }}>Users</h1>
      <Space direction='vertical' style={{ marginBottom: 16, marginLeft: '24px' }}>
        <Input
          placeholder='Search user'
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{width: '200px'}}
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