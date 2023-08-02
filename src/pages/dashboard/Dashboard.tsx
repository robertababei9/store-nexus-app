import React from 'react'
import { Typography  } from 'antd';

import SalesAreaChart from '../../components/dashboard/SalesAreaChart';
import Menu from '../../components/dashboard/Menu';

const { Title } = Typography;

export default function Dashboard() {



  return (
    <div className='flex h-screen w-64 bg-dark'>
    <Menu />
   <div className='flex space-between justify-start items-start sm:px-32 px-4 sm:py-8 py-6'>
      
      <Title>Dashboard</Title>


      <SalesAreaChart />
    
    </div>
    </div>
  )
}
