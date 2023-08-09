import { useState } from 'react'
import { Card } from '../_shared';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Select } from 'antd';
import { getLastYearsOptions } from '../../utils/Utils';
import { profitRadarChart } from '../../utils/mocks/dashboard/dashboard-profit-radar-chart';


export default function ProfitRadarChart() {

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  return (
    <Card className='bg-white !p-0 min-w-[320px] w-full'>
            <div className='flex justify-between items-center py-4 px-6'>
            <p className='font-semibold text-lg'>Profit overview</p>
            <div>
                <Select 
                    defaultValue={selectedYear}
                    // style={{ width: 120 }}
                    onChange={(value) => setSelectedYear(value)}
                    options={getLastYearsOptions(4)}
                />
                </div>
        </div>
        
        <div className='w-full h-[2px] bg-gray-100'/>

        <div className='w-full h-[420px] overflow-hidden'>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={profitRadarChart[selectedYear]}>
                <PolarGrid />
                <PolarAngleAxis dataKey="month" />
                <Tooltip />
                <PolarRadiusAxis />
                <Radar name="Profit Overview" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>
        </div>

    </Card>
  )
}
