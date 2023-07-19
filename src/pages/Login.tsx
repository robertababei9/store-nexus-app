import React from 'react'

const wotlkAudio = require('../assets/wotlk_login_sound.mp3');


export default function Login() {


    return (
        <div className='flex flex-col justify-center items-center bg-red-200 h-full'>

            <h1 className='text-3xl font-bold underline'>
                Hello, this is Login page
            </h1>

            <h1 className='text-xl font-semibold '>
                You will learn step by step to use tailwind
            </h1>

            <h1 className='text-xl font-semibold '>
                Tailwind it's a framework over CSS. It's like a wrapper over any CSS functionality
            </h1>

            <h1 className='text-xl font-semibold '>
                The advantages of CSS it's that you can stylize everything very fast
            </h1>

            <h1 className='text-xl font-semibold '>
                Here it's the
                <a target='_blank' className='underline text-blue-800' href='https://tailwindcss.com/docs/flex-direction'>
                    tailwind documentation
                </a>. 
                You will need to look for the properties you want to use.
                Especially at the begining. 
            </h1>
        </div>
    )
}
