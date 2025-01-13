import React, { useState } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import "./login.css";

export const Login = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError(""); 
    setSuccess(""); 
    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/users/login", {
        email: email,
        password: password,
      });

      const user = response.data.user;
      localStorage.setItem('user', JSON.stringify(response.data.user));
      console.log("Login Response:", response.data);
      navigate("/", { state: { user } });
    } catch (err) {
      setError("Invalid email or password");
      console.error("Login Error:", err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
      
        {error && <p className="error-message">{error}</p>}
   
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="signup-link">
          <p>
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}