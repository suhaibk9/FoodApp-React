// import React from 'react';
// import { CDN_URL } from '../utils/constants';
// import { Link, useParams } from 'react-router-dom';
// const RestaurantCard = ({ key,restaurant }) => {

//   const imageUrl = `${CDN_URL}${restaurant.cloudinaryImageId}`;
//   return (
//     <Link to={`/resturant/${restaurant.id}`} style={{ textDecoration: 'none' ,color:'inherit'}}>
//       <div className="res-card">
//         <img className="res-logo" src={imageUrl} alt="Restaurant Logo" />
//         <div className="res-info">
//           <h3 className="res-name">{restaurant.name}</h3>
//           <h4 className="res-rating">{restaurant.avgRating} stars</h4>
//           <h4 className="res-cuisine">{restaurant.cuisines.join(', ')}</h4>
//           <h4 className="res-cost">{restaurant.costForTwo}</h4>
//         </div>
//       </div>
//     </Link>
//   );
// };

//  export default RestaurantCard;
import React from 'react';
import { CDN_URL } from '../utils/constants';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  const imageUrl = `${CDN_URL}${restaurant.cloudinaryImageId}`;

  return (
    <Link
      to={`/resturant/${restaurant.id}`}
      className="no-underline text-inherit"
    >
      <div className="w-64 h-96 border border-black flex flex-col items-center p-2 shadow-md m-5 bg-purple-100 transform transition duration-300 ease-in-out hover:border-gray-900 hover:shadow-lg hover:scale-105">
        <img
          className="w-full h-40 object-cover"
          src={imageUrl}
          alt="Restaurant Logo"
        />
        <div className="flex flex-col items-start w-full mt-2 h-full justify-between">
          <h3 className="m-1 text-left w-full text-lg font-bold">
            {restaurant.name}
          </h3>
          <h4 className="m-1 text-left w-full text-sm text-gray-700">
            {restaurant.avgRating} stars
          </h4>
          <h4 className="m-1 text-left w-full text-sm text-gray-700">
            {restaurant.cuisines.join(', ')}
          </h4>
          <h4 className="m-1 text-left w-full text-sm text-gray-700 mt-auto">
            {restaurant.costForTwo}
          </h4>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
