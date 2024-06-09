import React from 'react';
import { CDN_URL } from '../utils/constants';
import { Link, useParams } from 'react-router-dom';
const RestaurantCard = ({ key,restaurant }) => {

  const imageUrl = `${CDN_URL}${restaurant.cloudinaryImageId}`;
  return (
    <Link to={`/resturant/${restaurant.id}`} style={{ textDecoration: 'none' ,color:'inherit'}}>
      <div className="res-card">
        <img className="res-logo" src={imageUrl} alt="Restaurant Logo" />
        <div className="res-info">
          <h3 className="res-name">{restaurant.name}</h3>
          <h4 className="res-rating">{restaurant.avgRating} stars</h4>
          <h4 className="res-cuisine">{restaurant.cuisines.join(', ')}</h4>
          <h4 className="res-cost">{restaurant.costForTwo}</h4>
        </div>
      </div>
    </Link>
  );
};

 export default RestaurantCard;