// src/components/LeftSidebar.tsx

import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import axiosPrivet from '../hooks/axiosPrivet';
import { accessToken, removeCookie } from '../hooks/useCookies';
import { LoginUserType } from '../types/user';
import { leftSideRoute } from '../routes/Routes';


export default function LeftSidebar() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<LoginUserType | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const { data } = await axiosPrivet.get(`/api/user/me`);
                setUser(data?.data);
            } catch (error) {
                console.error("User fetch failed", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleSignOut = () => {
        removeCookie(accessToken);
        navigate("/login")
    };


    return (
        <nav className="menu justify-between text-base-content min-h-full w-full">
            <div className='flex flex-col gap-[14px]'>
                {
                    leftSideRoute.map((route, index) => {
                        const routePath = route.path === "me" ? user?.username ?? "" : route.path;
                        return <li key={index} >
                            <NavLink to={routePath} className={({ isActive }) => `block text-white max-w-fit rounded-full text-[20px] pr-[20px] py-[10px] flex items-center ${isActive ? 'font-bold' : ''}`}>
                                <route.icon className="text-[26px]" />
                                <span className="px-[5px] inline-block">{route.name}</span>
                            </NavLink>
                        </li>
                    })
                }
                <li>
                    <button className='btn bg-white text-black py-[25px] text-[17px] rounded-full w-full'>Post</button>
                </li>
            </div>
            <li>
                <div className="dropdown dropdown-top dropdown-center mt-5 rounded-full">
                    <div tabIndex={0} role="button" className="">
                        <button className='block w-full text-white  text-[20px] py-[5px] pr-[20px] flex gap-[10px] items-center cursor-pointer'>
                            {
                                user?.avatarUrl ? <img src={user?.avatarUrl} alt={user?.firstName} className="w-full w-[40px] h-[40px] max-w-[40px] min-h-[40px] rounded-full h-full object-cover" /> : <FaUserCircle className='w-[40px] rounded-full h-[40px]' />
                            }
                            <div className='text-start leading-[20px]'>
                                <h5 className="font-bold text-[15px] text-[#E7E9EA] text-nowrap">{user?.firstName} {user?.lastName}</h5>
                                <span className='text-[#71767B] text-[15px]'>@{user?.username}</span>
                            </div>
                        </button>
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-[15px] !px-[0px] z-1 w-52 py-2 shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                        <li>
                            <button>Add an existing account</button>
                        </li>
                        <li>
                            <button onClick={() => handleSignOut()}>Log Out @{user?.username}</button>
                        </li>
                    </ul>
                </div>
            </li>
        </nav>
    );
}
