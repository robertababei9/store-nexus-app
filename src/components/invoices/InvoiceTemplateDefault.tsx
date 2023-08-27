import { Card, Checkbox, Col, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { setSendEmail } from 'src/features/invoices/invoicesSlice';
import { RootState } from 'src/redux/store';
import { AppLogo } from '../_shared/Icons/Icons';
import { formatPrice } from 'src/utils/Utils';

type InvoiceTemplateDefaultType = {
    showSendEmail?: boolean;
}

export default function InvoiceTemplateDefault({
    showSendEmail = false
}: InvoiceTemplateDefaultType) {

    // redux 
    const dispatch = useDispatch();
    const {data: invoiceData, sendEmail} = useSelector(
        (state: RootState) => state.invoices
    )

  return (
    <>
        <div className='w-full max-w-[920px]'>
            <Card className="w-full mb-4 ">
                {
                    showSendEmail && (
                        <div className="w-full flex">
                            <Checkbox checked={sendEmail} onChange={e =>  dispatch(setSendEmail(e.target.checked))}>
                                Send this invoice via email
                            </Checkbox>
                        </div>
                    )
                }
                <Row>
                    <Col xs={24} lg={12}>
                        <Col span={24}>
                            <Row className="w-full h-[130px] flex mt-8">
                                <Col span={8} className="h-full flex justify-center items-center ">
                                    <AppLogo width={120} height={120}/>
                                </Col>
                                <Col span={1}></Col>
                                <Col span={15} className="w-full flex flex-col justify-center pl-8 items-start border-l-2">
                                    <p className="text-base font-semibold">Robert Ababei</p>
                                    <p className="text-base max-w-[170px] text-left">Aleea Azurului 2, bl. Z, sc.X, ap. 99</p>
                                    <p className="text-base">robert.ababei9@gmail.com</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <Row className="w-full h-[130px] flex mt-8">
                                <Col span={8} className="h-full flex justify-center items-center ">
                                    <p className="text-2xl font-semibold text-gray-400">Bill To</p>
                                </Col>
                                <Col span={1}></Col>
                                <Col span={15} className="w-full flex flex-col justify-center pl-8 items-start border-l-2">
                                    <p className="text-base font-semibold">Robert Ababei</p>
                                    <p className="text-base max-w-[170px] text-left">Aleea Azurului 2, bl. Z, sc.X, ap. 99</p>
                                    <p className="text-base">robert.ababei9@gmail.com</p>
                                </Col>
                            </Row>
                        </Col>
                    </Col>
                    <Col xs={24} lg={12} className="mb-8">
                        <div className="w-full h-full flex flex-col justify-start items-center">
                            <div className="w-full flex justify-center mt-4">
                                <div className="w-[50%] text-right">
                                    <p className="text-4xl text-gray-600 font-semibold">INVOICE</p>
                                </div>
                                <div className="w-[50%] text-left">
                                    <p className="text-4xl pl-4">#9-0045</p>
                                </div>
                            </div>
                            <div className="w-full flex justify-center mt-4 mb-1">
                                <div className="w-[50%] text-right">
                                    <p className="text-base text-gray-600 font-semibold">INVOICE DATE</p>
                                </div>
                                <div className="w-[50%] text-left">
                                    <p className="text-base pl-4">26 Aug 2023</p>
                                </div>
                            </div>

                            <div className="w-full flex justify-center mb-1">
                                <div className="w-[50%] text-right">
                                    <p className="text-base text-gray-600 font-semibold">DUE DATE</p>
                                </div>
                                <div className="w-[50%] text-left">
                                    <p className="text-base pl-4">31 Dec 2023</p>
                                </div>
                            </div>

                            <div className="w-full flex justify-center">
                                <div className="w-[50%] text-right">
                                    <p className="text-base text-gray-600 font-semibold">TOTAL</p>
                                </div>
                                <div className="w-[50%] text-left">
                                    <p className="text-base pl-4">{formatPrice(10000)}</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className='flex flex-col items-start w-full mt-8'>
                <div className='w-full'>
                    <Row gutter={16}>
                    <Col xs={24} md={16} className='flex justify-start'>
                        <p className='text-base font-semibold text-gray-500 mb-4'>ITEM</p>
                    </Col>
                    <Col xs={24} md={3} className='flex justify-start'>
                        <p className='text-base font-semibold text-gray-500 mb-4'>QTY</p>
                    </Col>
                    <Col xs={24} md={3} className='flex justify-start'>
                        <p className='text-base font-semibold text-gray-500 mb-4'>PRICE/RATE</p>
                    </Col>
                    <Col xs={24} md={2} className='flex justify-end'>
                        <p className='text-base font-semibold text-gray-500 mb-4'>TOTAL</p>
                    </Col>
                    </Row>
                </div>
                <div className="w-full h-1 bg-gray-100"/>
                {
                    [1000].map((item, index: number) => (
                        <div className="w-full border-b-2 border-gray-100 py-2 ">
                            <Row gutter={16}>
                                <Col xs={24} md={16} className='flex flex-col justify-start items-start'>
                                    <p className='text-base font-semibold mb-2'>Back-end & Database</p>
                                    <p className='text-sm text-gray-600 text-left  mb-2'>Back-end & Database description description description description description description description description description description</p>
                                </Col>
                                <Col xs={24} md={3} className='flex justify-start items-center'>
                                    <p className='text-base  mb-4'>1</p>
                                </Col>
                                <Col xs={24} md={3} className='flex justify-start items-center'>
                                    <p className='text-base  mb-4'>{formatPrice(item)}</p>
                                </Col>
                                <Col xs={24} md={2} className='flex justify-end items-center'>
                                    <p className='text-base  mb-4'>{formatPrice(item)}</p>
                                </Col>
                            </Row>
                        </div>
                    ))
                }

                </div>

                <Row className="mt-16 border-b-2 border-gray-100 pb-2 mb-3">
                    <Col xs={24} lg={16}>
                        <p className="font-semibold text-left text-gray-500">SUBTOTAL</p>
                    </Col>
                    <Col xs={24} lg={8}>
                        <p className="text-base text-base text-right">{formatPrice(47315)}</p>
                    </Col>
                </Row>
                <Row className="border-b-2 border-gray-100 pb-2 mb-3">
                    <Col xs={24} lg={16}>
                        <p className="font-semibold text-left  text-gray-500">TAX</p>
                    </Col>
                    <Col xs={24} lg={8}>
                        <p className="text-base text-base text-right">{formatPrice(1259)}</p>
                    </Col>
                </Row>
                <Row className="border-b-2 border-gray-100 pb-2 mb-3">
                    <Col xs={24} lg={16}>
                        <p className="font-semibold text-left  text-gray-500">DISCOUNT</p>
                    </Col>
                    <Col xs={24} lg={8}>
                        <p className="text-base text-base text-right">{formatPrice(350)}</p>
                    </Col>
                </Row>
                <Row className="">
                    <Col xs={24} lg={16}>
                        <p className="font-semibold text-left text-2xl text-gray-500">TOTAL</p>
                    </Col>
                    <Col xs={24} lg={8}>
                        <p className="text-2xl text-right font-semibold">{formatPrice(49074)}</p>
                    </Col>
                </Row>

                <Row className="mt-16 mb-4">
                    <Col span={2} className="flex items-center">
                        <AppLogo width={45} height={45}/>
                    </Col>
                    <Col span={22} className="">
                        <p className="pl-4 text-left text-sm text-gray-500">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                    </Col>
                </Row>
            </Card>
        </div>
    </>
  )
}
