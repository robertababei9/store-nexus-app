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
        <Card className='flex flex-col justify-start items-start rounded-2xl shadow-md'>
                
            <div className='w-full ml-4 mb-8 flex justify-between items-center'>
            <div className='flex flex-col justify-start items-start'>
                <h1 className='text-4xl font-semibold mb-1'>Sales</h1>
                <p className='text-gray-500 text-lg'>Sales for {selectedYear}</p>
            </div>

            <div>
                <Select 
                defaultValue={selectedYear}
                // style={{ width: 120 }}
                onChange={(value) => setSelectedYear(value)}
                options={getLastYears(4)}
                />
            </div>
            </div>

            <ResponsiveContainer width={700} height={400}>
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
        </Card>
    )
}
