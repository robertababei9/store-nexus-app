import { Col, Row } from 'antd';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import { FcMoneyTransfer, FcSalesPerformance } from 'react-icons/fc';

import { Card } from '../_shared';
import { formatPrice } from '../../utils/Utils';
import { Invoice, DollarUp } from '../_shared/Icons/Icons';

const Fade = require('react-reveal/Fade');

type StatisticCardProps = {
  title: string;
  value: number
  icon: any;
  incomePercentage: number; // compared to last month
}

const StatisticCard = ({
  title,
  value,
  icon,
  incomePercentage
}: StatisticCardProps) => (

  <Card className='px-6 py-4 min-w-[250px] w-full flex flex-col shadow-xl'>
      <div className='flex items-center'>
      <div className='flex flex-col items-start w-[70%]'>
          <p className='text-gray-400 font-semibold'>{title}</p>
          <p className='font-semibold text-lg'>{formatPrice(value)}</p>
      </div>
      <div className='w-[30%] flex justify-end'>
          {icon}
      </div>
      </div>

      <div className='flex justify-start items-center mt-4'>
      <div className={`${incomePercentage >= 0 ? 'text-green-500' : 'text-red-500'} font-semibold flex items-center`}>
          {
            incomePercentage >= 0 ? (
              <AiOutlineArrowUp size={18} className='mr-1'/> 
            ) : (
              <AiOutlineArrowDown size={18} className='mr-1'/> 
            )
          }
          <p>{incomePercentage} %</p>
      </div>
      <p className='ml-4'>Since last month</p>
      </div>

    </Card>
)


export default function StatisticsCards() {
  return (
    <Row gutter={[16, 16]} className='w-full mb-12'>
        <Col xs={24} md={12} xl={6} >
          <Fade down duration={800}>
            <StatisticCard 
                title='TOTAL SALES'
                value={350879}
                icon={<FcSalesPerformance size={48}/>}
                incomePercentage={3.48}
            />
          </Fade>
          
        </Col>

        <Col xs={24} md={12} xl={6}>
          <Fade down  delay={50}>
            <StatisticCard 
                title='INVOICES THIS MONTH'
                value={56000}
                icon={<Invoice width={48} height={48}/>}
                incomePercentage={12.5}
            />
          </Fade>
        </Col>

        <Col xs={24} md={12} xl={6}>
          <Fade down  delay={150}>
            <StatisticCard 
                title='COSTS THIS MONTH'
                value={13458}
                icon={<DollarUp width={48} height={48}/>}
                incomePercentage={-1.15}
            />
          </Fade>
        </Col>

        <Col xs={24} md={12} xl={6}>
          <Fade down  delay={250}>
            <StatisticCard 
                title='PROFIT THIS MONTH'
                value={18000}
                icon={<FcMoneyTransfer size={48}/>}
                incomePercentage={32.08}
            />
          </Fade>
        </Col>
    </Row>

  )
}
