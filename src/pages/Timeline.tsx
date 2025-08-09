import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import RightSidebar from '../components/RightSidebar';
import { Link, useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import MurmurCreate from '../components/murmur/MurmurCreate';
import MurmurFeed from '../components/murmur/MurmurFeed';
import { LoginUserType } from '../types/user';
import axiosPrivet from '../hooks/axiosPrivet';

const Timeline = () => {
       const [loading, setLoading] = useState(false);
    const [user, setUser] = useState <LoginUserType | null>(null);
    const [murmurRefetch, setMurmurRefetch] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const { data } = await axiosPrivet.get("/api/user/me");
                setUser(data?.data);
            } catch (error) {
                console.error("User fetch failed", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);


    
    return (
        <>
            <div className='flex gap-2 w-full px-4 pt-4 border-b-[0.5px] border-gray-700'>
                {
                    user?.avatarUrl ? <img src={user?.avatarUrl} alt={user?.lastName} className="w-full min-w-[40px] w-[40px] max-w-[40px] h-[40px] min-h-[40px] rounded-full h-full object-cover" /> : <FaUserCircle className='w-[40px] rounded-full h-[40px]' />
                }
                <MurmurCreate  onCreate={setMurmurRefetch} />
            </div>
            <div className=''>
                <MurmurFeed api={'/api/murmurs'}  murmurRefetch={murmurRefetch} onRefetched={() => setMurmurRefetch(false)} />
            </div>
        </>
    );
};

export default Timeline;