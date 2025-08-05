import React from 'react';
import { Outlet } from 'react-router-dom';
import RightSidebar from '../components/RightSidebar';
import { Link, useLocation } from 'react-router-dom';
import MurmurPost from '../components/MurmurPost';
import { FaUserCircle } from 'react-icons/fa';

const Timeline = () => {
    return (
        <>
            <div className="drawer lg:drawer-open drawer-end container mx-auto">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col  border-r-[0.5px] border-gray-700 ">
                    <div className='grid grid-cols-2 border-b border-gray-700 text-center'>
                        <Link to="/"  >
                            <div className={`py-3 inline-block font-medium transition-all ${location.pathname === '/' ? 'text-[16px] font-semibold border-b-4 border-blue-500' : 'text-base text-gray-400'
                                }`}>For you</div>
                        </Link>
                        <Link to="/following"  >
                            <div className={`py-3 inline-block font-medium transition-all ${location.pathname === '/following' ? 'text-[16px] font-semibold border-b-4 border-blue-500' : 'text-base text-gray-400'
                                }`}>Following</div>
                        </Link>
                    </div>
                    <div className='flex gap-2 w-full p-4'>
                        <FaUserCircle className='w-[40px] h-[40px]' />
                        <MurmurPost/>
                    </div>

                    <Outlet />
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                        Open drawer
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <RightSidebar />
                </div>
            </div>
        </>
    );
};

export default Timeline;