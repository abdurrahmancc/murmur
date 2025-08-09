import { useState, useEffect } from 'react'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import Timeline from './pages/Timeline'
import MurmurDetail from './pages/MyProfile'
import UserProfile from './pages/UserProfile'
import Layout from './components/Layout'
import MyProfile from './pages/MyProfile'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import Register from './pages/Register'
import RequireAuth from './components/auth/RequireAuth'
import Explore from './pages/Explore'
import Notifications from './pages/Notifications'
import Messages from './pages/Messages'
import Bookmarks from './pages/Bookmarks'
import Communities from './pages/Communities'
import Following from './pages/Following'
import VerifiedFollowers from './pages/VerifiedFollowers'
import Followers from './pages/Followers'
import NotFound from './pages/NotFound'


function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Timeline />} />
            <Route path="murmur/:id" element={<MurmurDetail />} />
            <Route path=":username" element={<MyProfile />}>
              <Route path="followers" element={<Followers />} />
              <Route path="verified_followers" element={<VerifiedFollowers />} />
              <Route path="following" element={<Following />} />
            </Route>
            <Route path="user/:id" element={<UserProfile />} />
            <Route path="explore" element={<Explore />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="messages" element={<Messages />} />
            <Route path="bookmarks" element={<Bookmarks />} />
            <Route path="communities" element={<Communities />} />
            {/* <Route path="followers" element={<Followers />} />
            <Route path="verified_followers" element={<VerifiedFollowers />} />
            <Route path="following" element={<Following />} /> */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App