// src/components/Layout.tsx

import { Outlet } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import { VscThreeBars } from 'react-icons/vsc';

export default function Layout() {
    return (
        <>
            {/* <div className="drawer lg:drawer-open container mx-auto">
                <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center border-l-[0.5px] border-gray-700 ">
                    <Outlet />
                    <label htmlFor="my-drawer-1" className="btn btn-primary drawer-button lg:hidden">
                        Open drawer
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
                    <LeftSidebar />
                </div>
            </div> */}
            <div className='max-w-[1260px] container mx-auto '>
                <div className="flex min-h-screen">
                    <div className="drawer md:max-w-[907px] md:drawer-open">
                        <input id="left-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content border-x-[0.5px] border-gray-700 max-w-[600px] flex-1 md:mr-[32px]">
                            {/* Toggle button only on small screens */}
                            <div className='h-[40px] bg-gray-700 md:hidden w-full flex justify-end items-center pr-5'>
                                <label htmlFor="left-drawer" className="drawer-button">
                                    <VscThreeBars className='text-white text-[24px]' />
                                </label>
                            </div>

                            <Outlet />
                        </div>

                        {/* Left Sidebar */}
                        <div className="drawer-side">
                            <label htmlFor="left-drawer" className="drawer-overlay"></label>
                            <aside className="w-[275px] p-4 h-full">
                                <LeftSidebar />
                            </aside>
                        </div>
                    </div>

                    {/* Right Sidebar (Always visible on md+) */}
                    <aside className="md:w-[350px] hidden lg:block">
                        <RightSidebar />
                    </aside>
                </div>
            </div>
        </>
    );
}
