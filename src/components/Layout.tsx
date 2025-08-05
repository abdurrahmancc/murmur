// src/components/Layout.tsx

import { Outlet } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';

export default function Layout() {
    return (
        <>
            <div className="drawer lg:drawer-open container mx-auto">
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
            </div>
        </>

        //         <div className="min-h-screen flex container mx-auto text-white">
        //             <div className='grid grid-cols-4 w-full'>
        //                 <aside className="col-span-1 border-r p-4 hidden md:block">

        //                 </aside>
        //                 <main className="w-full col-span-2 p-4  ">
        //                     <div className='border-t-4 border-indigo-500 min-h-10'>

        // </div>

        //                 </main>
        //                 <aside className="col-span-1 border-l p-4 hidden lg:block">
        //                     <RightSidebar />
        //                 </aside>
        //             </div>

        //         </div>
    );
}
