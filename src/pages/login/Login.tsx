import { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import Button from 'src/components/_shared/Button/Button';
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
import { FaUserCircle } from 'react-icons/fa';
import { PiLockKeyFill } from 'react-icons/pi';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { ROUTES } from 'src/utils/Constants';



export default function Login() {

    // states
    const [loading, setLoading] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);

    // form
    const methods = useForm<LoginFormValues>();

    // redux
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


    // handlers
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

            console.log("Login result = ", result);
            const mockAuthResponse = {
                access_token: result.data.token,
                refresh_token: "not-implemented-yet",
                token_type: "to-be-verified",
                expires_in: -99999,
                needsToCreateCompany: result.data.needsToCreateCompany,
                rolePermissions: result.data.rolePermissions,
            };

            dispatch(tokenReceived(mockAuthResponse));
            navigate("/");

        } catch (err: any) {
            console.log("Error: ", err);
            openNotification("error", "Error", "Username or password incorrect");
        }
        finally {
            setLoading(false);
        }
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    }

    return (
        <div className='w-full h-full flex justify-center items-center'>
            <Row className='w-full h-full'>
                <Col xs={24} lg={16} className='w-full bg-[url("src/assets/images/pxfuel.png")]'>
                </Col>

                <Col xs={24} lg={8} className='w-full flex flex-col justify-center px-8 sm:px-20 pb-20 bg-white'>

                    <AppLogo width={50} height={50} />
                    <div className='w-full flex flex-col mb-12 items-start mt-10'>
                        <h1 className='text-4xl font-bold mb-3'>Sign In</h1>
                        <h4 className='text-gray-500 '>Enter your email and password to sign in!</h4>
                    </div>

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
                                variant="outlined"
                                value={value}
                                onChange={(value) => {
                                    onChange(value);
                                }}
                                size='medium'
                                error={error !== undefined}
                                helperText={error?.message}
                                required
                                onKeyDown={handleKeyPress} 
                                InputProps={{
                                    startAdornment: (
                                        <FaUserCircle size={24} color="#808080" className='mr-3' />
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
                                onKeyDown={handleKeyPress}
                                InputProps={{
                                    startAdornment: (
                                        <PiLockKeyFill size={28} color="#808080" className='mr-3' />
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                onMouseDown={(e) => e.preventDefault()}
                                            >
                                                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    style: { paddingLeft: 15 },
                                    className: "pl-8"
                                }}
                                label='Password'
                                type={showPassword ? 'text' : 'password'}
                            />
                        )}
                    />

                    <div className='flex justify-between mt-1'>
                        <label className='flex items-center space-x-2 hover:cursor-pointer'>
                            <input
                                type='checkbox'
                                className='form-checkbox h-4 w-4 accent-secondary'
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                                style={{cursor: 'pointer'}}
                            />
                            <span className='text-base text-gray-600'>Remember me</span>
                        </label>

                        <span
                            className='text-secondary text-sm hover:text-indigo-500 hover:underline'
                            onClick={() => navigate(ROUTES.ForgotPassword)}
                            style={{ cursor: 'pointer' }}

                        >
                            Forgot password?
                        </span>
                    </div>

                    <Button
                        className='h-12 rounded-lg mt-10 w-full'
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