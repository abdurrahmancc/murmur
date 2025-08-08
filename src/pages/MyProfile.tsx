import React from 'react';
import { Outlet } from 'react-router-dom';
import RightSidebar from '../components/RightSidebar';
import Profile from '../components/profile/Profile';

const MyProfile = () => {
    return (
        <>
            <Profile />
        </>
    );
};

export default MyProfile;