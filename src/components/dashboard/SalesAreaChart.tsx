import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TooltipProps } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import { Select } from 'antd';

import { Card } from 'src/components/_shared';
import { salesAreaChart } from 'src/utils/mocks/dashboard/dashboard-area-charts';
import { getLastYearsOptions } from 'src/utils/Utils';


const CustomLegend = () => {
    return (
        <div className='w-full flex justify-center items-center'>
            <div className='flex justify-start items-center mr-6'>
                <div className='w-4 h-4 bg-[#4F46E5] rounded-full mr-2' />
                <p className='text-lg font-semibold'>Profit</p>
            </div>

            <div className='flex justify-start items-center ml-5'>
                <div className='w-4 h-4 bg-[#d8698c] rounded-full mr-2' />
                <p className='text-lg font-semibold'>Expenses</p>
            </div>
        </div>
    )
}

type CustomTooltipProps = {
    tooltipProps: TooltipProps<ValueType, NameType>,
    year: number
}
const CustomTooltip = (props :CustomTooltipProps) => {
    const { active, payload, label} = props.tooltipProps;
    const year = props.year;

    return (
        <div className='w-full flex flex-col bg-white/50 rounded-md shadow-xl'>
            <p className='w-full bg-gray-200 border-b-2 border-secondary p-2 rounded-t-md font-semibold text-md'>{label}, {year}</p>
            <div className='bg-gray-100/50 p-3'>
                {
                    payload?.map((x) => (
                        <div className='w-full flex justify-center items-center mb-2'>
                            <div style={{backgroundColor: x.color}} className='w-3 h-3 rounded-full mr-2' />
                            <p className=''>{x.name}</p>
                            <span>:</span>
                            <p className='text-md font-bold ml-2'>{x.value}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


export default function SalesAreaChart() {

    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear()); // get current year

    // utilities


    return (
        <Card className='h-full !p-0'>

            <div className='flex justify-between items-center py-4 px-6'>
                <p className='font-semibold text-2xl'>Profit vs Expenses</p>
                <div>
                    <Select 
                        defaultValue={selectedYear}
                        // style={{ width: 120 }}
                        onChange={(value) => setSelectedYear(value)}
                        options={getLastYearsOptions(4)}
                    />
                </div>
            </div>

            <div className='px-6 pt-6'>
                <ResponsiveContainer width="100%" height={400}>
                    <AreaChart
                        data={salesAreaChart[selectedYear]}
                    >
                        <CartesianGrid strokeDasharray="10 4" vertical={false}/>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={(props) => <CustomTooltip key={props.label} tooltipProps={props} year={selectedYear}/>}/>
                        <Legend content={<CustomLegend />}/>
                        <Area 
                            type="monotone" 
                            dataKey="Revenue" 
                            stroke="#343170" 
                            strokeWidth={2}
                            fill="url(#revenueGradient)" // Use a unique ID for the gradient
                            fillOpacity={1} 
                            activeDot={{ r: 6 }} 
                        />

                        <Area 
                            type="monotone" 
                            dataKey="Expense" 
                            stroke="#d8698c" 
                            strokeWidth={2}
                            fill="url(#expenseGradient)" // Use a unique ID for the gradient
                            fillOpacity={1} 
                            activeDot={{ r: 6 }} 
                        />

                        {/* Define the linear gradient */}
                        <defs>
                            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.7} />
                                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.3} />
                            </linearGradient>
                            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#d8698c" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#d8698c" stopOpacity={0.2} />
                        </linearGradient>
                        </defs>
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    )
}
