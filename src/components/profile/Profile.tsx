import React, { useEffect, useState } from 'react'
import axiosPrivet from '../../hooks/axiosPrivet';
import { CiCalendar } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { LoginUserType } from '../../types/user';
import { format } from "date-fns";
import MurmurFeed from '../murmur/MurmurFeed';
import Loading from '../shared/Loading';
import EditProfileModal from './EditProfileModal';





const Profile = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<LoginUserType | null>(null);
    const [followersCount, setFollowersCount] = useState<number>(0);
    const [followingCount, setFollowingCount] = useState<number>(0);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const { data } = await axiosPrivet.get("/api/user/me");
                const { data: following } = await axiosPrivet.get("/api/follow/get-following-count");
                const { data: followers } = await axiosPrivet.get("/api/follow/get-followers-count");
                setUser(data.data);
                setFollowersCount(followers?.data)
                setFollowingCount(following?.data)
            } catch (error) {
                console.error("User fetch failed", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) return <Loading />

    return (
        <div>
            <div className='h-[200px] w-full bg-[rgb(51,54,57)]'>
            </div>
            <div className='flex justify-between items-center px-[20px]' >
                <div className="avatar avatar-placeholder -mt-[70px]">
                    <div className="bg-neutral text-neutral-content w-[133px] h-[133px] rounded-full border-3 border-black ">
                        <img src="https://img.daisyui.com/images/profile/demo/idiotsandwich@192.webp" />
                    </div>
                </div>
                <div>
                    <label htmlFor="EditProfileModal" className='text-[15px] text-[#EFF3F4] btn bg-transparent hover:bg-[rgba(239,243,244,0.1)] rounded-full'>
                        {/* <button >Edit profile</button> */}
                        Edit profile
                    </label>
                </div>
            </div>
            <div className='px-[20px]'>
                <div className='text-start leading-[26px] mt-4'>
                    <h5 className="font-bold text-[20px] text-[#E7E9EA] text-nowrap">{user?.firstName} {user?.lastName}</h5>
                    <span className='text-[#71767B] text-[15px]'>@{user?.username}</span>
                </div>
                <div className='mt-[12px] flex items-center gap-[12px] text-[#71767B] text-[15px]'>
                    <CiCalendar className='text-[18px]' />
                    <span>Joined {user?.createdAt && format(new Date(user.createdAt), "MMMM yyyy")}</span>
                </div>
                <div className='mt-[12px] flex items-center gap-[12px] text-[#71767B] text-[15px]'>
                    <a><span className='text-white'>{followingCount}</span> <span>Following</span></a>
                    <a><span className='text-white'>{followersCount}</span> <span>Followers</span></a>
                </div>

            </div>
            <div className='grid grid-cols-2 border-b border-gray-700 text-center'>
                <div className={`py-3 inline-block font-medium transition-all text-[16px] font-semibold border-b-4 border-blue-500`}>Posts</div>
            </div>
            <div className=''>
                <MurmurFeed api={`/api/get-murmurs-by-id/${user?.id}`} />
            </div>
            <EditProfileModal />
        </div>
    )
}

export default Profile