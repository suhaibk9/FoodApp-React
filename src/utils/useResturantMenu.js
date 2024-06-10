import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { MENU_URL,CDN_URL } from './constants';
const useResturantMenu = (id) => {
  const [restaurantName, setRestaurantName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restaurantMenu, setRestaurantMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await fetch(`${MENU_URL}=${id}&submitAction=ENTER`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const restaurantName = data.data.cards[0].card.card.text;
        setRestaurantName(restaurantName);

        let restData = [];
        data.data.cards[5].groupedCard.cardGroupMap.REGULAR.cards.forEach(
          (card) => {
            if (card.card.card.hasOwnProperty('itemCards')) {
              restData = restData.concat(card.card.card.itemCards);
            }
          }
        );

        const menuItems = restData.map((item) => ({
          name: item.card.info.name,
          price: item.card.info.price ? item.card.info.price / 100 : NaN,
          description: item.card.info.description,
          category: item.card.info.category,
          imageUrl: `${CDN_URL}${item.card.info.imageId}`,
        }));

        setRestaurantMenu(menuItems);
        setFilteredMenu(menuItems);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);
  return {
    loading,
    error,
    restaurantName,
    restaurantMenu,
    setRestaurantMenu,
    filteredMenu,
    setFilteredMenu
  };
};
export default useResturantMenu;
