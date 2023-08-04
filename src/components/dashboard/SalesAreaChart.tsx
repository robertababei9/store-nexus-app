import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select } from 'antd';

import { Card } from '../../components/_shared';
import { salesAreaChart } from '../../utils/mocks/dashboard-area-charts';

type OptionsType = {
    value: number;
    label: string;
}
const CURRENT_YEAR: number = new Date().getFullYear();


export default function SalesAreaChart() {

    const [selectedYear, setSelectedYear] = useState<number>(CURRENT_YEAR);


    // utilities
    const getLastYears = (nrOfYears: number): OptionsType[]  => {
        const optionsForSelect: OptionsType[] = [];

        // we take the last 'nrOfYears' from the current year
        // e.g.     nrOfYears = 4 -->  2023, 2022, 2021, 2020
        for (let i = 0; i < nrOfYears; i++) {
            const value = CURRENT_YEAR - i;
            optionsForSelect.push({value: value, label: value.toString()})
        }

        return optionsForSelect;
    }


    return (
        <Card className='h-full !p-0'>

            <div className='flex justify-between items-center py-4 px-6'>
                <p className='font-semibold text-3xl'>Sales overview</p>
                <div>
                    <Select 
                    defaultValue={selectedYear}
                    // style={{ width: 120 }}
                    onChange={(value) => setSelectedYear(value)}
                    options={getLastYears(4)}
                    />
                </div>
            </div>

            <div className='w-full h-[2px] bg-gray-100'/>                

            <div className='px-6 pt-6'>
                <ResponsiveContainer width="100%" height={400}>
                    <AreaChart
                        width={500}
                        height={300}
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
