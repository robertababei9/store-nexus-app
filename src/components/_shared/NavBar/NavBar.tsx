import { Avatar, Popover } from 'antd';
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { IoNotificationsOutline } from 'react-icons/io5';
import Badge from '@mui/material/Badge';
import { SwipeableDrawer } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

const content = (
    <div>
        <button className='flex items-center w-full hover:bg-gray-100 '>
            <FaUserCircle size={20} className='text-gray-400 mr-2' />
            <p>My Profile</p>
        </button>
    </div>
);

export default function NavBar() {

    // redux
    const { currentUser } = useSelector(
        (state: RootState) => state.authentication
      )

    //states
    const [hasNotifications, setHasNotifications] = useState(true);
    const [rightInfoOpen, setRightInfoOpen] = useState<boolean>(false);

    const handleOpenFileDetails = () => {
        handleOpenDrawer();
    }

    const handleOpenDrawer = () => {
        setRightInfoOpen(true);
    }

    const handleCloseDrawer = () => {
        setRightInfoOpen(false);
    }



    return (
        //am folosit aici zIndex pentru ca daca nu il ai, shadow-ul de la navbar nu trece peste card-uri. (problem doar la dashboard)
        <div className='flex justify-between items-center h-[50px] w-full bg-white py-7 shadow-md' style={{ zIndex: 999 }}> 
            <div>
            </div>
            <div className='flex items-center'>
                {hasNotifications && (
                    <div className='flex items-center px-1 py-2 hover:cursor-pointer hover:bg-gray-100 hover:rounded-3xl'>
                        <Badge
                            color="error" variant="dot" style={{ marginRight: '10px' }}>
                            <IoNotificationsOutline size={20} onClick={(handleOpenFileDetails)} />
                        </Badge>
                    </div>
                )}
                <Popover content={content} trigger="click">
                    <div className='flex items-center mr-8 px-4 hover:cursor-pointer hover:bg-gray-100 hover:rounded-3xl'>
                        <div className='flex flex-col items-end mr-2'>
                            <p className='font-semibold text-base'>
                                {currentUser?.sub}
                            </p>
                            <p className='text-xs text-gray-600'>
                                {currentUser?.Role}
                            </p>
                        </div>
                        <Avatar size={'large'} src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=4" />
                    </div>
                </Popover>

                <SwipeableDrawer
                    sx={{
                        width: 300
                    }}
                    // container={containerRef.current} nush ce e asta si daca trebuie
                    anchor="right"
                    open={rightInfoOpen}
                    onClose={handleCloseDrawer}
                    onOpen={handleOpenDrawer}
                    swipeAreaWidth={56}
                    disableSwipeToOpen={true}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    PaperProps={{
                        style: {
                            width: 350
                        }
                    }}
                >
                    <div className='w-full h-full flex flex-col items-center px-8 my-12'>
                        <div className='w-full flex justify-end items-center px-3 sm:px-6 pb-6'>
                            <button onClick={handleCloseDrawer}>
                                <AiOutlineClose size={32} className='text-gray-500' />
                            </button>
                        </div>

                        <div className='w-full flex flex-col items-start mt-8'>
                            <p className='text-2xl font-medium mt-2'>Notifications</p>
                            <div className='w-full h-[1px] bg-gray-200 my-4' />
                        </div>
                    </div>
                </SwipeableDrawer>
            </div>
        </div>
    );
}
