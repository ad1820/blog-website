import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext' 
import { useNavigate } from 'react-router-dom'
import API from '../api/blog'  

const UserProfilePage = () => {
  const { authData, loading } = useContext(AuthContext)
  const [editing, setEditing] = useState(null)
  const [updatedBlog, setUpdatedBlog] = useState({ title: '', body: '' })
  const navigate = useNavigate()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!authData) {
    return <div>You are not authenticated</div>
  }

  const handleEditClick = (blog) => {
    setEditing(blog._id);
    setUpdatedBlog({ title: blog.title, body: blog.body })
  }

  const handleSaveEdit = async () => {
    try {
      await API.put(`/blogs/${editing}`, updatedBlog)
      setEditing(null)
      alert('Blog updated successfully')
    } catch (error) {
      console.error('Error updating blog:', error)
      alert('Something went wrong, please try again later.')
    }
  }

  const handleCancelEdit = () => {
    setEditing(null)
  }

  const handleDeleteBlog = async (blogId) => {
    try {
      await API.delete(`/blogs/${blogId}`)
      alert('Blog deleted successfully')
    } catch (error) {
      console.error('Error deleting blog:', error)
      alert('Something went wrong, please try again later.')
    }
  }

  return (
    <div>
      <h1>Welcome, {authData.name}</h1>
      <h2>Your Blogs</h2>
      <div>
        {authData.blogs && authData.blogs.length > 0 ? (
          authData.blogs.map((blog) => (
            <div key={blog._id} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
              {editing === blog._id ? (
                <>
                  <input
                    type="text"
                    value={updatedBlog.title}
                    onChange={(e) => setUpdatedBlog({ ...updatedBlog, title: e.target.value })}
                    placeholder="Title"
                  />
                  <textarea
                    value={updatedBlog.body}
                    onChange={(e) => setUpdatedBlog({ ...updatedBlog, body: e.target.value })}
                    placeholder="Body"
                  />
                  <button onClick={handleSaveEdit}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <h3>{blog.title}</h3>
                  <p>{blog.body}</p>
                  <button onClick={() => handleEditClick(blog)}>Edit</button>
                  <button onClick={() => handleDeleteBlog(blog._id)}>Delete</button>
                </>
              )}
            </div>
          ))
        ) : (
          <p>You haven't written any blogs yet.</p>
        )}
      </div>
    </div>
  )
}

export default UserProfilePage
