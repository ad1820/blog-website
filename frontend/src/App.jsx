import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import FullBlogPage from './pages/FullBlogPage'
import EditBlog from './pages/EditBlog'
import UserProfile from './pages/UserProfile'
import NotFound from './pages/NotFound'
import CreateBlog from './pages/CreateBlog'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Navbar'

const App = () => {
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/blog/:id" element={<FullBlogPage />} />
          <Route path="/edit-blog/:id" element={<EditBlog />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
