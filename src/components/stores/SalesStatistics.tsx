import { Row, Col } from 'antd';
import { BsGraphUpArrow } from 'react-icons/bs';
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer, 
    RadialBarChart, 
    RadialBar 
} from 'recharts';
import { Card } from '../_shared';
import { mockGraphData, simpleRadialBarChartMock } from 'src/utils/mocks/stores/stores-charts';
import { formatPrice } from 'src/utils/Utils';


type HeaderStatisticType = {
    title: string;
    value: string;
}
const HeaderStatistic = ({title, value }: HeaderStatisticType) => {

    return (
        <div className='flex flex-col justify-start items-start'>
            <div className='w-full flex justify-start items-start mb-2'>
                <BsGraphUpArrow size={24}/>
                <p className='text-base font-semibold ml-2'>{value}</p>
            </div>
            <p className='text-base font-semibold'>{title}</p>
        </div>
    )
}

const CustomLineChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-black text-[#82ca9d] p-2 flex flex-col items-start rounded-md'>
            <p className='text-[10px] font-semibold'>TOTAL SALES THIS YEAR</p>
            <p className='font-semibold'>{payload[0].value} Sales</p>
        </div>
      );
    }
  
    return null;
};

const CustomRadialBarTooltip = ({active, payload, label}: any) => {
    if (active && payload && payload.length) {
        return (
            <div className='bg-black text-[#82ca9d] p-2 flex flex-col items-start rounded-md'>
                <p className='text-[12px] font-semibold'>{payload[0].payload.name}</p>
                <p className='font-semibold'>{formatPrice(payload[0].value)}</p>
            </div>
        )
    }

    return null;
}




export default function SalesStatistics() {
  return (
    <Row className='w-full mb-4'>
        <Card className='w-full flex flex-col justify-start items-start !p-0'>
            <div className='w-full flex flex-col justify-start items-start font-semibold text-white bg-[#7352C7] p-6 rounded-t-lg'>
                <p className='text-base '>Sales Statistics</p>
                <Row wrap={true} className='w-full mt-8'>
                    <Col span={4}>
                        <HeaderStatistic title="Sales Weekly" value={formatPrice(2648)}/>
                    </Col>
                    <Col span={4}>
                        <HeaderStatistic title="Sales Monthly" value={formatPrice(13950)}/>
                    </Col>
                    <Col span={4}>
                        <HeaderStatistic title="Average Revenue" value={formatPrice(48548)}/>
                    </Col>
                    <Col span={4}>
                        <HeaderStatistic title="Total Revenue" value={formatPrice(230000)}/>
                    </Col>

                </Row>
            </div>

            <Row className='w-full rounded-b-lg'>
                <Col xs={24} lg={12} className='pt-4'>
                    <ResponsiveContainer width="100%" height={320}>
                        <LineChart
                        width={500}
                        height={300}
                        data={mockGraphData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid vertical={true} horizontal={false} strokeDasharray="12" strokeOpacity={0.4} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip content={<CustomLineChartTooltip />}/>
                        {/* <Legend /> */}
                        <Line type="linear" dataKey="value" stroke="#82ca9d" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </Col>
                <Col span={1}>
                    <div className='w-[2px] h-full bg-gray-300 '/>
                </Col>
                <Col xs={24} lg={11}>
                    <ResponsiveContainer width="100%" height={320}>
                        <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="90%" barSize={8}  data={simpleRadialBarChartMock}>
                            <RadialBar
                                background={false}
                                dataKey="value"
                            />
                            <Tooltip content={<CustomRadialBarTooltip />}/>
                            <Legend 
                                iconSize={12}
                                iconType='circle' 
                                layout="vertical" 
                                verticalAlign="middle" 
                                wrapperStyle={{
                                    top: '50%',
                                    left: "2%",
                                    transform: 'translate(0, -50%)',
                                    lineHeight: '24px',
                                  }} 
                            />
                        </RadialBarChart>
                    </ResponsiveContainer>
                </Col>
            </Row>
        </Card>
    </Row>
  )
}
