import { Avatar, Popover } from 'antd'
import React from 'react'
import { FaUserCircle } from 'react-icons/fa';


const content = (
    <div>
        <button className='flex items-center w-full hover:bg-gray-100 '>
            <FaUserCircle size={20} className='text-gray-400 mr-2'/>
           <p>My Profile</p> 
        </button> 
    </div>
)


export default function NavBar() {
  return (
    <div className='flex justify-between items-center h-[50px] w-full bg-white py-7 shadow-md'>
        <div>
            
        </div>
      
        <Popover content={content}  trigger="click">
            <div className='flex items-center mr-8 px-4 hover:cursor-pointer hover:bg-gray-100 hover:rounded-3xl'>
                <div className='flex flex-col items-end mr-2'>
                    <p className='font-semibold text-base'>
                        Kamikaze
                    </p>
                    <p className='text-xs text-gray-600'>
                        Admin
                    </p>
                </div>
                <Avatar size={'large'} src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=4"/>
            </div>
        </Popover>

    </div>
  )
}
