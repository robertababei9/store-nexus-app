import { Col, Row, Typography } from 'antd';

import SalesAreaChart from 'src/components/dashboard/SalesAreaChart';
import StatisticsCards from 'src/components/dashboard/StatisticsCards';
import TeamCard from 'src/components/dashboard/TeamCard';
import MapStoreCard from 'src/components/dashboard/MapStoreCard';
import SalesByCountryCard from 'src/components/dashboard/SalesByCountryCard';
import BestSellersCard from 'src/components/dashboard/BestSellersCard';
import ProfitRadarChart from 'src/components/dashboard/ProfitRadarChart';
import { Button, Layout } from 'src/components/_shared';
import { MdEdit } from "react-icons/md";
import TotalSales from 'src/components/dashboard/TotalSales';

const Fade = require('react-reveal/Fade');



const { Title } = Typography;

export default function Dashboard() {

  return (

    
    <Layout className='relative'>

      <div className='w-full flex justify-between items-start'>
        <Fade down delay={150}>
          <Title level={3}>Dashboard</Title>
        </Fade>

        <div className='flex justify-center items-center'>
          <Button type='simple' icon={<MdEdit />} className='flex items-center font-semibold px-2'>
            Edit
          </Button>
        </div>

      </div>

      <Row className='w-full justify-center items-center mb-6'>
          <StatisticsCards />
      </Row>

      <Row gutter={[16, 16]} className='w-full mb-6'>
        <Col md={24} xl={14}>
          <SalesAreaChart />
        </Col>

        <Col md={24} xl={10}>
          <MapStoreCard />
        </Col>
      </Row>

      <TotalSales />

      <Row gutter={16} className='w-full mt-4'>
        <Col xs={24} xl={14}>
          <BestSellersCard />
        </Col>
      </Row>

      <Row gutter={[32, 16]} className='w-full mt-4'>
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
  )
}
