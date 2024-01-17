import { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from 'recharts';
import { Button, Card, Dropdown } from '../_shared';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { formatPrice, getLastYearsOptions } from 'src/utils/Utils';
import { scaleLinear } from 'd3-scale';
import { AiOutlineDollar } from "react-icons/ai";
import { BsGraphUpArrow, BsGraphDownArrow } from "react-icons/bs";
import { getDefaultApiUrl } from 'src/config';
import axios from 'axios';
import { ApiResponseModel, OptionType } from 'src/types/_shared';
import { StoreDtoType } from 'src/types/store';

const dataSalesMock = [
  {
    name: 'January',
    sales: 4000,
  },
  {
    name: 'February',
    sales: 5500,
  },
  {
    name: 'March',
    sales: 1500,
  },
  {
    name: 'April',
    sales: 6000,
  },
  {
    name: 'May',
    sales: 1500,
  },
  {
    name: 'June',
    sales: -550,
  },
  {
    name: 'July',
    sales: 1500,
  },
  {
    name: 'August',
    sales: 3000,
  },
  {
    name: 'September',
    sales: 0,
  },
  {
    name: 'October',
    sales: 0,
  },
  {
    name: 'November',
    sales: 0,
  },
  {
    name: 'December',
    sales: 0,
  },
];

const CustomBar = (props: any) => {

    // console.log("bar props: ", props);
    const { sales, width, x, is } = props;

    const barWidth = 14; // Adjust as needed

    // Center the bar within the space allocated for each data point
    const centeredX = x - (barWidth - width) / 2;

    const colorScale = scaleLinear<string>()
        .domain([Math.min(...dataSalesMock.map(item => item.sales)), Math.max(...dataSalesMock.map(item => item.sales))])
        .range(["#fff", "#4F46E5"]);


    const getBarColor = (value: number): string => (value < 0 ? "#ff0e0e" : colorScale(value));

    return (
        <Rectangle 
            {...props}
            x={centeredX}
            width={14}
            radius={8}
            className='rounded-lg' 
            fill={getBarColor(sales)} 
        >
            
        </Rectangle>
    )
};

type CustomTooltipProps = {
    tooltipProps: TooltipProps<ValueType, NameType>,
}
const CustomTooltip = (props :CustomTooltipProps) => {
    const { label, payload } = props.tooltipProps;

    let isNegativeValue: boolean = false;
    if (payload && payload.length > 0) {
        const valueRaw = payload[0].value;
        if (valueRaw) {
            const value = parseFloat(valueRaw.toString());
            isNegativeValue = value < 0;
        }
    }

    return (
        <div className='w-full flex flex-col items-start bg-white/50 rounded-md shadow-xl'>
            <p className='w-full bg-gray-200 p-2 rounded-t-md font-semibold text-md'>{label}</p>
            <div className={`bg-gray-100/50 p-3 border-t-2 ${isNegativeValue ? 'border-danger' : 'border-secondary'} `}>
                {
                    payload?.map((x) => (
                        <div className='w-full flex justify-center items-center mb-2'>
                            <div style={{backgroundColor: x.color}} className='w-3 h-3 rounded-full mr-2' />
                            <p className=''>Sales</p>
                            <span>:</span>
                            <p className={`text-md font-bold ml-2 ${isNegativeValue ? 'text-danger' : ''}`}>
                                {formatPrice(
                                    parseFloat((x.value || 0).toString())
                                )}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
  

export default function TotalSales() {

    // states
    const [storeOptions, setStoreOptions] = useState<OptionType[]>([]);

    // effects
    useEffect(() => {
        fetchStores();
    }, []);
    
    // helpers
    const fetchStores = async () => {
        try {
            const BASE_URL = getDefaultApiUrl();
            const result = await axios.get<ApiResponseModel>(`${BASE_URL}/api/stores/GetAll`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });

            if (result.data) {
                const { Data, Success } = result.data;

                if (Success) {
                    setStoreOptions(Data.map((x: StoreDtoType) => ({label: x.Name, value: x.Id})))
                }
            }
        }
        catch (err: any) {
            console.log(err);
            // openNotification("error");
        }
        finally {
            // setStoresLoading(false);
        }
    }

    return (
        <Card className='w-full px-8 py-6 mb-4'>
            <Row gutter={16} className='w-full'>
                <Col xs={24} xl={17} className='xl:!pr-12'>
                    <div className='w-full flex flex-wrap justify-between items-center mb-8 sm:mb-12 '>
                        <p className='font-semibold text-2xl sm:mb-0 mb-6'>Total Sales</p>
                        <div className='flex justify-center items-center min-w-[250px] '>
                            {/* <p className='font-semibold text-lg mr-4'>Store:</p> */}
                            <Dropdown 
                                defaultValue={'all'}
                                placeholder='Store'
                                options={[
                                    {value: 'all', label: "All stores"},
                                    ...storeOptions
                                ]}
                            />
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart
                            data={dataSalesMock}
                        >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis 
                            dataKey="name"
                            tickFormatter={(value: string) => value.substring(0, 3)}
                        />
                        <YAxis />
                        <Tooltip 
                            cursor={{
                                fill: "transparent"
                            }}
                            content={(props) => <CustomTooltip key={props.label} tooltipProps={props} />} 
                        />
                        <Bar dataKey="sales" shape={CustomBar} />
                        </BarChart>
                    </ResponsiveContainer>
                </Col>
                <Col xs={24} xl={7} className='border-l-2 border-gray-200'>
                    <div className='w-full h-full flex flex-col justify-start items-center'>
                        <Dropdown 
                            containerClassName='max-w-[120px]'
                            placeholder='Year'
                            defaultValue={2024}
                            options={getLastYearsOptions(3)}
                        />
                        <div className='w-full h-full flex flex-col justify-between items-center mt-4 '>
                            <div className='w-full flex flex-col justify-center items-center'>
                                <div className='bg-secondary/25 mb-2 rounded-md p-2'>
                                    <AiOutlineDollar size={32} color="#4F46E5" />
                                </div>
                                <p className='font-semibold text-2xl'>{formatPrice(72500)}</p>
                                <p className='font-semibold text-lg text-gray-500'>Total Budget</p>
                            </div>

                            <div className='w-full flex flex-col justify-center items-center '>
                                <div className='bg-success/25 mb-2 rounded-md p-2'>
                                    <BsGraphUpArrow size={32} className='text-success' />
                                </div>
                                <p className='font-semibold text-2xl'>{formatPrice(32438)}</p>
                                <p className='font-semibold text-lg text-gray-500'>Earning in this year</p>
                            </div>

                            <div className='w-full flex flex-col justify-center items-center '>
                                <div className='bg-danger/25 mb-2 rounded-md p-2'>
                                    <BsGraphDownArrow size={32} className='text-danger' />
                                </div>
                                <p className='font-semibold text-2xl'>{formatPrice(32438)}</p>
                                <p className='font-semibold text-lg text-gray-500'>Expense in this year</p>
                            </div>

                            <Button type='secondary' size="large" className='min-w-[240px] mt-4'>
                                Increase Budget
                            </Button>
                        </div>
                        
                    </div>
                </Col>
            </Row>
        </Card>
    )
}
