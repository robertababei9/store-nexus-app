import { AiOutlineArrowUp } from 'react-icons/ai';
import { FcMoneyTransfer } from 'react-icons/fc';

import { Card } from '../../components/_shared';


export default function StatisticsCard() {
  return (
    <Card className='rounded-lg px-6 py-4 min-w-[250px] w-full flex flex-col shadow-xl'>
        <div className='flex items-center'>
        <div className='flex flex-col items-start w-[70%]'>
            <p className='text-gray-400 font-semibold'>TOTAL SALES</p>
            <p className='font-semibold text-lg'>$350,879</p>
        </div>
        <div className='w-[30%] flex justify-end'>
            <FcMoneyTransfer size={48}/>
        </div>
        </div>

        <div className='flex justify-start items-center mt-4'>
        <div className='text-green-500 font-semibold flex items-center'>
            <AiOutlineArrowUp size={18} className='mr-1'/> 
            <p>3.48 %</p>
        </div>
        <p className='ml-4'>Since last month</p>
        </div>

    </Card>
  )
}
