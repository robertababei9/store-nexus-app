import React from 'react'
import { Typography  } from 'antd';

import SalesAreaChart from '../../components/dashboard/SalesAreaChart';

const { Title } = Typography;

export default function Dashboard() {



  return (
    <div className='flex flex-col justify-start items-start sm:px-32 px-4 sm:py-8 py-6'>
      <Title>Dashboard</Title>

      <SalesAreaChart />
    </div>
  )
}
