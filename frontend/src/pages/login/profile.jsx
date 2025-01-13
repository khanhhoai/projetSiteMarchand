import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./profile.css";

export const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Fetch user data when component mounts
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setAddress(user.address || ""); // If address exists, set it
      setPassword(user.password);
      setConfirmPassword(user.password);
    } else {
      navigate("/login"); // Redirect to login if no user data found
    }
  }, [navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!password || password !== confirmPassword) {
      setError("Passwords do not match or are empty");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await axios.put("http://localhost:5000/users/update", {
        id: user.id,
        username,
        email,
        address,
        password,
      });

      // Save updated user info in localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setSuccess("Profile updated successfully!");

      // Redirect back to profile page
      navigate("/profile"); // Redirect to profile after saving changes
    } catch (err) {
      setError("Error updating profile");
      console.error("Profile update error:", err);
    }
  };

  return (
    <div className="profile">
      <h2>Update Profile</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="input-group-profile">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group-profile">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group-profile">
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="input-group-profile">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group-profile">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button class="addToCartBttn" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
};
