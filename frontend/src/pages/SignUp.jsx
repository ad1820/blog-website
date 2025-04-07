import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate()


  const [formData, setFormData] = useState({
    userName: '',
    fullName: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/users/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // allows cookie to be set
        body: JSON.stringify(formData)
      })

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed")

      alert("Signup successful!")
      navigate("/"); // redirect to Home
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="userName" placeholder="Username" required onChange={handleChange} />
        <input type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp
