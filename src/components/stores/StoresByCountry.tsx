import { Col, Row } from 'antd'
import { Card } from '../_shared'
import CountryFlag from '../_shared/CountryFlag/CountryFlag';
import { COUNTRY_CODE } from 'src/utils/Constants';

type CountryRowProps = {
    countryCode?: string;
    name: string;
    noStores?: number; // number of stores
    dotColor?: string;  // represented in HEX
}
const CountryRow = ({countryCode, name, noStores, dotColor = "#FF0000"}: CountryRowProps) => {

    return (
        <Row className='w-full mb-4'>
            <Col span={9}>
                <div className='flex justify-start items-center'>
                    <CountryFlag countryCode={countryCode}/>
                    <p className='ml-2'>{name}</p>
                </div>
            </Col>

            <Col span={9}>
                <p>{noStores}</p>
            </Col>

            <Col span={6}>
                <div style={{backgroundColor: dotColor}} className="w-[10px] h-[10px] rounded-full" />
            </Col>
        </Row>
    )
}

export default function StoresByCountry() {
  return (
    <Row className='w-full mb-4'>
        <Card className='w-full flex flex-col justify-start items-start'>
            <p className='text-base font-semibold'>All stores</p>
            <p className='text-gray-400 font-semibold mt-1'>A comprehensive view of stores across countries globally</p>

            <Row className='w-full mt-8'>
                <Col xs={24} lg={12}>
                    <div className='w-full h-full flex flex-col items-start justift-start '>
                        <p className='text-gray-400 font-semibold mb-4'>Countries</p>
                        <CountryRow countryCode={COUNTRY_CODE.Germany} name='Germany' noStores={4} dotColor='#FF0000'/>
                        <CountryRow countryCode={COUNTRY_CODE.Italy} name='Italy' noStores={2} dotColor='#008000'/>
                        <CountryRow countryCode={COUNTRY_CODE.Romania} name='Romania' noStores={2} dotColor='#0000FF'/>
                        <CountryRow countryCode={COUNTRY_CODE.UnitedStates} name='United States' noStores={13} dotColor='#800080'/>
                    </div>
                </Col>

                <Col xs={24} lg={12}>
                </Col>
            </Row>
        </Card>
    </Row>
  )
}
