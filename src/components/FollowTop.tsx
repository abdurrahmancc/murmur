import React, { useEffect, useState } from 'react'
import { LoginUserType } from '../types/user';
import axiosPrivet from '../hooks/axiosPrivet';
import Loading from './shared/Loading';
import { FiArrowLeft } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const FollowTop = ({ user }) => {

    return (
        <div>
            <div className='flex gap-[20px] items-center'>
                <button className='btn text-white w-[34px] h-[34px] p-[0px] rounded-full border-none bg-transparent hover:bg-[#ffffff20]'><FiArrowLeft className='text-[20px] ' /></button>
                <div className='text-start leading-[24px]'>
                    <h5 className="font-bold text-[20px] text-[#E7E9EA] text-nowrap">{user?.firstName} {user?.lastName}</h5>
                    <span className='text-[#71767B] text-[15px]'>@{user?.username}</span>
                </div>
            </div>
            <ul className="flex gap-2 justify-between border-b border-gray-700">
                <li className='px-[50px] py-3'>
                    <NavLink to="verified_followers" className={({ isActive }) => `pb-3 ${isActive ? 'text-white font-bold border-b-3 border-blue-500' : 'text-[#71767B]'}`}>
                        Verified Followers
                    </NavLink>
                </li>
                <li className='px-[50px] py-3'>
                    <NavLink to="followers" className={({ isActive }) => `pb-3 ${isActive ? 'text-white font-bold border-b-3 border-blue-500' : 'text-[#71767B]'}`} >
                        Followers
                    </NavLink>
                </li>
                <li className='px-[50px] py-3'>
                    <NavLink to="following" className={({ isActive }) => `pb-3 ${isActive ? 'text-white font-bold border-b-3 border-blue-500' : 'text-[#71767B]'}`}>
                        Following
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default FollowTop