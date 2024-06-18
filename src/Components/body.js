import React, { useEffect, useState } from 'react';
import RestaurantCard from './resturantCard';
import ShimmerCard from './Shimmer';
import { API_URL } from '../utils/constants';
import useOnlineStatus from '../utils/useOnelineStatus';
import { withVegLabel } from './resturantCard';

const Body = () => {


  const [restaurants, setRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedSort, setSelectedSort] = useState('popularity');
  const Veg = withVegLabel(RestaurantCard);

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
        setLoading(false); // Data is loaded
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Stop loading on error
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

  const handleSortChange = (event) => {
    const sortOption = event.target.value;
    setSelectedSort(sortOption);
    if (sortOption === 'popularity') {
      setRestaurants(allRestaurants);
    } else if (sortOption === 'highRate') {
      const highRatedRestaurants = allRestaurants.filter(
        (restaurant) => restaurant.info.avgRating > 4
      );
      setRestaurants(highRatedRestaurants);
    } else if (sortOption === 'descRating') {
      const sortedRestaurants = [...restaurants].sort(
        (a, b) => b.info.avgRating - a.info.avgRating
      );
      setRestaurants(sortedRestaurants);
    } else if (sortOption === 'ascRating') {
      const sortedRestaurants = [...restaurants].sort(
        (a, b) => a.info.avgRating - b.info.avgRating
      );
      setRestaurants(sortedRestaurants);
    }
  };

  const onlineStatus = useOnlineStatus();
  if (!onlineStatus) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-100 text-red-700">
        <div className="text-center p-5 border border-red-300 bg-red-100 rounded-lg shadow-md">
          <h1 className="text-4xl mb-2">You are Offline</h1>
          <p className="text-lg mb-0">Please check your internet connection.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      data-testid="res-card"
      className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen"
    >
      <div className="flex justify-center items-center my-5 space-x-4">
        <input
          type="text"
          placeholder="Search Restaurants..."
          value={searchQuery}
          onChange={handleSearch}
          data-testid="search-input"
          className="p-2 text-lg border border-gray-300 rounded-lg w-full max-w-md shadow-md transition duration-300 ease-in-out focus:border-gray-400 focus:shadow-outline"
        />
        <select
          data-testid="sort-select"
          value={selectedSort}
          onChange={handleSortChange}
          className="p-2 text-lg border border-gray-300 rounded-lg bg-white text-gray-800 cursor-pointer transition duration-300 ease-in-out hover:bg-gray-200 hover:border-gray-400 active:bg-gray-300 active:border-gray-500 focus:outline-none focus:shadow-outline"
        >
          <option value="popularity">Sort By Popularity</option>
          <option value="highRate">High Rated (Rating Higher Than 4.0)</option>
          <option value="descRating">Sort By Rating (High To Low)</option>
          <option value="ascRating">Sort By Rating (Low to High)</option>
        </select>
      </div>
      {loading ? (
        <div className="flex flex-wrap justify-center p-5">
          {Array.from({ length: 8 }).map((_, index) => (
            <ShimmerCard key={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {restaurants.map((restaurant) => {
            console.log('restaurant', restaurant.info);
            if (restaurant.info.hasOwnProperty('veg')) {
              return (
                <Veg key={restaurant.info.id} restaurant={restaurant.info} />
              );
            } else {
              return (
                <RestaurantCard
                  key={restaurant.info.id}
                  restaurant={restaurant.info}
                />
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default Body;