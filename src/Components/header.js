import React, { Component, useEffect } from 'react';
import { LOGO_URL } from '../utils/constants';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
  const [login, setLogin] = useState(false);
  const hanldeLogin = () => {
    setLogin(!login);
  };
  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <img className="logo" src={LOGO_URL} alt="Food Delivery Logo" />
        </Link>
      </div>
      <div className="nav-items">
        <ul>
          <li href="/">
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
