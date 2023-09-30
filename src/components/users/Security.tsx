import { TextField } from '@mui/material';
import { Col, Row, Card, Modal } from 'antd';
import { Button as AntdButtonn } from 'antd';
import { Controller, UseFormReturn, } from 'react-hook-form';
import { ChangePasswordRequest, SecurityFormType } from 'src/types/users';
import { Button } from '../_shared';
import { useState } from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { openNotification } from 'src/utils/Notification';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from 'src/utils/Constants';
import { getDefaultApiUrl } from 'src/config';
import { ApiResponseModel } from 'src/types/_shared';
import axios from 'axios';


type SecurityUserPageProps = {
    methods: UseFormReturn<SecurityFormType, any, undefined>
}

export default function SecurityUserPage({
    methods
}: SecurityUserPageProps) {

    const params = useParams();

    // navigation
    const navigate = useNavigate();

    // states
    const [deactivateLoading, setDeactivateLoading] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [changePasswordLoading, setChangePasswordLoading] = useState<boolean>(false);

    // helpers


    // handlers
    const handleDeactivateAccount = async () => {
        const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

        try {
            setDeactivateLoading(true);
            await delay(4000);  // mock API call waiting

            navigate(ROUTES.Users);
            openNotification("warning", "Success", "User account deactivated successfully");
        }
        catch(err: any) {
            console.log("Error while deactivating the user account", err);
            openNotification("error");
        }
        finally {
            setDeactivateLoading(false);
            setIsModalVisible(false);
        }
    }

    const handleChangePassword = async () => {
        console.log("Change Password -> data: ", methods.getValues());

        const isValid = await methods.trigger();

        if (!isValid) {
            return;
        }

        try {
            const BASE_URL = getDefaultApiUrl();
            const body: ChangePasswordRequest = {
                UserId: params.id ?? "",
                NewPassword: methods.getValues("NewPassword"),
                ConfirmNewPassword: methods.getValues("ConfirmNewPassword")
            };
            setChangePasswordLoading(true);
            
            const result = await axios.post<ApiResponseModel>(`${BASE_URL}/api/users/ChangePassword`, body, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });

            if (result.data.Success) {
                // console.log("data = ", result.data);
                openNotification("success", "Success", "Password changed successfully");
            }
            else if (result.data.Success == false && result.data.Errors.length > 0) {
                result.data.Errors.forEach(errorMessage => {
                    openNotification("warning", "Error", errorMessage);
                });
            }
        }
        catch(err: any) {
            console.log(`Error while geting the user data for ${params.id}: ${err}`);
            openNotification("error", "Error", "Error while changing the user password");
        }
        finally {
            setChangePasswordLoading(false);
        }
    }

    return (

        <div className='mx-4'>
            <Row gutter={16}>
                <Col xs={24} md={14}>
                    <Card
                        title={<div className="text-left font-semibold">Change Password</div>}
                        className='w-full mb-4 hover:shadow-[0_5px_15px_0_rgba(0,0,0,0.07)]'>

                        {/* <Row gutter={16}>
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

                        </Row> */}

                        <Row gutter={16}>
                            <Col xs={24} md={24}>
                                <Controller
                                    name={`NewPassword`}
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
                                                style={{marginBottom: error ? 0 : 15}}
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
                                                <p className="italic text-left text-red-500 text-sm mb-3">{error.message}</p>
                                            )}
                                        </div>
                                    )}
                                />
                            </Col>


                            <Col xs={24} md={24} >
                                <Controller
                                    name={`ConfirmNewPassword`}
                                    control={methods.control}
                                    rules={{
                                        required: true,

                                        validate: {
                                            passwordMatch: (value) => value === methods.getValues("NewPassword") || "Password do not match",
                                        },
                                    }}
                                    render={({
                                        field, fieldState: { error }
                                    }) => (
                                        <div>
                                            <TextField
                                                className='w-full'
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
                                    <li className="mb-0 font-sm">At least one number </li>
                                </ul>
                            </div>


                            <div className="mt-auto">
                                <Button 
                                    type="secondary" 
                                    onClick={handleChangePassword}
                                    loading={changePasswordLoading}
                                    disabled={changePasswordLoading} 
                                >
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

                                {/* TODO: To be refactorize to our Button component */}
                                <AntdButtonn
                                    className="bg-red-500 text-white hover:!bg-red-500 font-semibold border border-red-400 rounded shadow"
                                    style={{ color: "white" }}
                                    onClick={() => setIsModalVisible(true)}
                                >

                                    Deactivate Account
                                </AntdButtonn>

                                <Modal
                                    width={650}
                                    title={
                                        <div className='flex justify-start items-center'>
                                            <AiOutlineExclamationCircle size={24} color='#FFA500'/>
                                            <p className='ml-2'>Are you sure ?</p>
                                        </div>
                                    }
                                    open={isModalVisible}
                                    onOk={handleDeactivateAccount}
                                    okType='danger'
                                    okText='Deactivate'
                                    okButtonProps={{
                                        loading: deactivateLoading,
                                        disabled: deactivateLoading
                                    }}
                                    confirmLoading={deactivateLoading}
                                    onCancel={() => setIsModalVisible(false)} // Close the modal if canceled
                                >
                                    <div>
                                        You're about to <strong>deactivate</strong> the account for USER.FIRSTNAME USER.LASTNAME 
                                        with the email test@test.com. 
                                        <br />
                                        <br />
                                        You will be able to reactivate it back whenever you want from the Settings page.
                                    </div>
                                </Modal>
                            </div>

                        </div>

                    </Card>
                </Col>
            </Row>
        </div>

    );
}



