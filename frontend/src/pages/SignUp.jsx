import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/blog';
import { AuthContext } from '../contexts/AuthContext';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !userName.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await API.post('/users/register', {
        fullName: fullName.trim(),
        userName: userName.trim(),
        email: email.trim(),
        password: password.trim()
      });

      if (response.data && response.data.data) {
        signup(response.data.data); // Set the user in context
        navigate('/'); // Redirect to homepage or dashboard
      }
    } catch (error) {
      console.error(error?.response?.data || error.message);
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
