import { useEffect, useState } from 'react';
import { Col, Row, DatePicker} from 'antd'
import { Controller, UseFormReturn, useFieldArray, useForm } from "react-hook-form"
import { TextField } from '@mui/material';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { AiOutlinePlus } from 'react-icons/ai';
import dayjs from 'dayjs';

import { Button, Card } from 'src/components/_shared';
import { formatPrice, getDefaultDateFormat } from 'src/utils/Utils'
import { InvoiceFormType, ItemType } from 'src/types/invoices';

type CreateInvoiceStepOneProps = {
  methods: UseFormReturn<InvoiceFormType, any, undefined>
}


export default function CreateInvoiceStepOne({
  methods
}: CreateInvoiceStepOneProps) {

  // form items
  const itemsMethods = useFieldArray({
    control: methods.control,
    name: "items"
  });

  // watcher
  methods.watch("tax");
  methods.watch("discount");


  // effects  --> calculate and set amounts
  useEffect(() => {
    let subTotal: number = 0;

    const items = methods.getValues("items");
    items.forEach(item => subTotal += (item.qty * item.price));

    let total = subTotal;

    const tax = methods.getValues("tax");
    const discount = methods.getValues("discount");

    const taxFromSubtotal = (tax / 100) * subTotal; 
    total = total + taxFromSubtotal;

    const discountFromSubtotal = (discount / 100) * subTotal; 
    total = total - discountFromSubtotal;

    methods.setValue("subtotal", subTotal);
    methods.setValue("taxSubtotal", taxFromSubtotal);
    methods.setValue("discountSubtotal", discountFromSubtotal);
    methods.setValue("total", total);

  }, [methods.getValues()])


  // handlers
  const handleAddItem = () => {
    const newItem: ItemType = {
      name: "",
      description: "",
      qty: 1,
      price: 1
    };
    itemsMethods.append(newItem)
  }

  const handleDeleteItem = (index: number) => {
    if (methods.getValues("items").length > 1) {
      itemsMethods.remove(index);
    }
  }

  // console.log("rendering data = ", methods.getValues());


  return (
    <div className='w-full'>
      <Row gutter={16}>
        <Col xs={24} lg={18}>
          <Card className='w-full mb-4'>
            <Row>
                <Col xs={24} md={12} className='flex flex-col'>
                  <div className='flex justify-start items-center'>
                      <p className='text-base font-semibold'>Current Date:</p>

                      <p className='text-base ml-2'>{getDefaultDateFormat(new Date())}</p>
                  </div>

                  <div className='flex justify-start items-center mt-2'>
                      <p className='text-base font-semibold mr-2'>Due Date:</p>
                      <Controller
                          name={`dueDate`}
                          control={methods.control}
                          rules={{
                            required: true
                          }}
                          render={({
                              field: { onChange, value },
                              fieldState: { error },
                          }) => (
                            <DatePicker
                              format="DD-MMM-YYYY" 
                              value={value ? dayjs(value) : null}
                              onChange={((date: any, dateString: string) => onChange(dateString))} 
                              placeholder='Select Date *' 
                              status={error ? "error" : ""}
                            />
                          )}
                        />
                  </div>
                </Col>
                <Col xs={24} md={12}>
                    <div className='flex items-center justify-end'>
                        <p className='text-base font-semibold'>Invoice:</p>
                        <p className='text-base ml-2'>#0054-41</p>
                    </div>
                </Col>
            </Row>

            <div className='w-full h-[2px] bg-gray-200 my-8'/>

            <Row gutter={32}>
                <Col xs={24} md={12} className='flex flex-col items-start'>
                    <p className='text-base font-semibold mb-4'>Bill to:</p>
                    <Controller
                        name={`billTo.to`}
                        control={methods.control}
                        rules={{
                          required: true
                        }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                          <TextField
                              className='w-full'
                              style={{marginBottom: 15}}
                              label='Who is this invoice to ?' 
                              variant="outlined"
                              value={value}
                              onChange={(value) => {
                                onChange(value);
                              }}
                              error={error !== undefined}
                              size='small'
                              required
                          />
                        )}
                      />
                      <Controller
                        name={`billTo.email`}
                        control={methods.control}
                        rules={{
                          required: true, 
                          validate: {
                            maxLength: (v) =>
                              v.length <= 50 || "The email should have at most 50 characters",
                            matchPattern: (v) =>
                              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                              "Must be a valid email",
                          },
                        }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                          <TextField
                              className='w-full'
                              style={{marginBottom: 15}}
                              label='Email address' 
                              variant="outlined"
                              value={value}
                              onChange={(value) => {
                                onChange(value);
                              }}
                              size='small'
                              error={error !== undefined}
                              helperText={error?.message}
                              required
                          />
                        )}
                      />
                      <Controller
                        name={`billTo.address`}
                        control={methods.control}
                        rules={{
                          required: true
                        }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                          <TextField
                              className='w-full'
                              style={{marginBottom: 15}}
                              label='Billing address'
                              variant="outlined"
                              value={value}
                              onChange={(value) => {
                                onChange(value);
                              }}
                              size='small'
                              error={error !== undefined}
                              required
                          />
                        )}
                      />
                </Col>

                <Col xs={24} md={12} className='flex flex-col items-start'>
                    <p className='text-base font-semibold mb-4'>Bill from:</p>
                    <Controller
                        name={`billFrom.from`}
                        control={methods.control}
                        rules={{
                          required: true
                        }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                          <TextField
                              className='w-full'
                              style={{marginBottom: 15}}
                              label='Who is this invoice from ?'
                              variant="outlined"
                              value={value}
                              onChange={(value) => {
                                onChange(value);
                              }}
                              size='small'
                              error={error !== undefined}
                              required
                          />
                        )}
                      />
                      <Controller
                        name={`billFrom.email`}
                        control={methods.control}
                        rules={{
                          required: true, 
                          validate: {
                            maxLength: (v) =>
                              v.length <= 50 || "The email should have at most 50 characters",
                            matchPattern: (v) =>
                              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                              "Email address must be a valid address",
                          },
                        }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                          <TextField
                              className='w-full'
                              style={{marginBottom: 15}}
                              label='Email address'
                              variant="outlined"
                              value={value}
                              onChange={(value) => {
                                onChange(value);
                              }}
                              size='small'
                              error={error !== undefined}
                              helperText={error?.message}
                              required
                          />
                        )}
                      />
                      <Controller
                        name={`billFrom.address`}
                        control={methods.control}
                        rules={{
                          required: true
                        }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                          <TextField
                              className='w-full'
                              style={{marginBottom: 15}}
                              label='Billing address'
                              variant="outlined"
                              value={value}
                              onChange={(value) => {
                                onChange(value);
                              }}
                              size='small'
                              error={error !== undefined}
                              required
                          />
                        )}
                      />
                </Col>
            </Row>

            <div className='w-full h-[2px] bg-gray-200 my-8'/>

            <div className='flex flex-col items-start w-full'>
              <div className='w-full'>
                <Row gutter={16}>
                  <Col xs={24} md={16} className='flex justify-start'>
                      <p className='text-base font-semibold mb-4'>ITEMS</p>
                  </Col>
                  <Col xs={24} md={3} className='flex justify-start'>
                      <p className='text-base font-semibold mb-4'>QTY</p>
                  </Col>
                  <Col xs={24} md={3} className='flex justify-start'>
                      <p className='text-base font-semibold mb-4'>PRICE/RATE</p>
                  </Col>
                  <Col xs={24} md={2} className='flex justify-start'>
                      <p className='text-base font-semibold mb-4'>ACTION</p>
                  </Col>
                </Row>
              </div>

              <div className='w-full'>
                {
                  methods.getValues().items.map((item: ItemType, index: number) => {
                    
                    methods.watch(`items.${index}.qty`);
                    methods.watch(`items.${index}.price`);

                    return (
                      <Row 
                        key={item.name + index}
                        gutter={16} 
                        className='border-b-2 border-gray-200 mb-4 pb-2'
                      >
                        <Col xs={24} md={16} className='flex flex-col !pl-0'>
                            <Controller
                              name={`items.${index}.name`}
                              control={methods.control}
                              rules={{
                                required: true
                              }}
                              render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                              <TextField
                                  className='w-full'
                                  style={{marginBottom: 10}}
                                  label='Item name' 
                                  variant="outlined"
                                  value={value}
                                  onChange={(value) => {
                                    onChange(value);
                                  }}
                                  required
                                  error={error !== undefined}
                                  size='small'
                              />
                            )}
                            />

                            <Controller
                              name={`items.${index}.description`}
                              control={methods.control}
                              render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                              <TextField
                                  className='w-full'
                                  style={{marginBottom: 10}}
                                  label='Item description' 
                                  variant="outlined"
                                  value={value}
                                  onChange={(value) => {
                                    onChange(value);
                                  }}
                                  size='small'
                              />
                            )}
                            />
                        </Col>

                        <Col xs={24} md={3} className='flex justify-start'>
                          
                          <Controller
                                name={`items.${index}.qty`}
                                control={methods.control}
                                rules={{
                                  required: true
                                }}
                                render={({
                                  field: { onChange, value },
                                  fieldState: { error },
                              }) => (
                                <TextField
                                    type='number'
                                    className='w-full'
                                    style={{marginBottom: 15}}
                                    label='Qty' 
                                    variant="outlined"
                                    value={value}
                                    onChange={(value) => {
                                      onChange(value);
                                    }}
                                    error={error !== undefined}
                                    required
                                    size='small'
                                />
                              )}
                            />
                        </Col>
                        <Col xs={24} md={3} className='flex justify-start'>
                            <Controller
                                name={`items.${index}.price`}
                                control={methods.control}
                                rules={{
                                  required: true
                                }}
                                render={({
                                  field: { onChange, value },
                                  fieldState: { error },
                              }) => (
                                <TextField
                                      type='number'
                                      className='w-full'
                                      style={{marginBottom: 15}}
                                      label='Price' 
                                      variant="outlined"
                                      value={value}
                                      onChange={(event) => {
                                        const value = event.target.value;
                                        const priceNumber: number = +value;
                                        onChange(priceNumber);
                                      }}
                                      error={error !== undefined}
                                      required
                                      size='small'
                                />
                              )}
                            />
                        </Col>
                        <Col xs={24} md={2} className='flex justify-start pr-0'>
                            <button onClick={() => handleDeleteItem(index)} className='p-3 rounded-xl bg-red-500 h-fit'>
                              <RiDeleteBin5Line color='#FFF' />
                            </button>
                        </Col>
                      </Row>
                    )
                  })
                }
              </div>

              <Button type="secondary" className='flex items-center' onClick={handleAddItem}>
                  <AiOutlinePlus size={18} color="#FFF" className='mr-2'/>
                  Add
              </Button>
                
            </div>


            <div className='w-full flex flex-col items-start mt-24'>
              <p className='text-base font-semibold mb-2'>Notes:</p>
              <Controller
                  name={`notes`}
                  control={methods.control}
                  render={({
                      field: { onChange, value },
                      fieldState: { error },
                  }) => (
                    <TextField
                        rows={2}
                        className='w-full'
                        placeholder='Thank you for your business'
                        maxRows={4}
                        value={value}
                        onChange={(value) => {
                          onChange(value);
                        }}
                        
                    />
                  )}
                />
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={6} className='w-full flex flex-col'>
            <Card className='flex flex-col items-start w-full mb-4'>
              <p className='text-base font-semibold mb-2'>Tax rate:</p>
              <Controller
                  name={`tax`}
                  control={methods.control}
                  render={({
                      field: { onChange, value },
                      fieldState: { error },
                  }) => (
                    <TextField
                        type='number'
                        className='w-full'
                        style={{marginBottom: 15}}
                        label='Enter Tax Amount (%)' 
                        variant="outlined"
                        value={value}
                        onChange={(event) => {
                          const value = event.target.value;
                          const taxNumber: number = +value; 
                          onChange(taxNumber);
                        }}
                        inputProps={{
                          min: 0
                        }}
                        size='small'
                    />
                  )}
                />
                <p className='text-base font-semibold mb-2'>Discount rate:</p>
                <Controller
                    name={`discount`}
                    control={methods.control}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
                      <TextField
                          type='number'
                          className='w-full'
                          style={{marginBottom: 15}}
                          label='Enter Discount Amount (%)' 
                          variant="outlined"
                          value={value}
                          onChange={(event) => {
                            const value = event.target.value;
                            const discountNumber: number = +value;
                            onChange(discountNumber);
                          }}
                          inputProps={{
                            min: 0
                          }}
                          size='small'
                      />
                    )}
                  />
            </Card>
            <Card className='flex flex-col w-full'>
                <Row >
                  <Col xs={24} md={12} className='sm:text-left'>
                    <p className='text-base font-semibold'>Subtotal:</p>
                  </Col>
                  <Col xs={24} md={12} className='sm:text-right'>
                    <Controller
                        name={`subtotal`}
                        control={methods.control}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                          <p className='text-base'>{formatPrice(value)}</p>
                        )}
                      />
                  </Col>
                </Row> 
                <Row >
                  <Col xs={24} md={12} className='sm:text-left'>
                    <p className='text-base font-semibold'>Discount:</p>
                  </Col>
                  <Col xs={24} md={12} className='sm:text-right'>
                    <Controller
                        name={`discountSubtotal`}
                        control={methods.control}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                          <p className='text-base'>{formatPrice(value)}</p>
                        )}
                      />
                  </Col>
                </Row> 
                <Row >
                  <Col xs={24} md={12} className='sm:text-left'>
                    <p className='text-base font-semibold'>Tax:</p>
                  </Col>
                  <Col xs={24} md={12} className='sm:text-right'>
                    <Controller
                        name={`taxSubtotal`}
                        control={methods.control}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                          <p className='text-base'>{formatPrice(value)}</p>
                        )}
                      />
                  </Col>
                </Row> 

                <div className='w-full h-[1px] bg-gray-200 my-4' />

                <Row >
                  <Col xs={24} md={12} className='sm:text-left'>
                    <p className='text-xl font-semibold'>Total:</p>
                  </Col>
                  <Col xs={24} md={12} className='sm:text-right'>
                    <Controller
                        name={`total`}
                        control={methods.control}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                          <p className='text-lg font-semibold'>{formatPrice(value)}</p>
                        )}
                      />
                  </Col>
                </Row> 
            </Card>
        </Col>
      </Row>
    </div>

  )
}
