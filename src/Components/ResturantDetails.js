// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { CDN_URL } from '../utils/constants';

// const RestaurantDetails = () => {
//   let nameOfResturant = '';
//   const { id } = useParams();
//   const [restaurant, setRestaurant] = useState(null);

//   useEffect(() => {
//     const fetchRestaurantDetails = async () => {
//       try {
//         const response = await fetch(
//           `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9352403&lng=77.624532&restaurantId=${id}&submitAction=ENTER`
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         nameOfResturant = data.data.cards[0].card.card.text;
//         let restData = [];
//         let ar = [];
//         data.data.cards[5].groupedCard.cardGroupMap.REGULAR.cards.map(
//           (card) => {
//             if (card.card.card.hasOwnProperty('itemCards')) {
//               restData.push(card.card.card.itemCards);
//             }
//           }
//         );
//         restData = restData.flat();
//         console.log(restData);
//         restData = restData.map((item) => {
//           console.log(item.card.info);
//           const obj = {
//             name: item.card.info.name,
//             price: item.card.info.price / 100,
//             description: item.card.info.description,
//             category: item.card.info.category,
//             imageUrl: `${CDN_URL}${item.card.info.imageId}`,
//           };
//           ar.push(obj);
//         });
//         console.log(ar);
//         setRestaurant(ar);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching restaurant details:', error);
//         setError(error);
//         setLoading(false);
//       }
//     };
//     fetchRestaurantDetails();
//   }, [id]);

//   return <h1>Hello</h1>;
// };
// export default RestaurantDetails;
//Full COde STart

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CDN_URL } from '../utils/constants';
import ShimmerCard from './Shimmer';
const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantMenu, setRestaurantMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await fetch(
          `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9352403&lng=77.624532&restaurantId=${id}&submitAction=ENTER`
        );

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
          price: item.card.info.price / 100,
          description: item.card.info.description,
          category: item.card.info.category,
          imageUrl: `${CDN_URL}${item.card.info.imageId}`,
        }));

        setRestaurantMenu(menuItems);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  if (loading) {
      return <div className="shimmer-wrapper">
         {Array.from({ length: 8 }).map((_, index) => (
           <ShimmerCard key={index} />
         ))}
       </div>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.restaurantName}>{restaurantName}</h1>
      <div style={styles.menuContainer}>
        {restaurantMenu.map((item, index) => {
          return (
            <div key={index} style={styles.menuItem}>
              <img src={item.imageUrl} alt={item.name} style={styles.image} />
              <div style={styles.details}>
                <h2 style={styles.name}>{item.name}</h2>
                <p style={styles.category}>{item.category}</p>
                <p style={styles.description}>{item.description}</p>
                <p style={styles.price}>Price: ₹{item.price}</p>
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
