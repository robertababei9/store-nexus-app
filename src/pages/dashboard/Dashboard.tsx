import { Col, Row, Typography } from 'antd';

import SalesAreaChart from '../../components/dashboard/SalesAreaChart';
import StatisticsCard from '../../components/dashboard/StatisticsCard';
import TeamCard from '../../components/dashboard/TeamCard';
import MapStoreCard from '../../components/dashboard/MapStoreCard';
import SalesByCountryCard from '../../components/dashboard/SalesByCountryCard';
import BestSellersCard from '../../components/dashboard/BestSellersCard';

const Fade = require('react-reveal/Fade');


const { Title } = Typography;


export default function Dashboard() {

  return (
    <>
      {/* This is the blue section. It makes use of z-index and position absolute */}
      <div className='absolute top-0 left-0 w-full h-[400px] bg-gradient-to-r from-cyan-200 to-cyan-500'/>
    
      <div className='flex flex-col justify-start items-start sm:px-16 px-4 sm:py-8 py-6 relative z-30'>

        <Fade down delay={150}>
          <Title>Dashboard</Title>
        </Fade>
        
        <Row gutter={[16, 16]} className='w-full mb-12'>
            <Col xs={24} md={12} xl={6} >
              <Fade down duration={800}>
                <StatisticsCard />
              </Fade>
              
            </Col>

            <Col xs={24} md={12} xl={6}>
              <Fade down  delay={50}>
                <StatisticsCard />
              </Fade>
            </Col>

            <Col xs={24} md={12} xl={6}>
              <Fade down  delay={150}>
                <StatisticsCard />
              </Fade>
            </Col>

            <Col xs={24} md={12} xl={6}>
              <Fade down  delay={250}>
                <StatisticsCard />
              </Fade>
            </Col>
        </Row>


        <Row gutter={[16, 16]} className='w-full'>
          <Col md={24} xl={14}>
            <SalesAreaChart />
          </Col>

          <Col md={24} xl={10}>
            <MapStoreCard />
          </Col>
        </Row>

        <Row gutter={16} className='w-full mt-12'>
          <Col span={24}>
            <BestSellersCard />
          </Col>
        </Row>

        <Row gutter={[32, 16]} className='w-full mt-12'>
          <Col xs={24} xl={8}>
            <TeamCard />
          </Col>

          <Col xs={24} xl={8}>
            <SalesByCountryCard />
          </Col>

          <Col xs={24} xl={8}>
            <TeamCard />
          </Col>
          
        </Row>
      </div>
    </>    
  )
}
