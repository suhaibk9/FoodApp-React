import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CDN_URL ,MENU_URL} from '../utils/constants';
import ShimmerCard from './Shimmer';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantMenu, setRestaurantMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('');
  const [excludeOutOfStock, setExcludeOutOfStock] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSort = (option, menu) => {
    let sortedMenu = [...menu];
    if (option === 'price-asc') {
      sortedMenu.sort((a, b) =>
        isNaN(a.price) ? 1 : isNaN(b.price) ? -1 : a.price - b.price
      );
    } else if (option === 'price-desc') {
      sortedMenu.sort((a, b) =>
        isNaN(a.price) ? -1 : isNaN(b.price) ? 1 : b.price - a.price
      );
    } else if (option === 'name-asc') {
      sortedMenu.sort((a, b) => a.name.localeCompare(b.name));
    } else if (option === 'name-desc') {
      sortedMenu.sort((a, b) => b.name.localeCompare(a.name));
    }
    return sortedMenu;
  };

  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);
    applyFilters(option, excludeOutOfStock, searchQuery);
  };

  const handleExcludeOutOfStock = (event) => {
    const exclude = event.target.checked;
    setExcludeOutOfStock(exclude);
    applyFilters(sortOption, exclude, searchQuery);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    applyFilters(sortOption, excludeOutOfStock, query);
  };

  const applyFilters = (sortOption, excludeOutOfStock, searchQuery) => {
    let updatedMenu = excludeOutOfStock
      ? restaurantMenu.filter((item) => !isNaN(item.price))
      : restaurantMenu;

    if (searchQuery) {
      updatedMenu = updatedMenu.filter((item) =>
        item.name.toLowerCase().includes(searchQuery)
      );
    }

    updatedMenu = handleSort(sortOption, updatedMenu);
    setFilteredMenu(updatedMenu);
  };

  if (loading) {
    return (
      <div className="shimmer-wrapper">
        {Array.from({ length: 8 }).map((_, index) => (
          <ShimmerCard key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  if (restaurantMenu.length === 0) {
    return (
      <div style={styles.container}>
        <h1 style={styles.restaurantName}>{restaurantName}</h1>
        <h2>Sorry, Restaurant is closed. Please come again tomorrow.</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.restaurantName}>{restaurantName}</h1>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for a dish..."
          value={searchQuery}
          onChange={handleSearch}
          style={styles.searchBox}
        />
      </div>
      <div style={styles.controls}>
        <div style={styles.sortContainer}>
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={handleSortChange}
            style={styles.select}
          >
            <option value="">Select</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
        <div style={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="excludeOutOfStock"
            checked={excludeOutOfStock}
            onChange={handleExcludeOutOfStock}
            style={styles.checkbox}
          />
          <label htmlFor="excludeOutOfStock">Exclude Out Of Stock Items</label>
        </div>
      </div>
      <div style={styles.menuContainer}>
        {filteredMenu.map((item, index) => {
          return (
            <div key={index} style={styles.menuItem}>
              <img src={item.imageUrl} alt={item.name} style={styles.image} />
              <div style={styles.details}>
                <h2 style={styles.name}>{item.name}</h2>
                <p style={styles.category}>{item.category}</p>
                <p style={styles.description}>{item.description}</p>
                <p style={styles.price}>
                  Price:{' '}
                  {isNaN(item.price) ? 'Item Out of Stock' : `₹${item.price}`}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: 'auto',
  },
  restaurantName: {
    textAlign: 'center',
    color: '#ff6347',
    fontSize: '36px',
    marginBottom: '20px',
  },
  searchContainer: {
    marginBottom: '20px',
  },
  searchBox: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  sortContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  select: {
    marginLeft: '10px',
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: '10px',
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: '150px',
    height: '150px',
    borderRadius: '8px',
    marginRight: '20px',
    objectFit: 'cover',
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '10px',
  },
  category: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#777',
    marginBottom: '10px',
  },
  description: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '10px',
  },
  price: {
    fontSize: '18px',
    color: '#2e8b57',
    fontWeight: 'bold',
  },
};

export default RestaurantDetails;
