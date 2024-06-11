// // import React, { Component, useEffect } from 'react';
// // import { LOGO_URL } from '../utils/constants';
// // import { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // const Header = () => {
// //   const [login, setLogin] = useState(false);
// //   const hanldeLogin = () => {
// //     setLogin(!login);
// //   };
// //   return (
// //     <div className="header">
// //       <div className="logo-container">
// //         <Link to="/">
// //           <img className="logo" src={LOGO_URL} alt="Food Delivery Logo" />
// //         </Link>
// //       </div>
// //       <div className="nav-items">
// //         <ul>
// //           <li href="/">
// //             <Link to="/">Home</Link>
// //           </li>
// //           <li>
// //             <Link to="/about">About Us</Link>
// //           </li>
// //           <li>
// //             <Link to="/contact">Contact Us</Link>
// //           </li>
// //           <li>
// //             <Link to="/cart">Cart</Link>
// //           </li>
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // };
// // export default Header;
// import React, { useState } from 'react';
// import { LOGO_URL } from '../utils/constants';
// import { Link } from 'react-router-dom';
// import useOnlineStatus from '../utils/useOnelineStatus';

// const Header = () => {
//   const [login, setLogin] = useState(false);
//   const onlineStatus = useOnlineStatus(); // Use the custom hook

//   const handleLogin = () => {
//     setLogin(!login);
//   };

//   return (
//     <div className="header">
//       <div className="logo-container">
//         <Link to="/">
//           <img className="logo" src={LOGO_URL} alt="Food Delivery Logo" />
//         </Link>
//       </div>

//       <div className="nav-items">
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/about">About Us</Link>
//           </li>
//           <li>
//             <Link to="/contact">Contact Us</Link>
//           </li>
//           <li>
//             <Link to="/cart">Cart</Link>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Header;
import React, { useState } from 'react';
import { LOGO_URL } from '../utils/constants';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnelineStatus';

const Header = () => {
  const [login, setLogin] = useState(false);
  const onlineStatus = useOnlineStatus(); // Use the custom hook

  const handleLogin = () => {
    setLogin(!login);
  };

  return (
    <header className="bg-gradient-to-r from-white to-gray-100 shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <img
              className="w-36 h-36"
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
                Cart
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
