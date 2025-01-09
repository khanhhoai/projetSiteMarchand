import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import "./navbar.css";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
      <Link to="/" className="shop-name">
          Miki
        </Link>
      </div>
      <div className="links">
        <Link to="/"> Products </Link>
        <Link to="/login"> Login </Link>
        <Link to="/cart">
          <ShoppingCart size={32} />
        </Link>
      </div>
    </div>
  );
};
