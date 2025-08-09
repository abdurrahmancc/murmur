import React, { useEffect, useState } from 'react'
import axiosPrivet from '../../hooks/axiosPrivet';
import { CiCalendar } from 'react-icons/ci';
import {  NavLink, useParams } from 'react-router-dom';
import { LoginUserType } from '../../types/user';
import { format } from "date-fns";
import MurmurFeed from '../murmur/MurmurFeed';
import Loading from '../shared/Loading';
import EditProfileModal from './EditProfileModal';
import { FaUserCircle } from 'react-icons/fa';
import NotFound from '../../pages/NotFound';
import { useQuery } from 'react-query';





const Profile = () => {
    const [murmurRefetch, setMurmurRefetch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<LoginUserType | null>(null);
    const [loginUser, setLoginUser] = useState<LoginUserType | null>(null);
    const [followersCount, setFollowersCount] = useState<number>(0);
    const [followingCount, setFollowingCount] = useState<number>(0);
    const [showEditModel, setShowEditModel] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const { username } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const { data: user } = await axiosPrivet.get(`/api/user/${username}`);
                const { data: loginUser } = await axiosPrivet.get(`/api/user/me`);
                const { data: following } = await axiosPrivet.get(`/api/follow/get-following-count/${username}`);
                const { data: followers } = await axiosPrivet.get(`/api/follow/get-followers-count/${username}`);
                setUser(user.data);
                setLoginUser(loginUser.data)
                setFollowersCount(followers?.data)
                setFollowingCount(following?.data)
            } catch (error) {
                console.error("User fetch failed", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [username]);

    const { data: followingData, isLoading: isLoadingfollowing, refetch: followingRefetch } = useQuery(
        ['get-following'],
        async () => {
            const response = await axiosPrivet.get(`/api/follow/get-following`);
            return response;
        }
    );


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

    if (loading) return <Loading />
    if (!user) return <NotFound />

    const isLoginUser = loginUser?.id == user?.id;
    const isFollowing = followingData?.data?.data?.some(follow => follow.id == user?.id) || false;

    return (
        <div>
            <div className='h-[200px] w-full bg-[rgb(51,54,57)]'>
                {
                    user?.coverPhotoUrl && <img src={user?.coverPhotoUrl} alt="cover image" className="w-full h-full object-cover" />
                }
            </div>
            <div className='flex justify-between items-center px-[20px]' >
                <div className="avatar avatar-placeholder -mt-[70px]">
                    <div className="bg-neutral text-neutral-content w-[133px] h-[133px] rounded-full border-3 border-black ">
                        {
                            user?.avatarUrl ? <img src={user?.avatarUrl} alt="cover image" className="w-full min-w-[40px]  rounded-full h-full object-cover" /> : <FaUserCircle className='w-[133px] h-[133px] rounded-full' />
                        }
                    </div>
                </div>
                <div>{
                    isLoginUser ? <label onClick={() => setShowEditModel(true)} htmlFor="EditProfileModal" className='text-[15px] text-[#EFF3F4] btn bg-transparent hover:bg-[rgba(239,243,244,0.1)] rounded-full'>
                        Edit profile
                    </label>
                        : <>
                            {
                                isFollowing ? <button onClick={() => handleUnFollow(user?.id)} onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)} className='text-[15px] border-[0.5px] hover:border-[#F4212E]  min-w-[110px] border-gray-700 hover:text-[#F4212E] text-[#EFF3F4] btn bg-transparent hover:bg-[rgba(244,33,46,0.186)] rounded-full'>
                                    {isHovered ? 'Unfollow' : 'Following'}
                                </button>
                                    :
                                    <button onClick={() => handleFollow(user?.id)} className='text-[15px] border-[0.5px] border-gray-700 text-[#EFF3F4] btn bg-transparent hover:bg-[rgba(239,243,244,0.1)] rounded-full'>
                                        Follow
                                    </button>
                            }
                        </>
                }

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
                    <NavLink to={'following'}><span className='text-white'>{followingCount}</span> <span>Following</span></NavLink>
                    <NavLink to={"followers"}><span className='text-white'>{followersCount}</span> <span>Followers</span></NavLink>
                </div>

            </div>
            <div className='grid grid-cols-2 border-b border-gray-700 text-center'>
                <div className={`py-3 inline-block font-medium transition-all text-[16px] font-semibold border-b-4 border-blue-500`}>Posts</div>
            </div>
            <div className=''>
                <MurmurFeed api={`/api/get-murmurs-by-id/${user?.id}`} murmurRefetch={murmurRefetch} onRefetched={() => setMurmurRefetch(false)} />
            </div>

            {(user && showEditModel) && <EditProfileModal loginUser={user} onClose={() => setShowEditModel(false)} />}

        </div>
    )
}

export default Profile