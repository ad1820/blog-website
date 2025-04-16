import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import API from '../api/blog';
import '../style/EditBlog.css';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authData } = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await API.get(`/blogs/${id}`);
        const blog = response.data.data;

        // Only allow owner to edit
        if (authData?._id !== blog.author?._id) {
          setError('You are not authorized to edit this blog');
          return;
        }

        setTitle(blog.title);
        setBody(blog.body);
      } catch (err) {
        setError('Failed to fetch blog');
      }
    };

    fetchBlog();
  }, [id, authData]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/blogs/${id}`, { title, body });
      navigate(`/blog/${id}`);
    } catch (err) {
      setError('Failed to update blog');
    }
  };

  if (error) return <div className="edit-error">{error}</div>;

  return (
    <div className="edit-blog-container">
      <h2>Edit Blog</h2>
      <form onSubmit={handleUpdate} className="edit-blog-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Title"
          required
        />
        <textarea
          rows="10"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Blog Body"
          required
        />
        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
};

export default EditBlog;
