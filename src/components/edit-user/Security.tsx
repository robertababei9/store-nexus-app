import React from 'react';
import { TextField } from '@mui/material';
import { Col, Row, Card, DatePicker } from 'antd';
import UserAvatar from './UserAvatar';
import type { DatePickerProps } from 'antd';
import { Controller, UseFormReturn, useFieldArray } from 'react-hook-form';
import dayjs from 'dayjs';
import {SecurityFormType } from 'src/types/users';



const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
};

type SecurityUserPageProps = {
    methods: UseFormReturn<SecurityFormType, any, undefined>
}

export default function SecurityUserPage({
    methods
}: SecurityUserPageProps) {



    return (

        <div className='w-full'>
            <Row gutter={16} className='padding: 10px'>
                <Col xs={24} md={12} className='ml-4'>
                    <Card className='w-full mb-4'>

                        <Row gutter={16}>
                            <Col xs={24} md={24}>
                                <Controller
                                    name={`currentPass`}
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
                                            style={{ marginBottom: 15 }}
                                            label='Current Password'
                                            variant="outlined"
                                            value={value}
                                            onChange={(value) => {
                                                onChange(value);
                                            }}
                                            size='medium'
                                            error={error !== undefined}
                                            required
                                        />
                                    )}
                                />
                            </Col>

                        </Row>

                        <Row gutter={16}>
                            <Col xs={24} md={12}>
                            <Controller
                                    name={`newPass`}
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
                                            style={{ marginBottom: 15 }}
                                            label='New Password'
                                            variant="outlined"
                                            value={value}
                                            onChange={(value) => {
                                                onChange(value);
                                            }}
                                            size='medium'
                                            error={error !== undefined}
                                            required
                                        />
                                    )}
                                />
                            </Col>

                            <Col xs={24} md={12}>
                            <Controller
                                    name={`repeatPass`}
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
                                            style={{ marginBottom: 15 }}
                                            label='Confirm New Password'
                                            variant="outlined"
                                            value={value}
                                            onChange={(value) => {
                                                onChange(value);
                                            }}
                                            size='medium'
                                            error={error !== undefined}
                                            required
                                        />
                                    )}
                                />
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col xs={24} md={12}>
                                
                            </Col>

                            <Col xs={24} md={12}>

                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col xs={24} md={12}>

                                
                            </Col>
                            <Col xs={24} md={12}>

                            </Col>


                        </Row>

                    </Card>
                </Col>
            </Row>
        </div>

    );
}



