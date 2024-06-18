import React from 'react';
import { CDN_URL } from '../utils/constants';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  const imageUrl = `${CDN_URL}${restaurant.cloudinaryImageId}`;

  return (
    <Link
      data-testid="res-card"
      to={`/resturant/${restaurant.id}`}
      className="no-underline text-inherit"
    >
      <div className="w-64 h-96 border border-gray-200 flex flex-col items-center p-2 shadow-lg m-5 bg-gradient-to-r from-white to-gray-100 rounded-lg transform transition duration-300 ease-in-out hover:border-gray-500 hover:shadow-xl hover:scale-105">
        <img
          className="w-full h-40 object-cover rounded-t-lg"
          src={imageUrl}
          alt="Restaurant Logo"
        />
        <div className="flex flex-col items-start w-full mt-2 h-full justify-between">
          <h3 className="m-1 text-left w-full text-lg font-bold text-gray-800">
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

export const withVegLabel = (RestaurantCard) => {
  const Veg = ({ restaurant }) => {
    return (
      <div className="relative">
        {restaurant.hasOwnProperty('veg') && restaurant.veg && (
          <div className="absolute top-4 left-2 bg-green-500 text-white px-2 py-1 rounded-tl-lg rounded-br-lg z-20">
            Veg
          </div>
        )}
        <RestaurantCard restaurant={restaurant} />
      </div>
    );
  };
  return Veg;
};

export default RestaurantCard;
