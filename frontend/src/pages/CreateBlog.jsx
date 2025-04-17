import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import API from '../api/blog'
import '../style/CreateBlog.css'

const CreateBlog = () => {
  const { authData } = useContext(AuthContext)
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!authData) {
      navigate('/login')
    }
  }, [authData, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!title.trim() || !body.trim()) {
      setError('Title and Body are required.')
      return
    }

    try {
      await API.post('/blogs', { title, body })
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create blog.')
    }
  }

  return (
    <div className="create-blog-container">
      <h2>Create New Blog</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="create-blog-form">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
          required
        />
        <textarea
          placeholder="Write your blog content here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="form-textarea"
          required
        ></textarea>
        <button type="submit" className="submit-btn">Publish</button>
      </form>
    </div>
  )
}

export default CreateBlog
