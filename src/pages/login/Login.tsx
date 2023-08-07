import { useState, useEffect } from 'react';
import { Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Button from 'src/components/_shared/Button/Button';
import humansImage from 'src/assets/images/humans.png';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { ROUTES } from 'src/utils/Constants';



export default function Login() {

    // states
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    // navigation
    const navigate = useNavigate();

    useEffect(() => {
        // check if logged in
        if (localStorage.getItem("accessToken")) {
            navigate(ROUTES.Dashboard)
        }
    }, []);


    const onFinish = (values: { email: string; password: string }) => {
        console.log('Received values of form:', values);

    }


    // noi functia asta o mutam pe alt Thread
    const handleLogin = async () => {

        const BASE_URL = "https://store-nexus-api.azurewebsites.net";
        const body = {
            Email: "robert@gmail.com",
            Password: "asd123"
        };
        setLoading(true);

        try {
            const result = await axios.post(BASE_URL + "/users/login", body); 
            console.log("result = ", result);
            localStorage.setItem("accessToken", result.data);
            navigate(ROUTES.Dashboard);
        } catch(err: any) {
            console.log("Error: ", err);
        }
        finally {
            setLoading(false);
        }


        // login = success
        // navigate(ROUTES.Dashboard); 

    }


    const onSubmit = () => {
        // validare 

        // api call
        
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
