import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select } from 'antd';

import { Card } from 'src/components/_shared';
import { salesAreaChart } from 'src/utils/mocks/dashboard/dashboard-area-charts';
import { getLastYearsOptions } from 'src/utils/Utils';



export default function SalesAreaChart() {

    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear()); // get current year


    // utilities



    return (
        <Card className='h-full !p-0'>

            <div className='flex justify-between items-center py-4 px-6'>
                <p className='font-semibold text-3xl'>Sales overview</p>
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

            <div className='px-6 pt-6'>
                <ResponsiveContainer width="100%" height={400}>
                    <AreaChart
                        data={salesAreaChart[selectedYear]}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Area type="monotone" dataKey="Revenue" stroke="#343170" fill="#a5a3cf" fillOpacity={1} activeDot={{ r: 6 }} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    )
}
