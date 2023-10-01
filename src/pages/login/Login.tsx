import { useState, useEffect } from 'react';
import { Col, Row } from 'antd';

import Button from 'src/components/_shared/Button/Button';
import pxfuel from 'src/assets/images/pxfuel.png';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { tokenReceived } from 'src/features/authentication/authenticationSlice';
import { RootState } from 'src/redux/store';
import { openNotification } from 'src/utils/Notification';
import { getDefaultApiUrl } from 'src/config';
import { LoginFormValues, LoginResponse } from 'src/types/login';
import { Controller, useForm } from 'react-hook-form';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { AppLogo } from 'src/components/_shared/Icons/Icons';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';



export default function Login() {

    // states
    const [loading, setLoading] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);


    const methods = useForm<LoginFormValues>();


    const { currentUser } = useSelector(
        (state: RootState) => state.authentication
    );
    const dispatch = useDispatch();

    // navigation
    const navigate = useNavigate();


    // prevent user going to /login if it's authenticated
    useEffect(() => {
        if (currentUser) {
            navigate("/")
        }
    }, [currentUser]);


    const onFinish = (values: { email: string; password: string }) => {
        console.log('Received values of form:', values);

    }


    // noi functia asta o mutam pe alt Thread
    const handleLogin = async () => {

        const canContinue = await methods.trigger();
        if (canContinue == false) {
            return;
        }

        const BASE_URL = getDefaultApiUrl();
        setLoading(true);

        try {
            const body = methods.getValues();
            console.log(body);

            //Optiune remember me. E ok asa? hmmm. verifica
            const loginData = {
                ...body,
                rememberMe,
            };

            const result = await axios.post<LoginResponse>(BASE_URL + "/api/users/login", body);

            console.log("result = ", result);
            const mockAuthResponse = {
                access_token: result.data.token,
                refresh_token: "not-implemented-yet",
                token_type: "to-be-verified",
                expires_in: -99999,
                needsToCreateCompany: result.data.needsToCreateCompany
            };

            navigate("/");
            dispatch(tokenReceived(mockAuthResponse));

        } catch (err: any) {
            console.log("Error: ", err);
            openNotification("error", "Error", "Username or password incorrect");
        }
        finally {
            setLoading(false);
        }

    }



    return (
        <div className='w-full h-full flex justify-center items-center'>
            {/*  daca pun w-full la un Row --> nu o sa mai mearga 'gutter' ... */}
            <Row className='w-full h-full'>
                <Col xs={24} lg={16} className='w-full bg-[url("src/assets/images/pxfuel.png")]'>
                    {/* Trebuie alt bg img, ceva ffffffff mare si calitativ, el acolo l a creat, el a facut jum de cerc */}
                    {/* A folosit svg */}
                    {/* Nu cont, copy paste de pe net ... alta imagine trebuie */}
                    {/*  Nu-mi place asta cu  puzzle*/}
                </Col>

                {/* De vazut daca afecteaza padding-ul cand esti pe alte dispozitive */}
                <Col xs={24} lg={8} className='w-full flex flex-col justify-center px-8 sm:px-20 pb-20 bg-white'>
                    {/* ----> Asta e SVG, logo-ul */}

                    <AppLogo width={50} height={50} />
                    <div className='w-full flex flex-col mb-12 items-start mt-10'>
                        <h1 className='text-4xl font-bold mb-3'>Sign In</h1>
                        <h4 className='text-gray-500 '>Enter your email and password to sign in !</h4>
                    </div>
                    {/* Form pt login */}
                    <Controller
                        name={`Email`}
                        control={methods.control}
                        rules={{
                            required: "Please enter your email!",
                            validate: {
                                maxLength: (v) =>
                                    v.length <= 50 || "The email should have at most 50 characters",
                                matchPattern: (v) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                                    "Please enter a valid email address!",
                            },
                        }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                className='w-full'
                                style={{ marginBottom: 20 }}
                                label='Email'
                                // color='primary' Aici e smecher de facut culoarea la chenar la fel ca butonul de login, e greu cam
                                variant="outlined"
                                value={value}
                                onChange={(value) => {
                                    onChange(value);
                                }}
                                size='medium'
                                error={error !== undefined}
                                helperText={error?.message}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircleIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />

                    <Controller
                        name={`Password`}
                        control={methods.control}
                        rules={{
                            required: 'Please enter your password!',
                        }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                className='w-full'
                                style={{ marginBottom: 15 }}
                                variant="outlined"
                                value={value}
                                onChange={(e) => {
                                    onChange(e.target.value);
                                }}
                                size='medium'
                                error={error !== undefined}
                                helperText={error?.message}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                onMouseDown={(e) => e.preventDefault()}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                label='Password'
                                type={showPassword ? 'text' : 'password'}
                            />
                        )}
                    />

                    <div className='flex justify-between mt-1'>
                        <label className='flex items-center space-x-2'>
                            <input
                                type='checkbox'
                                className='form-checkbox accent-indigo-600'
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                            />
                            <span className='text-base text-gray-900'>Remember me</span>
                        </label>

                        <a href='/forgot-password' className='text-indigo-600 text-sm hover:text-indigo-300 underline hover:underline'>Forgot password?</a>
                    </div>

                    <Button
                        className='h-12 rounded-full mt-10 w-full'
                        type='secondary'
                        loading={loading}
                        onClick={handleLogin}>
                        SIGN IN
                    </Button>

                </Col>
            </Row>
        </div>
    )
}