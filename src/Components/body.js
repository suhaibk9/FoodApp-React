import React, { useEffect, useState } from 'react';
import RestaurantCard from './resturantCard';
import RestaurantModal from './RestaurantModal';
import { API_URL } from '../utils/constants';


const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const restaurantsData =
          data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants;
        setRestaurants(restaurantsData);
        setAllRestaurants(restaurantsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredRestaurants = allRestaurants.filter((restaurant) =>
      restaurant.info.name.toLowerCase().includes(query)
    );
    setRestaurants(filteredRestaurants);
  };

  const handleHighRate = () => {
    const highRatedRestaurants = allRestaurants.filter(
      (restaurant) => restaurant.info.avgRating > 4
    );
    setRestaurants(highRatedRestaurants);
  };

  const handleAll = () => {
    setRestaurants(allRestaurants);
  };

  const handleDescRating = () => {
    const sortedRestaurants = [...restaurants].sort(
      (a, b) => b.info.avgRating - a.info.avgRating
    );
    setRestaurants(sortedRestaurants);
  };

  const handleAscRating = () => {
    const sortedRestaurants = [...restaurants].sort(
      (a, b) => a.info.avgRating - b.info.avgRating
    );
    setRestaurants(sortedRestaurants);
  };

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="body">
      <div className="search">
        <input
          type="text"
          placeholder="Search Restaurants..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="highRate">
        <button onClick={handleAll}>All Restaurants</button>
        <button onClick={handleHighRate}>
          High Rated (Rating Higher Than 4.0)
        </button>
        <button onClick={handleDescRating}>Sort By Rating (High To Low)</button>
        <button onClick={handleAscRating}>Sort By Rating (Low to High)</button>
      </div>
      <div className="res-container">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.info.id}
            restaurant={restaurant.info}
            onClick={handleRestaurantClick}
          />
        ))}
      </div>
      <RestaurantModal
        restaurant={selectedRestaurant}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      />
    </div>
  );
};

export default Body;