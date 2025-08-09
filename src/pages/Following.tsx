import React, { useEffect, useState } from 'react'
import FollowTop from '../components/FollowTop'
import { LoginUserType } from '../types/user';
import axiosPrivet from '../hooks/axiosPrivet';
import { useQuery } from 'react-query';
import FollowingCom from '../components/FollowingCom';
import { NavLink, useParams } from 'react-router-dom';

const Following = () => {
    const { username } = useParams();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<LoginUserType | null>(null);
    const [followers, setFollowers] = useState<number>(0);
    const [following, setFollowing] = useState<number>(0);

    const { data: followersData, isLoading: isLoadingfollowinh, refetch: followingRefetch } = useQuery(
        ['get-following'],
        async () => {
            const response = await axiosPrivet.get(`/api/follow/get-following/${username}`);
            return response;
        }
    );

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const { data: following } = await axiosPrivet.get("/api/follow/get-following");
                const { data: followers } = await axiosPrivet.get("/api/follow/get-followers");
                const { data: user } = await axiosPrivet.post('/api/user/details', { relations: ["following", "followers"] });
                setUser(user.data);
                setFollowers(followers?.data)
                setFollowing(following?.data)
            } catch (error) {
                console.error("User fetch failed", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <div>
            {
                followersData?.data?.data.length > 0 ? followersData?.data?.data.map((user) => <FollowingCom key={user?.id} followingRefetch={followingRefetch} user={user} />)
                    :
                    <div className='text-center'>
                        <div className='max-w-[330px] mx-auto mt-12 mb-[20px]'>
                            <div className='text-white text-[31px] font-bold leading-[35px]'>Be in the know</div>
                            <div className='text-[#71767B] text-[15px] mt-2'>Following accounts is an easy way to curate your timeline and know what’s happening with the topics and people you’re interested in.</div>
                        </div>
                        <NavLink to={"/"} className='btn bg-[#1A8CD8] text-[20px] text-white !px-[40px] rounded-full !py-[32px]'>Fine people to follow</NavLink>
                    </div>
            }
        </div>
    )
}

export default Following