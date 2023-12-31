
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import { Card } from '../_shared'
import { Col } from 'antd';
import ReactCountryFlag from 'react-country-flag';

type SalesByCountry = {
    countryName: string;
    countryCode: string;
    sales: number;
    bounce?: number;    // difference from last month
    isBouncePositive?: boolean
}

const MEMBERS: SalesByCountry[] = [
    {
        countryName: "United States",
        countryCode: "USA",
        sales: 2500,
        bounce: 29.9,
        isBouncePositive: true
    },
    {
        countryName: "Germany",
        countryCode: "DE",
        sales: 3900,
        bounce: 25.5,
        isBouncePositive: true
    },
    {
        countryName: "France",
        countryCode: "FR",
        sales: 3500,
        bounce: 18.2,
        isBouncePositive: true
    },
    {
        countryName: "Romania",
        countryCode: "RO",
        sales: 1600,
        bounce: 5.9,
        isBouncePositive: false
    },
    {
        countryName: "Italy",
        countryCode: "IT",
        sales: 2400,
        bounce: 2.5,
        isBouncePositive: false
    },
];

export default function SalesByCountryCard() {
  return (
    <Card className='bg-white !p-0 min-w-[320px] w-full'>
        <div className='py-4 px-6 flex justify-start'>
            <p className='font-semibold text-lg'>Sales by country</p>
        </div>
        
        <div className='w-full h-[2px] bg-gray-100'/>

        <div className='w-full h-[420px] overflow-auto bg-scroll pt-4'>
            {/* ROWs */}
            {
                MEMBERS.map((country: SalesByCountry, index: number) => (
                    <div key={country.countryCode + index} className='flex justify-between items-center mb-4 px-6'>
                        <Col span={12}>
                            <div className='flex items-center justify-start'>
                                <ReactCountryFlag 
                                    svg
                                    countryCode={country.countryCode}
                                    style={{
                                        width: 30,
                                        height: 30
                                    }}
                                />
                                <div className='ml-2 flex flex-col justify-center items-start ml-4'>
                                    <p className='font-semibold text-gray-500'>Country:</p>
                                    <p className='whitespace-nowrap'>{country.countryName}</p>
                                </div>
                            </div>
                        </Col>

                        <Col span={4}>
                            <div className='flex flex-col justify-start items-start'>
                                <p className='font-semibold text-gray-500'>Sales:</p>
                                <p>{country.sales}</p>
                            </div>
                        </Col>

                        <Col span={8}>
                            <div className='flex flex-col justify-start items-end'>
                                <p className='font-semibold text-gray-500'>Bounce:</p>
                                <div className={`flex justify-start items-center ${country.isBouncePositive ? 'text-green-500' : 'text-red-500'}`}>
                                    {country.isBouncePositive ? <AiOutlineArrowUp className='mr-2'/> : <AiOutlineArrowDown className='mr-2'/>}
                                    <p className=''>{country.bounce} %</p>
                                </div>
                            </div>
                        </Col>
                    </div>
                ))
            }
        </div>



    </Card>
  )
}
