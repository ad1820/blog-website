import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/blog';
import '../style/Home.css';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await API.get('/blogs');

        if (response.data && response.data.data && Array.isArray(response.data.data)) {
          setBlogs(response.data.data);
        } else {
          console.error('Unexpected API response format:', response.data);
          setError('Unexpected data format from server');
          setBlogs([]);
        }
      } catch (error) {
        console.error("Error fetching blogs", error);
        setError('Failed to fetch blogs');
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const renderAuthor = (author) => {
    if (!author) return "Unknown";
    if (typeof author === 'string') return author;
    if (typeof author === 'object') {
      return author.userName || author.name || author._id || "Anonymous";
    }
    return String(author);
  };

  if (loading) return <div className="loading-container"><div className="loading-spinner"></div></div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Blog Feed</h1>
        <p className="header-subtitle">Discover interesting posts from our community</p>
      </header>

      {blogs.length === 0 ? (
        <div className="no-blogs-message">No blogs available</div>
      ) : (
        <div className="blogs-grid">
          {blogs.map((blog) => (
            <div className="blog-card" key={blog._id}>
              <div className="blog-card-content">
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-body">
                  {typeof blog.body === 'string' ? blog.body.slice(0, 50) + '...' : 'No content available'}
                </p>
                <div className="blog-meta">
                  <p className="blog-author">
                    <i className="author-icon">👤</i> {renderAuthor(blog.author)}
                  </p>
                  <div className="blog-stats">
                    <span className="blog-likes"><i className="like-icon">👍</i> {blog.likesCount ?? blog.likes?.length ?? 0}</span>
                    <span className="blog-dislikes"><i className="dislike-icon">👎</i> {blog.dislikesCount ?? blog.dislikes?.length ?? 0}</span>
                  </div>
                </div>
                <Link to={`/blog/${blog._id}`} className="read-more-btn">Read More</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
