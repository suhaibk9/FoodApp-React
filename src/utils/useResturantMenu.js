import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { MENU_URL, CDN_URL } from './constants';
const useResturantMenu = (id) => {
  const [restaurantName, setRestaurantName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restaurantMenu, setRestaurantMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [resturantDetails, setResturantDetails] = useState({});
  const [fullMenuData, setFullMenuData] = useState([]);
  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await fetch(`${MENU_URL}=${id}&submitAction=ENTER`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const ar = data.data.cards[5].groupedCard.cardGroupMap.REGULAR.cards;
        let data_created = [];
        let x = 0;
        for (let i = 1; i < ar.length - 1; i++) {
          let tle;
          let fdata;
          if (ar[i].card.card.hasOwnProperty('itemCards')) {
            tle = ar[i].card.card.title;
            fdata = ar[i].card.card.itemCards;
            data_created.push({ title: tle, data: fdata });
            continue;
          } else if (ar[i].card.card.hasOwnProperty('Top Picks')) {
            if (ar[i].card.card['Top Picks'].hasOwnProperty('carousel')) {
              tle = ar[i].card.card['Top Picks'].title;
              fdata = ar[i].card.card['Top Picks'].carousel;
              data_created.push({ title: tle, data: fdata });
              continue;
            }
          } else if (ar[i].card.card.hasOwnProperty('categories')) {
            tle = ar[i].card.card.title;
            fdata = ar[i].card.card.categories;
            data_created.push({ title: tle, data: fdata });
            continue;
          }
          x++;
        }
        console.log('data_created', data_created);
        console.log('Resutant Details', ar[ar.length - 1].card.card);
        setFullMenuData(data_created);
        let detail = ar[ar.length - 1].card.card;
        setResturantDetails({
          name: detail.name,
          address: detail.completeAddress,
          area: detail.area,
          });
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
    setFilteredMenu,
    fullMenuData,
    resturantDetails,
  };
};
export default useResturantMenu;
//https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9352403&lng=77.624532&restaurantId=108097&submitAction=ENTER
