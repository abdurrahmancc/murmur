import { useState, useEffect } from 'react'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import Timeline from './pages/Timeline'
import MurmurDetail from './pages/MyProfile'
import UserProfile from './pages/UserProfile'
import Layout from './components/Layout'
import MyProfile from './pages/MyProfile'
import { ToastContainer } from 'react-toastify'

function App() {
  // const [data, setData] = useState<any>(null)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.post('/api/postTest')
  //       console.log(res.data)
  //       setData(res.data)
  //     } catch (error) {
  //       console.error('Error fetching data:', error)
  //     }
  //   }

  //   fetchData()
  // }, [])

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Timeline />} />
          <Route path="murmur/:id" element={<MurmurDetail />} />
          <Route path="me" element={<MyProfile />} />
          <Route path="user/:id" element={<UserProfile />} />
        </Route>
      </Routes>
    </>
  )
}

export default App