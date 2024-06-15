import React, { useState } from 'react';
import { LOGO_URL } from '../utils/constants';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnelineStatus';
import { useContext } from 'react';
import UserContext from '../utils/UserContext';
import { useSelector } from 'react-redux';

const Header = () => {
  const [login, setLogin] = useState(false);
  const onlineStatus = useOnlineStatus(); // Use the custom hook

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  console.log('totalQuantity', totalQuantity);
  const handleLogin = () => {
    setLogin(!login);
  };

  return (
    <header className="bg-gradient-to-r from-white to-gray-100 shadow-lg p-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <img
              className="w-20 h-20"
              src={LOGO_URL}
              alt="Food Delivery Logo"
            />
          </Link>
        </div>

        <nav>
          <ul className="flex space-x-8 text-lg font-semibold">
            <li>
              <Link
                to="/"
                className="text-gray-800 hover:text-purple-500 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-800 hover:text-purple-500 transition duration-300"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-800 hover:text-purple-500 transition duration-300"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="text-gray-800 hover:text-purple-500 transition duration-300"
              >
                Cart {totalQuantity > 0 && `(${totalQuantity})`}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
