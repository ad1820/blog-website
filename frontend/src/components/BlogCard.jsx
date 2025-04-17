import React, { useState, useEffect } from 'react'
import '../style/BlogCard.css'
import API from '../api/blog'

const BlogCard = ({ blog, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [updatedBlog, setUpdatedBlog] = useState({ title: blog.title, body: blog.body })
  const [likes, setLikes] = useState(blog.likes || 0)
  const [dislikes, setDislikes] = useState(blog.dislikes || 0)
  const [loadingAction, setLoadingAction] = useState(null)


  const handleEditClick = () => {
    setIsEditing(true)
    setUpdatedBlog({ title: blog.title, body: blog.body })
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  const handleSaveEdit = async () => {
    try {
      if (!updatedBlog.title.trim() || !updatedBlog.body.trim()) {
        alert('Title and body cannot be empty!')
        return
      }

      const res = await API.put(`/blogs/${blog._id}`, updatedBlog)
      
      if (res.data) {
        onUpdate(blog._id, updatedBlog)
        setIsEditing(false)
      }
    } catch (err) {
      console.error('Error updating blog:', err)
      alert(`Failed to update blog: ${err.message || 'Please try again'}`)
    }
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      onDelete(blog._id)
    }
  }

  const handleLike = async () => {
    try {
      setLoadingAction('like');
      const res = await API.post(`/blogs/like/${blog._id}`)
      if (res.data) {
        setLikes(res.data.likesCount)
        setDislikes(res.data.dislikesCount)
      }
    } catch (err) {
      console.error('Error liking blog:', err)
    } finally {
      setLoadingAction(null)
    }
  }
  
  const handleDislike = async () => {
    try {
      setLoadingAction('dislike')
      const res = await API.post(`/blogs/dislike/${blog._id}`)
      if (res.data) {
        setLikes(res.data.likesCount)
        setDislikes(res.data.dislikesCount)
      }
    } catch (err) {
      console.error('Error disliking blog:', err)
    } finally {
      setLoadingAction(null)
    }
  }
  

  return (
    <div className="blog-card">
      {isEditing ? (
        <div className="edit-blog-form">
          <input
            type="text"
            value={updatedBlog.title}
            onChange={(e) => setUpdatedBlog({ ...updatedBlog, title: e.target.value })}
            placeholder="Title"
            className="edit-title-input"
          />
          <textarea
            value={updatedBlog.body}
            onChange={(e) => setUpdatedBlog({ ...updatedBlog, body: e.target.value })}
            placeholder="Body"
            rows={5}
            className="edit-body-textarea"
          />
          <div className="edit-actions">
            <button onClick={handleSaveEdit} className="save-btn">
              Save
            </button>
            <button onClick={handleCancelEdit} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="blog-title">{blog.title}</h3>
          <p className="blog-date">
            {new Date(blog.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <p className="blog-body">{blog.body}</p>
          
          <div className="blog-feedback">
            <div className="blog-reactions">
              <button 
                onClick={handleLike} 
                className="reaction-btn like-btn"
                disabled={loadingAction === 'like'}
              >
                <span className="reaction-icon">👍</span>
                <span className="reaction-count">{likes}</span>
              </button>
              <button 
                onClick={handleDislike} 
                className="reaction-btn dislike-btn"
                disabled={loadingAction === 'dislike'}
              >
                <span className="reaction-icon">👎</span>
                <span className="reaction-count">{dislikes}</span>
              </button>
            </div>
            
            <div className="blog-actions">
              <button onClick={handleEditClick} className="edit-btn">
                Edit
              </button>
              <button onClick={handleDelete} className="delete-btn">
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default BlogCard
