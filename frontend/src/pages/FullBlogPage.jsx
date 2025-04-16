import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/blog';
import { AuthContext } from '../contexts/AuthContext' // Import your AuthContext
import '../style/FullBlogPage.css'; // We'll create this CSS file next

const FullBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authData } = useContext(AuthContext); // Get authentication data
  
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
  const [userAction, setUserAction] = useState(null); // 'like', 'dislike', or null

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/blogs/${id}`);
        console.log("Blog data:", response.data);
        
        if (response.data && response.data.data) {
          const blogData = response.data.data;
          setBlog(blogData);
          
          // Set likes and dislikes count from the response
          setLikesCount(blogData.likesCount || 0);
          setDislikesCount(blogData.dislikesCount || 0);
          
          // Check if user has already liked or disliked this blog
          if (authData) {
            // You'll need to add an API endpoint to check the user's action on this blog
            try {
              const actionResponse = await API.get(`/blogs/action/${id}`);
              if (actionResponse.data && actionResponse.data.data) {
                setUserAction(actionResponse.data.data.action); // 'like', 'dislike', or null
              }
            } catch (actionError) {
              console.error("Couldn't get user's action:", actionError);
              // If there's an error, assume no action
              setUserAction(null);
            }
          }
        } else {
          console.error('Unexpected API response format:', response.data);
          setError('Could not load blog details');
        }
      } catch (error) {
        console.error("Error fetching the blog", error);
        setError('Failed to load blog');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlog();
  }, [id, authData]);

  const renderAuthor = (author) => {
    if (!author) return "Unknown";
    if (typeof author === 'string') return author;
    if (typeof author === 'object') {
      return author.userName || author.name || author._id || "Anonymous";
    }
    return String(author);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleLike = async () => {
    if (!authData) {
      alert("Please log in to like posts");
      return;
    }
    
    try {
      // If already liked, unlike it
      if (userAction === 'like') {
        const response = await API.post(`/blogs/unlike/${id}`);
        if (response.data && response.data.success) {
          setLikesCount(prev => prev - 1);
          setUserAction(null);
        }
      } else {
        // If disliked, remove dislike first
        if (userAction === 'dislike') {
          setDislikesCount(prev => prev - 1);
        }
        
        // Add like
        const response = await API.post(`/blogs/like/${id}`);
        if (response.data && response.data.success) {
          setLikesCount(prev => prev + 1);
          setUserAction('like');
        }
      }
    } catch (error) {
      console.error("Error liking the blog", error);
      alert("Failed to like this post. Please try again.");
    }
  };

  const handleDislike = async () => {
    if (!authData) {
      alert("Please log in to dislike posts");
      return;
    }
    
    try {
      // If already disliked, remove dislike
      if (userAction === 'dislike') {
        const response = await API.post(`/blogs/undislike/${id}`);
        if (response.data && response.data.success) {
          setDislikesCount(prev => prev - 1);
          setUserAction(null);
        }
      } else {
        // If liked, remove like first
        if (userAction === 'like') {
          setLikesCount(prev => prev - 1);
        }
        
        // Add dislike
        const response = await API.post(`/blogs/dislike/${id}`);
        if (response.data && response.data.success) {
          setDislikesCount(prev => prev + 1);
          setUserAction('dislike');
        }
      }
    } catch (error) {
      console.error("Error disliking the blog", error);
      alert("Failed to dislike this post. Please try again.");
    }
  };

  if (loading) return <div className="loading-container"><div className="loading-spinner"></div></div>;
  if (error) return (
    <div className="error-container">
      <p className="error-message">Error: {error}</p>
      <button className="back-button" onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
  
  if (!blog) return (
    <div className="not-found-container">
      <p className="not-found-message">Blog not found</p>
      <button className="back-button" onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );

  return (
    <div className="blog-page-container">
      <div className="blog-content">
        <h1 className="blog-title">{blog.title}</h1>
        
        <div className="blog-meta">
          <div className="author-date">
            <p className="blog-author">By <span>{renderAuthor(blog.author)}</span></p>
            <p className="blog-date">{formatDate(blog.createdAt)}</p>
          </div>
          
          <div className="blog-actions">
            <button 
              className={`action-button like-button ${userAction === 'like' ? 'active' : ''}`}
              onClick={handleLike}
            >
              <i className="like-icon">👍</i>
              <span>{likesCount}</span>
            </button>
            
            <button 
              className={`action-button dislike-button ${userAction === 'dislike' ? 'active' : ''}`}
              onClick={handleDislike}
            >
              <i className="dislike-icon">👎</i>
              <span>{dislikesCount}</span>
            </button>
          </div>
        </div>
        
        <div className="blog-body">
          {typeof blog.body === 'string' ? blog.body : 'No content available'}
        </div>
        
        <button className="back-to-home" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default FullBlogPage;