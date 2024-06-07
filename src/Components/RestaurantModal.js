import React from 'react';
import Modal from 'react-modal';
import { CDN_URL } from '../utils/constants';

const RestaurantModal = ({ restaurant, isOpen, onRequestClose }) => {
  if (!restaurant) {
    return null;
  }

const imageUrl=`${CDN_URL}${restaurant.cloudinaryImageId}`;
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Restaurant Details"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <button className="close-button" onClick={onRequestClose}>
          ×
        </button>
        <div className="details">
          <h2>{restaurant.name}</h2>
          <p>Locality: {restaurant.locality}</p>
          <p>Area: {restaurant.areaName}</p>
          <p>Cost for Two: {restaurant.costForTwo}</p>
          <p>Cuisines: {restaurant.cuisines.join(', ')}</p>
          <p>Average Rating: {restaurant.avgRating}</p>
          <p>Total Ratings: {restaurant.totalRatingsString}</p>
          <p>Delivery Time: {restaurant.sla.deliveryTime} mins</p>
          <p>Distance: {restaurant.sla.lastMileTravelString}</p>
          <p>Availability: {restaurant.isOpen ? 'Open' : 'Closed'}</p>
        </div>
        <div className="image-container">
          <img src={imageUrl} alt={`${restaurant.name} Logo`} />
        </div>
      </div>
    </Modal>
  );
};

export default RestaurantModal;
