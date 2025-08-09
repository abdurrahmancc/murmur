// src/components/Layout.tsx

import { Outlet } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import { VscThreeBars } from 'react-icons/vsc';

export default function Layout() {
    return (
        <>
            <div className='max-w-[1260px] container mx-auto '>
                <div className="flex min-h-screen">
                    <div className="drawer md:max-w-[907px] md:drawer-open">
                        <input id="left-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content border-x-[0.5px] border-gray-700 max-w-[600px] flex-1 md:mr-[32px]">
                            <div className='h-[40px] bg-gray-700 md:hidden w-full flex justify-end items-center pr-5'>
                                <label htmlFor="left-drawer" className="drawer-button">
                                    <VscThreeBars className='text-white text-[24px]' />
                                </label>
                            </div>
                            <Outlet />
                        </div>
                        <div className="drawer-side scrollbar-hide">
                            <label htmlFor="left-drawer" className="drawer-overlay"></label>
                            <aside className="w-[275px] p-4 h-full">
                                <LeftSidebar />
                            </aside>
                        </div>
                    </div>
                    <aside className="md:w-[350px] hidden lg:block h-screen sticky top-0 overflow-y-auto scrollbar-hide">
                        <RightSidebar />
                    </aside>
                </div>
            </div>
        </>
    );
}
