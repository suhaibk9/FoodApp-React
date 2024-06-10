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
    <div className="flex justify-between items-center border border-black p-4 shadow-lg m-2">
      <div className="flex items-center">
        <Link to="/">
          <img className="w-36 h-36" src={LOGO_URL} alt="Food Delivery Logo" />
        </Link>
      </div>

      <div className="flex">
        <ul className="flex list-none space-x-4">
          <li>
            <Link to="/" className="text-black no-underline text-xl">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-black no-underline text-xl">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-black no-underline text-xl">
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/cart" className="text-black no-underline text-xl mr-1">
              Cart
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
