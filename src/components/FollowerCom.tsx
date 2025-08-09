import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import axiosPrivet from '../hooks/axiosPrivet'
import { NavLink } from 'react-router-dom';

const FollowerCom = ({ loginUser, follower, followersRefetch, following, followingRefetch }) => {
    const isFollowing = following?.some(follow => follow.id == follower?.id) || false;

    const [isHovered, setIsHovered] = useState(false);
    const handleUnFollow = async (id) => {
        try {
            await axiosPrivet.delete(`/api/follow/${id}`)
            followingRefetch()
        } catch (error) {
            console.log("error", error.message)
        }
    }
    const handleFollow = async (id) => {
        try {
            await axiosPrivet.post(`/api/follow/${id}`)
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
                        follower?.avatarUrl ? <img src={follower?.avatarUrl} alt={follower?.lastName} className="w-full min-w-[40px]  rounded-full h-full object-cover" /> : <FaUserCircle className='w-[40px] rounded-full h-[40px]' />
                    }
                </div>
                <div className='w-full'>
                    <div className='flex justify-between'>
                        <div className='leading-[20px]'>
                            <div>
                                <NavLink to={`/${follower?.username}`} className="font-bold text-[#E7E9EA]"> {follower?.firstName} {follower?.lastName}</NavLink>
                            </div>
                            <span className='text-[#71767B]'>@{follower?.username}</span>
                        </div>
                        {
                            isFollowing ?
                                <button onClick={() => handleUnFollow(follower?.id)} onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)} className='text-[15px] border-[0.5px] hover:border-[#F4212E]  min-w-[110px] border-gray-700 hover:text-[#F4212E] text-[#EFF3F4] btn bg-transparent hover:bg-[rgba(244,33,46,0.186)] rounded-full'>
                                    {isHovered ? 'Unfollow' : 'Following'}
                                </button>
                                :
                                <button onClick={() => handleFollow(follower?.id)} className='text-[15px] border-[0.5px] border-gray-700 text-[#EFF3F4] btn bg-transparent hover:bg-[rgba(239,243,244,0.1)] rounded-full'>
                                    Follow
                                </button>
                        }
                    </div>
                    <div className='text-[15px] mt-2 text-[#E7E9EA]'>
                        {follower?.bio}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FollowerCom