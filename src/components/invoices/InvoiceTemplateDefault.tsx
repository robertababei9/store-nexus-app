import { Card, Checkbox, Col, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { setSendEmail } from 'src/features/invoices/invoicesSlice';
import { RootState } from 'src/redux/store';
import { AppLogo } from '../_shared/Icons/Icons';
import { formatPrice, getDefaultDateFormat } from 'src/utils/Utils';
import { InvoiceFormType } from 'src/types/invoices';

type InvoiceTemplateDefaultType = {
    showSendEmail?: boolean;
    invoiceData: InvoiceFormType | null
}

export default function InvoiceTemplateDefault({
    showSendEmail = false,
    invoiceData
}: InvoiceTemplateDefaultType) {

    // redux 
    const dispatch = useDispatch();
    const {sendEmail} = useSelector(
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
                                        <p className="text-base font-semibold">{invoiceData?.BillFrom.From}</p>
                                        <p className="text-base max-w-[170px] text-left">{invoiceData?.BillFrom.Address}</p>
                                        <p className="text-base">{invoiceData?.BillFrom.Email}</p>
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
                                        <p className="text-base font-semibold">{invoiceData?.BillTo.To}</p>
                                        <p className="text-base max-w-[170px] text-left">{invoiceData?.BillTo.Address}</p>
                                        <p className="text-base">{invoiceData?.BillTo.Email}</p>
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
                                        <p className="text-base pl-4">{invoiceData?.CreatedDate}</p>
                                    </div>
                                </div>

                                <div className="w-full flex justify-center mb-1">
                                    <div className="w-[50%] text-right">
                                        <p className="text-base text-gray-600 font-semibold">DUE DATE</p>
                                    </div>
                                    <div className="w-[50%] text-left">
                                        <p className="text-base pl-4">{invoiceData?.DueDate}</p>
                                    </div>
                                </div>

                                <div className="w-full flex justify-center">
                                    <div className="w-[50%] text-right">
                                        <p className="text-base text-gray-600 font-semibold">TOTAL</p>
                                    </div>
                                    <div className="w-[50%] text-left">
                                        <p className="text-base pl-4">{formatPrice(invoiceData?.Total ?? -999)}</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className='flex flex-col items-start w-full mt-8'>
                    <div className='w-full'>
                        <Row gutter={16}>
                        <Col xs={24} md={12} lg={16} className='flex justify-start'>
                            <p className='text-base font-semibold text-gray-500 mb-4'>ITEM</p>
                        </Col>
                        <Col xs={24} md={3} lg={3} className='flex justify-start'>
                            <p className='text-base font-semibold text-gray-500 mb-4'>QTY</p>
                        </Col>
                        <Col md={4} lg={3} className='flex justify-start'>
                            <p className='text-base font-semibold text-gray-500 mb-4'>PRICE/RATE</p>
                        </Col>
                        <Col md={3} lg={2} className='flex justify-end'>
                            <p className='text-base font-semibold text-gray-500 mb-4'>TOTAL</p>
                        </Col>
                        </Row>
                    </div>
                    <div className="w-full h-1 bg-gray-100"/>
                    {
                        invoiceData?.Items.map((item, index: number) => (
                            <div key={item.Name + index} className="w-full border-b-2 border-gray-100 py-2 ">
                                <Row gutter={16}>
                                    <Col xs={24} md={12} lg={16} className='flex flex-col justify-start items-start'>
                                        <p className='text-base font-semibold mb-2'>{item.Name}</p>
                                        <p className='text-sm text-gray-600 text-left  mb-2'>{item.Description}</p>
                                    </Col>
                                    <Col xs={24} md={3} lg={3} className='flex justify-start items-center'>
                                        <p className='text-base  mb-4'>{item.Qty}</p>
                                    </Col>
                                    <Col xs={24} md={4} lg={3} className='flex justify-start items-center'>
                                        <p className='text-base  mb-4'>{formatPrice(item.Price * item.Qty)}</p>
                                    </Col>
                                    <Col xs={24} md={3} lg={2} className='flex justify-end items-center'>
                                        <p className='text-base  mb-4'>{formatPrice(item.Price * item.Qty)}</p>
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
                            <p className="text-base text-base text-right">{formatPrice(invoiceData?.Subtotal ?? -999)}</p>
                        </Col>
                    </Row>
                    <Row className="border-b-2 border-gray-100 pb-2 mb-3">
                        <Col xs={24} lg={16}>
                            <p className="font-semibold text-left  text-gray-500">TAX</p>
                        </Col>
                        <Col xs={24} lg={8}>
                            <p className="text-base text-base text-right">{formatPrice(invoiceData?.TaxSubtotal ?? -999)}</p>
                        </Col>
                    </Row>
                    <Row className="border-b-2 border-gray-100 pb-2 mb-3">
                        <Col xs={24} lg={16}>
                            <p className="font-semibold text-left  text-gray-500">DISCOUNT</p>
                        </Col>
                        <Col xs={24} lg={8}>
                            <p className="text-base text-base text-right">{formatPrice(invoiceData?.DiscountSubtotal ?? -999)}</p>
                        </Col>
                    </Row>
                    <Row className="">
                        <Col xs={24} lg={16}>
                            <p className="font-semibold text-left text-2xl text-gray-500">TOTAL</p>
                        </Col>
                        <Col xs={24} lg={8}>
                            <p className="text-2xl text-right font-semibold">{formatPrice(invoiceData?.Total ?? -999)}</p>
                        </Col>
                    </Row>

                    <Row className="mt-16 mb-4">
                        <Col span={2} className="flex items-center">
                            <AppLogo width={45} height={45}/>
                        </Col>
                        <Col span={22} className="flex items-center">
                            <p className="pl-4 text-left text-sm text-gray-500">
                                {invoiceData?.Notes}
                            </p>
                        </Col>
                    </Row>
                </Card>
            </div>
        </>
    )
}
