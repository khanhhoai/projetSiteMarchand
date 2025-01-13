import React from "react";
import "./footer.css";

export const Footer = () => {
  return (
    <footer>
      <div>
        <p>
          © {new Date().getFullYear()} My E-commerce Store. All rights reserved.
        </p>
        <ul>
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li>
            <a href="/privacy-policy">Privacy Policy</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
