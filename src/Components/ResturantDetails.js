import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Collapsible from 'react-collapsible';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { CDN_URL } from '../utils/constants';
import ShimmerCard from './Shimmer';
import useResturantMenu from '../utils/useResturantMenu';
import { useDispatch, useSelector } from 'react-redux';

import {
  addItem,
  removeItem,
  clearCart,
  setRestaurantName,
  increaseQuantity,
  decreaseQuantity,
} from '../utils/cartSlice';

const RestaurantDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartRestaurantName = useSelector((state) => state.cart.restaurantName);
  const [excludeOutOfStock, setExcludeOutOfStock] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  const {
    loading,
    error,
    restaurantName,
    filteredMenu,
    setFilteredMenu,
    fullMenuData,
    resturantDetails,
  } = useResturantMenu(id);

  useEffect(() => {
    applyFilters(excludeOutOfStock);
  }, [fullMenuData, excludeOutOfStock]);

  const handleExcludeOutOfStock = (event) => {
    const exclude = event.target.checked;
    setExcludeOutOfStock(exclude);
    applyFilters(exclude);
  };

  const applyFilters = (excludeOutOfStock) => {
    const updatedMenu = fullMenuData
      .map((section) => {
        if (Array.isArray(section.data) && section.data[0]?.itemCards) {
          const nestedData = section.data
            .map((nestedSection) => ({
              ...nestedSection,
              itemCards: nestedSection.itemCards?.filter((item) =>
                excludeOutOfStock ? !isNaN(item.card.info.price) : true
              ),
            }))
            .filter((nestedSection) => nestedSection.itemCards?.length > 0);

          return {
            ...section,
            data: nestedData,
          };
        } else {
          const filteredData = section.data?.filter((item) =>
            excludeOutOfStock ? !isNaN(item.card.info.price) : true
          );

          return {
            ...section,
            data: filteredData,
          };
        }
      })
      .filter((section) => section.data?.length > 0);

    setFilteredMenu(updatedMenu);
  };

  const handleExpandAll = () => {
    const newExpandedSections = {};
    filteredMenu.forEach((section, index) => {
      newExpandedSections[index] = true;
      if (Array.isArray(section.data) && section.data[0]?.itemCards) {
        section.data.forEach((nestedSection, nestedIndex) => {
          newExpandedSections[`${index}-${nestedIndex}`] = true;
        });
      }
    });
    setExpandedSections(newExpandedSections);
  };

  const handleCollapseAll = () => {
    setExpandedSections({});
  };

  const handleToggle = (index, nestedIndex = null) => {
    const key = nestedIndex === null ? index : `${index}-${nestedIndex}`;
    setExpandedSections((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleAddItem = (item) => {
    if (
      cartItems.length > 0 &&
      cartRestaurantName &&
      cartRestaurantName !== restaurantName
    ) {
      if (
        window.confirm(
          `You are adding items from ${restaurantName}. Do you want to clear your previous cart from ${cartRestaurantName}?`
        )
      ) {
        dispatch(clearCart());
        dispatch(setRestaurantName(restaurantName));
        dispatch(addItem(item));
      }
    } else {
      dispatch(setRestaurantName(restaurantName));
      dispatch(addItem(item));
    }
  };

  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  const isItemInCart = (itemId) => {
    return cartItems.find((item) => item.id === itemId);
  };

  if (loading) {
    return (
      <div className="flex flex-wrap justify-center p-5">
        {Array.from({ length: 8 }).map((_, index) => (
          <ShimmerCard key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <h1 className="text-center text-red-500">Error: {error.message}</h1>;
  }

  if (fullMenuData.length === 0) {
    return (
      <div className="p-5 font-sans max-w-2xl mx-auto">
        <h1 className="text-center text-orange-500 text-4xl mb-5">
          {restaurantName}
        </h1>
        <h2 className="text-center text-lg">
          Sorry, Restaurant is closed. Please come again tomorrow.
        </h2>
      </div>
    );
  }

  return (
    <div className="p-5 font-sans max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen">
      <div className="mb-5 p-5 border border-gray-300 rounded-lg shadow-lg bg-gradient-to-r from-white to-gray-100">
        <h1 className="text-center text-orange-500 text-4xl mb-2">
          {resturantDetails.name}
        </h1>
        <p className="text-center text-gray-600 mb-1">
          {resturantDetails.address}
        </p>
        <p className="text-center text-gray-600">{resturantDetails.area}</p>
      </div>
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="excludeOutOfStock"
            checked={excludeOutOfStock}
            onChange={handleExcludeOutOfStock}
            className="mr-2"
          />
          <label htmlFor="excludeOutOfStock">Exclude Out Of Stock Items</label>
        </div>
        <div className="flex space-x-2">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={handleExpandAll}
          >
            Expand All
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            onClick={handleCollapseAll}
          >
            Collapse All
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {filteredMenu.map((section, index) => (
          <React.Fragment key={index}>
            {Array.isArray(section.data) && section.data[0]?.itemCards ? (
              <>
                <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                {section.data.map(
                  (nestedSection, nestedIndex) =>
                    nestedSection.itemCards?.length > 0 && (
                      <Collapsible
                        key={nestedIndex}
                        trigger={
                          <div
                            className="flex justify-between items-center"
                            onClick={() => handleToggle(index, nestedIndex)}
                          >
                            <h3 className="text-xl font-medium mb-2">
                              {nestedSection.title}
                            </h3>
                            <FontAwesomeIcon
                              icon={
                                expandedSections[`${index}-${nestedIndex}`]
                                  ? faChevronUp
                                  : faChevronDown
                              }
                            />
                          </div>
                        }
                        open={expandedSections[`${index}-${nestedIndex}`]}
                      >
                        <div className="flex flex-wrap">
                          {nestedSection.itemCards.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex items-start border border-gray-200 rounded-lg p-3 shadow w-full mb-4 bg-white"
                            >
                              <img
                                src={`${CDN_URL}${
                                  item?.card?.info?.imageId
                                    ? item.card.info.imageId
                                    : '5d34a0bfc7d64844b2ff27367833b494'
                                }`}
                                alt={item.card.info.name}
                                className="w-48 h-48 rounded object-cover mr-5"
                              />
                              <div className="flex-1">
                                <h2 className="text-2xl text-gray-800 mb-2">
                                  {item.card.info.name}
                                </h2>
                                <p className="text-lg font-bold text-gray-600 mb-2">
                                  {item.card.info.category}
                                </p>
                                <p className="text-md text-gray-600 mb-2">
                                  {item.card.info.description}
                                </p>
                                <p className="text-xl text-green-700 font-bold">
                                  Price:{' '}
                                  {item?.card?.info?.defaultPrice
                                    ? `₹${item.card.info.defaultPrice / 100}`
                                    : `₹${item.card.info.price / 100}`}
                                </p>
                                {isItemInCart(item.card.info.id) ? (
                                  <div className="flex items-center mt-2">
                                    <button
                                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                      onClick={() =>
                                        handleDecreaseQuantity(
                                          item.card.info.id
                                        )
                                      }
                                    >
                                      -
                                    </button>
                                    <span className="mx-2">
                                      {isItemInCart(item.card.info.id).quantity}
                                    </span>
                                    <button
                                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                      onClick={() =>
                                        handleIncreaseQuantity(
                                          item.card.info.id
                                        )
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-600"
                                    onClick={() =>
                                      handleAddItem(item.card.info)
                                    }
                                  >
                                    Add To Cart
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </Collapsible>
                    )
                )}
              </>
            ) : (
              section.data?.length > 0 && (
                <Collapsible
                  trigger={
                    <div
                      className="flex justify-between items-center"
                      onClick={() => handleToggle(index)}
                    >
                      <h2 className="text-2xl font-bold mb-4">
                        {section.title}
                      </h2>
                      <FontAwesomeIcon
                        icon={
                          expandedSections[index] ? faChevronUp : faChevronDown
                        }
                      />
                    </div>
                  }
                  open={expandedSections[index]}
                >
                  <div className="flex flex-wrap">
                    {section.data.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-start border border-gray-200 rounded-lg p-3 shadow w-full mb-4 bg-white"
                      >
                        <img
                          src={`${CDN_URL}${
                            item?.card?.info?.imageId
                              ? item.card.info.imageId
                              : '5d34a0bfc7d64844b2ff27367833b494'
                          }`}
                          alt={item.card.info.name}
                          className="w-48 h-48 rounded object-cover mr-5"
                        />
                        <div className="flex-1">
                          <h2 className="text-2xl text-gray-800 mb-2">
                            {item.card.info.name}
                          </h2>
                          <p className="text-lg font-bold text-gray-600 mb-2">
                            {item.card.info.category}
                          </p>
                          <p className="text-md text-gray-600 mb-2">
                            {item.card.info.description}
                          </p>
                          <p className="text-xl text-green-700 font-bold">
                            Price:{' '}
                            {item?.card?.info?.defaultPrice
                              ? `₹${item.card.info.defaultPrice / 100}`
                              : `₹${item.card.info.price / 100}`}
                          </p>
                          {isItemInCart(item.card.info.id) ? (
                            <div className="flex items-center mt-2">
                              <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                onClick={() =>
                                  handleDecreaseQuantity(item.card.info.id)
                                }
                              >
                                -
                              </button>
                              <span className="mx-2">
                                {isItemInCart(item.card.info.id).quantity}
                              </span>
                              <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                onClick={() =>
                                  handleIncreaseQuantity(item.card.info.id)
                                }
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-600"
                              onClick={() => handleAddItem(item.card.info)}
                            >
                              Add To Cart
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Collapsible>
              )
            )}
            {index < filteredMenu.length - 1 &&
              filteredMenu[index + 1].data?.length > 0 && (
                <hr className="my-5 border-t border-gray-300" />
              )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDetails;
