import { useState, useEffect } from 'react';
import { Checkbox, Form, FormInstance, Input } from 'antd';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Button from 'src/components/_shared/Button/Button';
import humansImage from 'src/assets/images/humans.png';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { ROUTES } from 'src/utils/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { tokenReceived } from 'src/features/authentication/authenticationSlice';
import { RootState } from 'src/redux/store';
import { openNotification } from 'src/utils/Notification';



export default function Login() {

    // states
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const [form, setForm] = useState<FormInstance | null>(null);


    const { currentUser } = useSelector(
        (state: RootState) => state.authentication
    );
    const dispatch = useDispatch();
    
    // navigation
    const navigate = useNavigate();
    

    // prevent user going to /login if it's authenticated
    useEffect(() => {
        console.log("User prevented to access /login if authenticated");
        console.log("currentUser: ", currentUser);
        if (currentUser) {
            navigate(ROUTES.Dashboard)
        }
    }, [currentUser]);


    const onFinish = (values: { email: string; password: string }) => {
        console.log('Received values of form:', values);

    }


    // noi functia asta o mutam pe alt Thread
    const handleLogin = async () => {

        const BASE_URL = "https://store-nexus-app.azurewebsites.net/api";
        const body = {
            Email: email,
            Password: password
        };
        setLoading(true);

        try {
            const result = await axios.post(BASE_URL + "/users/login", body);


            console.log("result = ", result);
            const mockAuthResponse = {
                access_token: result.data,
                refresh_token: "not-implemented-yet",
                token_type: "to-be-verified",
                expires_in: -99999
            };

            navigate(ROUTES.Dashboard);
            dispatch(tokenReceived(mockAuthResponse));
            // arata-mi ca merge

        } catch (err: any) {
            console.log("Error: ", err);
            openNotification("error", "Error", "Username or password incorrect");
        }
        finally {
            setLoading(false);
        }


        // login = success
        // navigate(ROUTES.Dashboard); 

    }


    const onSubmit = () => {
        if (form) {
            form.validateFields()
                .then(() => {
                    handleLogin();
                })
                .catch(errorInfo => {
                    console.log('Form validation failed:', errorInfo);
                });
        }
    }



    return (
        <div className='flex flex-col justify-center items-center h-screen w-full'>

            <div className='flex w-100 max-w-[1014px] bg-white rounded-3xl p-5'>
                <div className='w-[60%]'>
                    <img
                        src={humansImage}
                        alt="Humans image"
                    />
                </div>
                <div className='w-[40%] flex flex-col justify-center items-center'>
                    <div className='w-full flex flex-col mb-12 items-start'>
                        <h1 className='text-4xl font-bold mb-3'>Sign In</h1>
                        <h4 className='text-gray-400 '>Enter your email and password to sign in !</h4>
                    </div>

                    <Form
                        name="login-form"
                        className='mb-3'
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        onFinish={onSubmit}
                        form={form as FormInstance}
                    >
                        <Form.Item
                            name='email'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your email!',
                                },
                                {
                                    type: 'email',
                                    message: 'Please enter a valid email address!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your password!',
                                },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Form.Item
                                name="remember"
                                valuePropName='checked'
                                noStyle
                            >
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <a className="login-form-forgot" href="">
                                Forgot your password?
                            </a>
                        </Form.Item>


                        <Button
                            className='mt-10 w-full'
                            type='primary'
                            loading={loading}
                            onClick={handleLogin}>
                            SIGN IN
                        </Button>
                    </Form>

                </div>
            </div>
        </div>
    )
}
