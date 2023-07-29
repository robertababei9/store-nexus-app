import { useState } from 'react';
<<<<<<<< HEAD:src/pages/Login.tsx
import { Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Button from '../components/_shared/Button/Button';
import humansImage from '../assets/images/humans.png';
========
import { useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import Button from '../../components/_shared/Button/Button';

import humansImage from '../../assets/images/humans.png';

>>>>>>>> e051f300ee2d7c3833b1d38c4db4075c697a32b0:src/pages/login/Login.tsx


export default function Login() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

<<<<<<<< HEAD:src/pages/Login.tsx
    const onFinish = (values: { email: string; password: string }) => {
        console.log('Received values of form:', values);
//Useful for API call to authenticate the user
    }
========
    const navigate = useNavigate();


    const onSubmit = () => {
        // validare 

        // api call
        
    }

>>>>>>>> e051f300ee2d7c3833b1d38c4db4075c697a32b0:src/pages/login/Login.tsx

    return (
        <div className='flex flex-col justify-center items-center  h-full'>

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
                            onClick={() => console.log("I'm clicked")}>
                            SIGN IN
                        </Button>
                    </Form>

                </div>
            </div>
        </div>
    )
}
