import React from 'react';
import { CDN_URL } from '../utils/constants';

const RestaurantCard = ({ restaurant, onClick }) => {
  const isFullPath = restaurant.cloudinaryImageId.includes('/');
 const imageUrl=`${CDN_URL}${restaurant.cloudinaryImageId}`;
  return (
    <div className="res-card" onClick={() => onClick(restaurant)}>
      <img className="res-logo" src={imageUrl} alt="Restaurant Logo" />
      <div className="res-info">
        <h3 className="res-name">{restaurant.name}</h3>
        <h4 className="res-rating">{restaurant.avgRating} stars</h4>
        <h4 className="res-cuisine">{restaurant.cuisines.join(', ')}</h4>
        <h4 className="res-cost">{restaurant.costForTwo}</h4>
      </div>
    </div>
  );
};

export default RestaurantCard;
