import { Col, Row, Typography } from 'antd';

import SalesAreaChart from 'src/components/dashboard/SalesAreaChart';
import StatisticsCards from 'src/components/dashboard/StatisticsCards';
import TeamCard from 'src/components/dashboard/TeamCard';
import MapStoreCard from 'src/components/dashboard/MapStoreCard';
import SalesByCountryCard from 'src/components/dashboard/SalesByCountryCard';
import BestSellersCard from 'src/components/dashboard/BestSellersCard';
import ProfitRadarChart from 'src/components/dashboard/ProfitRadarChart';
import { Layout } from 'src/components/_shared';

const Fade = require('react-reveal/Fade');



const { Title } = Typography;

export default function Dashboard() {

  return (

    <div className='w-full h-full '>
        <div className="relative">
            <div className='absolute top-0 left-0 w-full h-[400px] bg-gradient-to-r from-cyan-200 to-cyan-500 z-10'/>
        </div>
    
      <Layout className='relative z-30'>

        <Fade down delay={150}>
          <Title level={2}>Welcome to Dashboard</Title>
        </Fade>

        {/* 4 Cards with statisctics */}
        <StatisticsCards />

        <Row gutter={[16, 16]} className='w-full'>
          <Col md={24} xl={14}>
            <SalesAreaChart />
          </Col>

          <Col md={24} xl={10}>
            <MapStoreCard />
          </Col>
        </Row>

        <Row gutter={16} className='w-full mt-8'>
          <Col span={24}>
            <BestSellersCard />
          </Col>
        </Row>

        <Row gutter={[32, 16]} className='w-full mt-8'>
          <Col xs={24} xl={8}>
            <TeamCard />
          </Col>

          <Col xs={24} xl={8}>
            <SalesByCountryCard />
          </Col>

          <Col xs={24} xl={8}>
            <ProfitRadarChart />
          </Col>
          
        </Row>
      </Layout>
    </div>
  )
}
