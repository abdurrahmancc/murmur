import React, { useEffect, useState } from 'react'
import FollowTop from '../components/FollowTop'
import { LoginUserType } from '../types/user';
import axiosPrivet from '../hooks/axiosPrivet';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const VerifiedFollowers = () => {
     const { username } = useParams();
const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<LoginUserType | null>(null);
    const [followers, setFollowers] = useState<number>(0);
    const [following, setFollowing] = useState<number>(0);


    const { data: followersData, isLoading: isLoadingfollowers, refetch: followersRefetch } = useQuery(
        ['get-followers'],
        async () => {
            const response = await axiosPrivet.get(`/api/follow/get-followers/${username}`);
            return response;
        }
    );

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const { data: following } = await axiosPrivet.get(`/api/follow/get-following/${username}`);
                const { data: followers } = await axiosPrivet.get(`/api/follow/get-followers/${username}`);
                const { data: user } = await axiosPrivet.post('/api/user/details',{relations:["following", "followers"]});
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
        {/* <FollowTop user={user}/> */}
        <div className='max-w-[330px] mx-auto mt-12'>
            <div className='text-white text-[31px] font-bold leading-[35px]'>You don’t have any verified followers yet</div>
            <div className='text-[#71767B] text-[15px] mt-2'>When a verified account follows you, you’ll see them here.</div>
        </div>
    </div>
  )
}

export default VerifiedFollowers