import React from 'react'
import { Col, Row, Typography } from 'antd';

import SalesAreaChart from '../../components/dashboard/SalesAreaChart';
import StatisticsCard from '../../components/dashboard/StatisticsCard';
import Team from '../../components/dashboard/Team';

const { Title } = Typography;


export default function Dashboard() {

  return (
    <>
      {/* This is the blue section. It makes use of z-index and position absolute */}
      <div className='absolute top-0 left-0 w-full h-[400px] bg-cyan-400 z-30'/>
    
      <div className='flex flex-col justify-start items-start bg-inherit sm:px-16 px-4 sm:py-8 py-6 relative z-50'>

        <Title>Dashboard</Title>

        <Row gutter={16} className='w-full mb-12'>
          <Col span={6}>
            <StatisticsCard />
          </Col>

          <Col span={6}>
            <StatisticsCard />
          </Col>

          <Col span={6}>
            <StatisticsCard />
          </Col>

          <Col span={6}>
            <StatisticsCard />
          </Col>
        </Row>


        <SalesAreaChart />

        <Row gutter={32} className='w-full mt-12'>
          <Col span={8}>
            <Team />
          </Col>

          <Col span={8}>
            <Team />
          </Col>

          <Col span={8}>
            <Team />
          </Col>
          
        </Row>
      </div>
    </>    
  )
}
