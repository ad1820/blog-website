import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import API from '../api/blog'
import BlogCard from '../components/BlogCard'
import '../style/UserProfile.css'

const UserProfile = () => {
  const { authData, loading: authLoading } = useContext(AuthContext)
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState('')

  const fetchUserBlogs = async () => {
    if (!authData?._id) {
      console.log('Cannot fetch blogs: No user ID available')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await API.get(`/users/${authData._id}/blogs`)
      
      if (res.data && Array.isArray(res.data)) {
        setBlogs(res.data)
      } else if (res.data && Array.isArray(res.data.data)) {
        setBlogs(res.data.data)
      } else {
        setError('Received unexpected data format from server')
      }
    } catch (err) {
      setError(`Failed to load your blogs: ${err.message || 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!authLoading && authData?._id) {
      fetchUserBlogs()
    }
  }, [authLoading, authData])

  const handleBlogUpdate = (blogId, updatedBlogData) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) => (blog._id === blogId ? { ...blog, ...updatedBlogData } : blog))
    )
    showSuccess('Blog updated successfully!')
  }

  const handleBlogDelete = async (blogId) => {
    try {
      await API.delete(`/blogs/${blogId}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId))
      showSuccess('Blog deleted successfully!')
    } catch (err) {
      alert(`Failed to delete blog: ${err.message || 'Please try again'}`)
    }
  }

  const showSuccess = (message) => {
    setShowSuccessMessage(message)
    setTimeout(() => {
      setShowSuccessMessage('')
    }, 2500)
  }

  if (authLoading) {
    return (
      <div className="profile-container">
        <div className="loading-container">Authenticating...</div>
      </div>
    )
  }

  if (!authData) {
    return (
      <div className="profile-container">
        <div className="auth-error">You are not authenticated.</div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-container">Loading your blogs...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="error-message">{error}</div>
      </div>
    )
  }

  return (
    <div className="profile-container">
      {showSuccessMessage && <div className="success-message">{showSuccessMessage}</div>}

      <div className="profile-header">
        <h1>{authData.fullName || authData.name || authData.userName}</h1>
        <p className="user-email">{authData.email}</p>
      </div>

      <div className="blogs-section">
        <h2>Your Blogs ({blogs.length})</h2>
        {blogs.length === 0 ? (
          <div className="empty-blogs">
            <p>You haven't written any blogs yet.</p>
            <a href="/create-blog" className="create-blog-btn">Write Your First Blog</a>
          </div>
        ) : (
          <div className="blogs-list">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                onUpdate={handleBlogUpdate}
                onDelete={handleBlogDelete}
                isOwner={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile