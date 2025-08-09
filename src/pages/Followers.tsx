import React, { useEffect, useState } from 'react'
import FollowTop from '../components/FollowTop'
import axiosPrivet from '../hooks/axiosPrivet';
import { LoginUserType } from '../types/user';
import { useQuery } from 'react-query';
import Loading from '../components/shared/Loading';
import Follower from '../components/FollowerCom';
import FollowerCom from '../components/FollowerCom';
import { useParams } from 'react-router-dom';


const Followers = () => {
    const { username } = useParams();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<LoginUserType | null>(null);

    const { data: followersData, isLoading: isLoadingfollowers, refetch: followersRefetch } = useQuery(
        ['get-followers'],
        async () => {
            const response = await axiosPrivet.get(`/api/follow/get-followers/${username}`);
            return response;
        }
    );

    const { data: followingData, isLoading: isLoadingfollowing, refetch: followingRefetch } = useQuery(
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
                const { data: user } = await axiosPrivet.post('/api/user/details', { relations: ["following", "followers"] });
                setUser(user.data);
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
            {
                followersData?.data?.data.length > 0 ? followersData?.data?.data.map((follower) => <FollowerCom key={follower?.id} loginUser={user} following={followingData?.data?.data} followingRefetch={followingRefetch} followersRefetch={followersRefetch} follower={follower} />) : ""
            }
        </div>
    )
}

export default Followers