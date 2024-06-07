import React from 'react';
import { CDN_URL } from '../utils/constants';
const RestaurantDetails = ({ restaurant }) => {
  if (!restaurant) {
    return null;
  }

  
const imageUrl = `${CDN_URL}${restaurant.cloudinaryImageId}`;
  return (
    <div className="restaurant-details">
      <img src={imageUrl} alt={`${restaurant.name} Logo`} />
      <h2>{restaurant.name}</h2>
      <p>Locality: {restaurant.locality}</p>
      <p>Area: {restaurant.areaName}</p>
      <p>Cost for Two: {restaurant.costForTwo}</p>
      <p>Cuisines: {restaurant.cuisines.join(', ')}</p>
      <p>Average Rating: {restaurant.avgRating}</p>
      <p>Total Ratings: {restaurant.totalRatingsString}</p>
      <p>Delivery Time: {restaurant.sla.deliveryTime} mins</p>
      <p>Distance: {restaurant.sla.lastMileTravelString}</p>
      <p>Serviceability: {restaurant.sla.serviceability}</p>
      <p>Next Close Time: {restaurant.availability.nextCloseTime}</p>
      <p>Offer: {restaurant.aggregatedDiscountInfoV3?.header || 'No offers'}</p>
      <p>Availability: {restaurant.isOpen ? 'Open' : 'Closed'}</p>
    </div>
  );
};

export default RestaurantDetails;
