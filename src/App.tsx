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
            <Route path="me" element={<MyProfile />} />
            <Route path="user/:id" element={<UserProfile />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App