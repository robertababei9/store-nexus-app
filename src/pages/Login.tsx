import { useState } from 'react';
import { Input } from 'antd';
import Button from '../components/_shared/Button/Button';
import humansImage from '../assets/images/humans.png';


export default function Login() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");


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

                    <Input 
                        className='mb-3' 
                        placeholder='Email'
                        value={email}
                        onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
                    />
                    <Input.Password 
                        placeholder='Password' 
                        value={password}
                        onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
                    />

                    <Button
                        className='mt-10 w-full' 
                        type='primary' 
                        onClick={() => console.log("I'm clicked")}>
                            SIGN IN
                    </Button>

                </div>
            </div>
        </div>
    )
}
