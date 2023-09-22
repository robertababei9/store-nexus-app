import { TextField } from '@mui/material';
import { Col, Row, Card } from 'antd';
import { Button as AntdButtonn } from 'antd';
import { Controller, UseFormReturn, } from 'react-hook-form';
import { SecurityFormType } from 'src/types/users';
import { Button } from '../_shared';
import { useState } from 'react';



// const onChange: DatePickerProps['onChange'] = (date, dateString) => {
//     console.log(date, dateString);
// };

type SecurityUserPageProps = {
    methods: UseFormReturn<SecurityFormType, any, undefined>
}

export default function SecurityUserPage({
    methods
}: SecurityUserPageProps) {

    const [currentPassword, setCurrentPassword] = useState("");

    //De vazut aici daca e bun !!!!!!!!!!!!!!!!!!!!!!!!!!
    const handleSave = async () => {
        console.log("password form data = ", methods.getValues());
        const isValid = await methods.trigger();

        if (!isValid) {
            return;
        }
    }

    return (

        <div className='mx-4'>
            <Row gutter={16}>
                <Col xs={24} md={14}>
                    <Card
                        title={<div className="text-left font-semibold">Change Password</div>}
                        className='w-full mb-4 hover:shadow-[0_5px_15px_0_rgba(0,0,0,0.07)]'>

                        <Row gutter={16}>
                            <Col xs={24} md={24}>
                                <Controller
                                    name={`currentPass`}
                                    control={methods.control}
                                    rules={{
                                        required: true,
                                        validate: {
                                            checkCurrentPassword: (value) => value === currentPassword || "Parola curentă este incorectă",
                                        },
                                    }}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            className='w-full'
                                            style={{ marginBottom: 15 }}
                                            label='Current Password'
                                            type='password'
                                            variant="outlined"
                                            value={field.value}
                                            onChange={(e) => {
                                                field.onChange(e.target.value); // Actualizează câmpul cu valoarea din eveniment
                                                setCurrentPassword(e.target.value); // Actualizează parola curentă
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
                                        required: true,
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters long",
                                        },
                                        pattern: {
                                            value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/, // Requires at least one number and one special character
                                            message: "Password must include at least one number and one special character",
                                        },
                                    }}
                                    render={({ field, fieldState: { error } }) => (
                                        <div>
                                            <TextField
                                                className='w-full'
                                                style={{ marginBottom: 15 }}
                                                label='New Password'
                                                type='password'
                                                variant="outlined"
                                                value={field.value}
                                                onChange={field.onChange}
                                                size='medium'
                                                error={error !== undefined}
                                                required
                                            />
                                            {error && (
                                                <p className="italic text-left text-red-500 text-sm">{error.message}</p>
                                            )}
                                        </div>
                                    )}
                                />
                            </Col>


                            <Col xs={24} md={12}>
                                <Controller
                                    name={`repeatPass`}
                                    control={methods.control}
                                    rules={{
                                        required: true,

                                        validate: {
                                            passwordMatch: (value) => value === methods.getValues("newPass") || "Password do not match",
                                        },
                                    }}
                                    render={({
                                        field, fieldState: { error }
                                    }) => (
                                        <div>
                                            <TextField
                                                className='w-full'
                                                style={{ marginBottom: 15 }}
                                                label='Confirm New Password'
                                                type='password'
                                                variant="outlined"
                                                value={field.value}
                                                onChange={field.onChange}
                                                size='medium'
                                                error={error !== undefined}
                                                required
                                            />
                                            {error && (
                                                <p className="italic text-left text-red-500 text-sm">{error.message}</p>
                                            )}
                                        </div>
                                    )}
                                />
                            </Col>
                        </Row>

                        <div className='flex justify-between'>

                            <div className="text-left">
                                <p className="my-2">
                                    <strong className="font-bold text-lg text-gray-600">Password requirements:</strong>
                                </p>
                                <p className="my-2 text-gray-600">
                                    Please follow this guide for a strong password
                                </p>
                                <ul className="list-disc list-inside mb-0 text-gray-600">
                                    <li className="mb-0 font-sm">One special character</li>
                                    <li className="mb-0 font-sm">Min 6 characters</li>
                                    <li className="mb-0 font-sm">One number (2 are recommended)</li>
                                    <li className="mb-0 font-sm">Change it often</li>
                                </ul>
                            </div>


                            <div className="mt-auto">
                                <Button type="secondary" onClick={handleSave} >
                                    Change Password
                                </Button>
                            </div>

                        </div>

                    </Card>
                </Col>

                <Col xs={24} md={10}>
                    <Card
                        title={<div className="text-left font-semibold">Deactivate Account</div>}
                        className='w-full mb-4 hover:shadow-[0_5px_15px_0_rgba(0,0,0,0.07)]'>

                        <Row gutter={16}>
                            <Col xs={24} md={24}>

                            </Col>

                        </Row>

                        <Row gutter={16}>
                            <Col xs={24} md={12}>

                            </Col>

                            <Col xs={24} md={12}>

                            </Col>
                        </Row>

                        <div className=''>

                            <div className="text-left">
                                <p className="my-2 text-lg  text-gray-600">
                                    To deactivate your account, first delete its resources. If you are the only owner of any teams, either assign another owner or deactivate the team.
                                    AICI MERGE ALT TEXT ORICUM
                                </p>
                            </div>


                            <div className="text-left mt-7">

                                <AntdButtonn
                                    className="bg-red-500 text-white hover:!bg-red-500 font-semibold border border-red-400 rounded shadow"
                                    style={{ color: "white" }}>

                                    Deactivate Account
                                </AntdButtonn>
                            </div>

                        </div>

                    </Card>
                </Col>
            </Row>
        </div>

    );
}



