import { useState, useEffect } from 'react';
import { Tooltip } from 'antd';
import { AiOutlineRise } from 'react-icons/ai';
import { FcMoneyTransfer, FcSalesPerformance, FcCollaboration  } from 'react-icons/fc';
import { IoMdTrendingDown } from "react-icons/io";
import { FaAngleLeft, FaAngleRight, FaExclamationCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Card, Tag } from 'src/components/_shared';
import { formatPrice } from 'src/utils/Utils';
import { Invoice, DollarUp } from '../_shared/Icons/Icons';
import useWindowDimensions from 'src/utils/hooks/useWindowDimensions';
import { APP } from 'src/utils/Constants';

const Fade = require('react-reveal/Fade');

type StatisticCardProps = {
  title: string;
  value: number
  icon: any;
  incomePercentage: number; // compared to last month
  isPrice?: boolean;
  needsUpdate?: boolean;
}

// TODO: To move to separate file when this file gets too complex / big
const StatisticCard = ({
  title,
  value,
  icon,
  incomePercentage,
  isPrice = true,
  needsUpdate = false,
}: StatisticCardProps) => (

  <Card className='px-6 py-4 min-w-[250px] w-full flex flex-col shadow-md'>

      <div className='flex flex-col justify-start items-start'>
          <div className='w-full flex flex-wrap justify-between items-center'>
              <div className='flex justify-start items-center'>
                  {icon}  
                  <p className='text-gray-400 font-semibold ml-3'>{title}</p>
              </div>
              {
                needsUpdate && (
                  <Tooltip title={"Updates required: Click on it to provide some new values"} >
                    <FaExclamationCircle 
                        size={32} 
                        className='text-warning animate-pulse hover:cursor-pointer'
                        onClick={() => console.log("Modal will open to update the necessary values")}
                    />
                  </Tooltip>
                )
              }
          </div>

          <div className='flex items-center flex-wrap mt-3'>
              <p className='font-bold text-3xl'>
                {isPrice ? formatPrice(value, "EUR", 0) : value}
              </p>
              <Tooltip title={`${incomePercentage} % since last month`}>
                  <>
                    <Tag 
                      color={incomePercentage >= 0 ? 'green' : 'red'} 
                      className='flex justify-center items-center font-bold text-md xs:ml-3' 
                      icon={ incomePercentage >= 0 ? (
                          <AiOutlineRise size={22} className='mr-2'/>
                        ) : (
                          <IoMdTrendingDown size={22} className='mr-2'/>
                        )
                      }>
                        {incomePercentage} %
                    </Tag>
                  </>
              </Tooltip>
          </div>
      </div>
    </Card>
)


export default function StatisticsCards() {

  // custom hooks
  const { width } = useWindowDimensions();

  // redux
  const { isMenuCollapsed } = useSelector(
    (state: RootState) => state.app
  )

  // states
  const [swiperWidth, setSwiperWidth] = useState<number>(0);
  const [numberOfSlides, setNumberOfSlides] = useState<number>(4);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  // effects
  useEffect(() => {
    const menuWidth = isMenuCollapsed ? APP.MENU_COLLAPSED_MAX_WIDTH : APP.MENU_MAX_WIDTH;

    const _swiperWidth = width - menuWidth - (APP.LAYOUT_PADDING_X * 2) - 20;

    setSwiperWidth(_swiperWidth);

    if (width <= 450) {
      setNumberOfSlides(1);
    }
    else if (width > 450 && width < 1000) {
      setNumberOfSlides(2);
    }
    else {
      setNumberOfSlides(4);
    }

  }, [width, isMenuCollapsed]);


  // handlers
  const handleSlideChange = (swiper: any) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }


  return (
      <div style={{width: swiperWidth}} className='flex justify-center items-center '>
          {/* <div className={`prevEl rounded-full ${isBeginning ? 'opacity-50 ' : ' hover:bg-gray-300 hover:cursor-pointer'}`}>
            <FaAngleLeft className='text-secondary' size={32}/>
          </div> */}

          <Swiper
            style={{
              overflow: "none",
            }}
            modules={[Navigation, Autoplay]}
            spaceBetween={16} // Set the space between slides
            slidesPerView={numberOfSlides}  // Set the number of slides per view
            navigation={{
              prevEl: '.prevEl',  // we create custom navigations based on this 'prevEl' class
              nextEl: '.nextEl'   // same
            }}
            autoplay={{
              delay: 8500
            }}
            onSlideChange={handleSlideChange}
          >
            <SwiperSlide>
                <Fade down duration={800}>
                  <StatisticCard
                    title='TOTAL SALES'
                    value={350879}
                    icon={<FcSalesPerformance size={36} />}
                    incomePercentage={3.48}
                  />
                </Fade>
            </SwiperSlide>

            <SwiperSlide>
                <Fade down delay={50}>
                  <StatisticCard
                    title='INVOICES THIS MONTH'
                    value={56000}
                    icon={<Invoice width={48} height={36} />}
                    incomePercentage={12.5}
                  />
                </Fade>
            </SwiperSlide>

            <SwiperSlide>
                <Fade down delay={150}>
                  <StatisticCard
                    title='COSTS THIS MONTH'
                    value={13458}
                    icon={<DollarUp width={48} height={36} />}
                    incomePercentage={-1.15}
                    needsUpdate={true}
                  />
                </Fade>
            </SwiperSlide>

            <SwiperSlide>
                <Fade down delay={250}>
                  <StatisticCard
                    title='PROFIT THIS MONTH'
                    value={18000}
                    icon={<FcMoneyTransfer size={36} />}
                    incomePercentage={32.08}
                  />
                </Fade>
            </SwiperSlide>

            <SwiperSlide>
                <Fade down delay={300}>
                  <StatisticCard
                    title='TOTAL USERS'
                    value={121}
                    icon={<FcCollaboration  size={36} />}
                    incomePercentage={50.5}
                    isPrice={false}
                  />
                </Fade>
            </SwiperSlide>

            
          </Swiper>
          
          {/* <div className={`nextEl rounded-full ${isEnd ? 'opacity-50 ' : ' hover:bg-gray-300 hover:cursor-pointer'}`}>
            <FaAngleRight className='text-secondary' size={32}/>
          </div> */}
      </div>
  );

}
