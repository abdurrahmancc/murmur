import React, { useEffect, useState } from 'react';
import { Outlet, useMatch, useParams } from 'react-router-dom';
import RightSidebar from '../components/RightSidebar';
import Profile from '../components/profile/Profile';
import { LoginUserType } from '../types/user';
import axiosPrivet from '../hooks/axiosPrivet';
import FollowTop from '../components/FollowTop';

const MyProfile = () => {

    const { username } = useParams();
    const isFollowers = useMatch("/:username/followers");
    const isFollowing = useMatch("/:username/following");
    const isVerifiedFollowers = useMatch("/:username/verified_followers");

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<LoginUserType | null>(null);
    const [loginUser, setLoginUser] = useState<LoginUserType | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const { data: user } = await axiosPrivet.get(`/api/user/${username}`);
                const { data: loginUser } = await axiosPrivet.get(`/api/user/me`);
                setUser(user.data);
                setLoginUser(loginUser.data)
            } catch (error) {
                console.error("User fetch failed", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [username]);

    return (
        <>
            {isFollowers || isFollowing || isVerifiedFollowers ? (
                <>
                    <FollowTop user={user} />
                    <Outlet />
                </>
            ) : (
                <Profile />
            )}

        </>
    );
};

export default MyProfile;