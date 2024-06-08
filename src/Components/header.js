import React, { Component } from 'react';
import { LOGO_URL } from '../utils/constants';
import { useState } from 'react';
const Header = () => {
  const [login, setLogin] = useState(false);
  const hanldeLogin = () => {
    setLogin(!login);
  };
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} alt="Food Delivery Logo" />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact</li>
          <li>Cart</li>
          <li>
            <button onClick={hanldeLogin}>{login ? `Logout` : `Login`}</button>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
