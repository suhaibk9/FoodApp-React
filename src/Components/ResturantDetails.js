// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { CDN_URL } from '../utils/constants';
// import ShimmerCard from './Shimmer';

// import useResturantMenu from '../utils/useResturantMenu';
// const RestaurantDetails = () => {
//   const { id } = useParams();

//   const [sortOption, setSortOption] = useState('');
//   const [excludeOutOfStock, setExcludeOutOfStock] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const {
//     loading,
//     error,
//     restaurantName,
//     restaurantMenu,
//     setRestaurantMenu,
//     filteredMenu,
//     setFilteredMenu,
//   } = useResturantMenu(id);

//   const handleSort = (option, menu) => {
//     let sortedMenu = [...menu];
//     if (option === 'price-asc') {
//       sortedMenu.sort((a, b) =>
//         isNaN(a.price) ? 1 : isNaN(b.price) ? -1 : a.price - b.price
//       );
//     } else if (option === 'price-desc') {
//       sortedMenu.sort((a, b) =>
//         isNaN(a.price) ? -1 : isNaN(b.price) ? 1 : b.price - a.price
//       );
//     } else if (option === 'name-asc') {
//       sortedMenu.sort((a, b) => a.name.localeCompare(b.name));
//     } else if (option === 'name-desc') {
//       sortedMenu.sort((a, b) => b.name.localeCompare(a.name));
//     }
//     return sortedMenu;
//   };

//   const handleSortChange = (event) => {
//     const option = event.target.value;
//     setSortOption(option);
//     applyFilters(option, excludeOutOfStock, searchQuery);
//   };

//   const handleExcludeOutOfStock = (event) => {
//     const exclude = event.target.checked;
//     setExcludeOutOfStock(exclude);
//     applyFilters(sortOption, exclude, searchQuery);
//   };

//   const handleSearch = (event) => {
//     const query = event.target.value.toLowerCase();
//     setSearchQuery(query);
//     applyFilters(sortOption, excludeOutOfStock, query);
//   };

//   const applyFilters = (sortOption, excludeOutOfStock, searchQuery) => {
//     let updatedMenu = excludeOutOfStock
//       ? restaurantMenu.filter((item) => !isNaN(item.price))
//       : restaurantMenu;

//     if (searchQuery) {
//       updatedMenu = updatedMenu.filter((item) =>
//         item.name.toLowerCase().includes(searchQuery)
//       );
//     }

//     updatedMenu = handleSort(sortOption, updatedMenu);
//     setFilteredMenu(updatedMenu);
//   };

//   if (loading) {
//     return (
//       <div className="shimmer-wrapper">
//         {Array.from({ length: 8 }).map((_, index) => (
//           <ShimmerCard key={index} />
//         ))}
//       </div>
//     );
//   }

//   if (error) {
//     return <h1>Error: {error.message}</h1>;
//   }

//   if (restaurantMenu.length === 0) {
//     return (
//       <div style={styles.container}>
//         <h1 style={styles.restaurantName}>{restaurantName}</h1>
//         <h2>Sorry, Restaurant is closed. Please come again tomorrow.</h2>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.restaurantName}>{restaurantName}</h1>
//       <div style={styles.searchContainer}>
//         <input
//           type="text"
//           placeholder="Search for a dish..."
//           value={searchQuery}
//           onChange={handleSearch}
//           style={styles.searchBox}
//         />
//       </div>
//       <div style={styles.controls}>
//         <div style={styles.sortContainer}>
//           <label htmlFor="sort">Sort by:</label>
//           <select
//             id="sort"
//             value={sortOption}
//             onChange={handleSortChange}
//             style={styles.select}
//           >
//             <option value="">Select</option>
//             <option value="price-asc">Price: Low to High</option>
//             <option value="price-desc">Price: High to Low</option>
//             <option value="name-asc">Name: A to Z</option>
//             <option value="name-desc">Name: Z to A</option>
//           </select>
//         </div>
//         <div style={styles.checkboxContainer}>
//           <input
//             type="checkbox"
//             id="excludeOutOfStock"
//             checked={excludeOutOfStock}
//             onChange={handleExcludeOutOfStock}
//             style={styles.checkbox}
//           />
//           <label htmlFor="excludeOutOfStock">Exclude Out Of Stock Items</label>
//         </div>
//       </div>
//       <div style={styles.menuContainer}>
//         {filteredMenu.map((item, index) => {
//           return (
//             <div key={index} style={styles.menuItem}>
//               <img src={item.imageUrl} alt={item.name} style={styles.image} />
//               <div style={styles.details}>
//                 <h2 style={styles.name}>{item.name}</h2>
//                 <p style={styles.category}>{item.category}</p>
//                 <p style={styles.description}>{item.description}</p>
//                 <p style={styles.price}>
//                   Price:{' '}
//                   {isNaN(item.price) ? 'Item Out of Stock' : `₹${item.price}`}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: '20px',
//     fontFamily: 'Arial, sans-serif',
//     maxWidth: '800px',
//     margin: 'auto',
//   },
//   restaurantName: {
//     textAlign: 'center',
//     color: '#ff6347',
//     fontSize: '36px',
//     marginBottom: '20px',
//   },
//   searchContainer: {
//     marginBottom: '20px',
//   },
//   searchBox: {
//     width: '100%',
//     padding: '8px',
//     borderRadius: '4px',
//     border: '1px solid #ddd',
//     fontSize: '16px',
//   },
//   controls: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '20px',
//   },
//   sortContainer: {
//     display: 'flex',
//     alignItems: 'center',
//   },
//   select: {
//     marginLeft: '10px',
//     padding: '5px',
//     borderRadius: '4px',
//     border: '1px solid #ddd',
//     fontSize: '16px',
//   },
//   checkboxContainer: {
//     display: 'flex',
//     alignItems: 'center',
//   },
//   checkbox: {
//     marginRight: '10px',
//   },
//   menuContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '20px',
//   },
//   menuItem: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     border: '1px solid #e0e0e0',
//     borderRadius: '8px',
//     padding: '10px',
//     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//   },
//   image: {
//     width: '150px',
//     height: '150px',
//     borderRadius: '8px',
//     marginRight: '20px',
//     objectFit: 'cover',
//   },
//   details: {
//     flex: 1,
//   },
//   name: {
//     fontSize: '24px',
//     color: '#333',
//     marginBottom: '10px',
//   },
//   category: {
//     fontSize: '18px',
//     fontWeight: 'bold',
//     color: '#777',
//     marginBottom: '10px',
//   },
//   description: {
//     fontSize: '16px',
//     color: '#555',
//     marginBottom: '10px',
//   },
//   price: {
//     fontSize: '18px',
//     color: '#2e8b57',
//     fontWeight: 'bold',
//   },
// };

// export default RestaurantDetails;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CDN_URL } from '../utils/constants';
import ShimmerCard from './Shimmer';
import useResturantMenu from '../utils/useResturantMenu';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [sortOption, setSortOption] = useState('');
  const [excludeOutOfStock, setExcludeOutOfStock] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const {
    loading,
    error,
    restaurantName,
    restaurantMenu,
    setRestaurantMenu,
    filteredMenu,
    setFilteredMenu,
  } = useResturantMenu(id);

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

  if (restaurantMenu.length === 0) {
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
    <div className="p-5 font-sans max-w-4xl mx-auto">
      <h1 className="text-center text-orange-500 text-4xl mb-5">
        {restaurantName}
      </h1>
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search for a dish..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 rounded border border-gray-300 text-lg"
        />
      </div>
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center">
          <label htmlFor="sort" className="mr-2">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={handleSortChange}
            className="ml-2 p-2 rounded border border-gray-300 text-lg"
          >
            <option value="">Select</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
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
      </div>
      <div className="flex flex-col gap-5">
        {filteredMenu.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-start border border-gray-200 rounded-lg p-3 shadow w-full"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-48 h-48 rounded object-cover mr-5"
              />
              <div className="flex-1">
                <h2 className="text-2xl text-gray-800 mb-2">{item.name}</h2>
                <p className="text-lg font-bold text-gray-600 mb-2">
                  {item.category}
                </p>
                <p className="text-md text-gray-600 mb-2">{item.description}</p>
                <p className="text-xl text-green-700 font-bold">
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

export default RestaurantDetails;
