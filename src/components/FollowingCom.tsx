import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import axiosPrivet from '../hooks/axiosPrivet'
import { NavLink } from 'react-router-dom';

const FollowingCom = ({ user, followingRefetch }) => {
    const [isHovered, setIsHovered] = useState(false);
    const handleFollow = async (id) => {
        try {
            await axiosPrivet.delete(`/api/follow/${id}`)
            followingRefetch()
        } catch (error) {
            console.log("error", error.message)
        }
    }
    return (
        <div className="p-4 hover:bg-base-200 transition-all">
            <div className='flex gap-2 w-full'>
                <div className='w-[40px] rounded-full h-[40px]'>
                    {
                        user?.avatarUrl ? <img src={user?.avatarUrl} alt={user?.lastName} className="w-full min-w-[40px]  rounded-full h-full object-cover" /> : <FaUserCircle className='w-[40px] rounded-full h-[40px]' />
                    }
                </div>
                <div className='w-full'>
                    <div className='flex justify-between'>
                        <div className='leading-[20px]'>
                            <div>
                                <NavLink to={`/${user?.username}`} className="font-bold text-[#E7E9EA]"> {user?.firstName} {user?.lastName}</NavLink>
                            </div>
                            <span className='text-[#71767B]'>@{user?.username}</span>
                        </div>
                        <button onClick={() => handleFollow(user?.id)} onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)} className='text-[15px] border-[0.5px] hover:border-[#F4212E]  min-w-[110px] border-gray-700 hover:text-[#F4212E] text-[#EFF3F4] btn bg-transparent hover:bg-[rgba(244,33,46,0.186)] rounded-full'>
                            {isHovered ? 'Unfollow' : 'Following'}
                        </button>
                    </div>
                    <div className='text-[15px] mt-2 text-[#E7E9EA]'>
                        {user?.bio}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FollowingCom