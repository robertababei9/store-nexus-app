import React from 'react'
import { Col, Row, Typography } from 'antd';

import SalesAreaChart from '../../components/dashboard/SalesAreaChart';
import Menu from '../../components/dashboard/Menu'; //dc nu vrea ca e bn doar ... stiu. Hai sa vedem

import StatisticsCard from '../../components/dashboard/StatisticsCard';

const { Title } = Typography;

// restart -- voia restart -- da
// hai sa vedem cum arata :)

// te ajut, te uiti si iti explic

export default function Dashboard() {

  return (

    // inainte era <> ---> adica gol
    <div className='flex h-full :)'>
      <Menu />
      {/* This is the blue section. It makes use of z-index and position absolute */}
      {/* asta e un div simplu cu absolute... absolut = nu are o pozitie anume ... e pozitionat relative la parinte ... o sa vezi mai incolo */}
      {/* Asta e chestia aia albastra */}

      {/* oricum trebuie sa fixez asta. .. lasa asa , fara kkt-u asta */}
      {/* <div className='absolute top-0 left-0 w-full h-[400px] bg-cyan-400 -z-10' /> */}

      {/* Aici e dashboard-ul propriu-zis */}
      <div className='flex flex-col justify-start items-start sm:px-16 px-4 sm:py-8 py-6 relative z-50'>

        <Title>Dashboard</Title>

        <Row gutter={16} className='w-full mb-16'>
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
      </div>
    </div>
  )
}
