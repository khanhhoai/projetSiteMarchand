import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import "./navbar.css";

export const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = user && user.role === "admin";
  const isNormalUser = user && user.role === "user";

  // Get user from localStorage and set it to state
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user")) || null;
    setUser(loggedInUser);

    if (loggedInUser && location.pathname === "/login") {
      navigate("/");
    }
  }, [location, navigate]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    // Add event listener
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setShowDropdown(false);
    setUser(null);
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/" className="shop-name">
          Wiki
        </Link>
      </div>
      <div className="links">
        {user ? (
          <div className="user-menu">
            {isAdmin && <Link to="/manage-users">Manage Users</Link>}
            {isAdmin && <Link to="/manage-products">Manage Products</Link>}
            <span
              className="username"
              ref={dropdownRef}
              onClick={toggleDropdown}
            >
              {user.username}
            </span>

            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/profile">Profile</Link>
                {isNormalUser && <Link to="/my-orders">My Orders</Link>}
                <button onClick={handleLogout}>Log out</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
        {user?.role !== "admin" && (
          <Link to="/cart">
            <ShoppingCart size={32} />
          </Link>
        )}
      </div>
    </div>
  );
};
