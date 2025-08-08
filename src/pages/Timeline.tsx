import React from 'react';
import { Outlet } from 'react-router-dom';
import RightSidebar from '../components/RightSidebar';
import { Link, useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import MurmurCreate from '../components/murmur/MurmurCreate';
import MurmurFeed from '../components/murmur/MurmurFeed';

const Timeline = () => {



    return (
        <>
            <div className='flex gap-2 w-full px-4 pt-4 border-b-[0.5px] border-gray-700'>
                <FaUserCircle className='w-[40px] h-[40px]' />
                <MurmurCreate />
            </div>
            <div className=''>
                <MurmurFeed api={'/api/murmurs'} />
            </div>
        </>
    );
};

export default Timeline;