import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeItem,
  incrementQuantity,
  decrementQuantity,
} from '../utils/cartSlice';


// const Cart = () => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.items);
//   const totalQuantity = useSelector((state) => state.cart.totalQuantity);

//   const handleRemove = (id) => {
//     dispatch(removeItem(id));
//   };

//   const handleIncrement = (id) => {
//     dispatch(incrementQuantity(id));
//   };

//   const handleDecrement = (id) => {
//     dispatch(decrementQuantity(id));
//   };

//   const getTotal = () => {
//     return cartItems
//       .reduce((total, item) => {
//         const price = item.price ? item.price : item.defaultPrice;
//         return total + (price / 100) * item.quantity;
//       }, 0)
//       .toFixed(2);
//   };

//   return (
//     <div
//       style={{
//         fontFamily: 'Arial, sans-serif',
//         padding: '20px',
//         color: '#333',
//       }}
//     >
//       <h1 style={{ textAlign: 'center', color: '#ff6347' }}>Your Cart</h1>
//       <div
//         style={{
//           maxWidth: '800px',
//           margin: '0 auto',
//           border: '1px solid #e7e7e7',
//           borderRadius: '5px',
//           padding: '20px',
//           backgroundColor: '#fff',
//         }}
//       >
//         {cartItems.length === 0 ? (
//           <p style={{ fontSize: '18px', textAlign: 'center' }}>
//             Your cart is empty
//           </p>
//         ) : (
//           <ul style={{ listStyleType: 'none', padding: 0 }}>
//             {cartItems.map((item) => (
//               <li
//                 key={item.id}
//                 style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   borderBottom: '1px solid #e7e7e7',
//                   padding: '10px 0',
//                 }}
//               >
//                 <div>
//                   <h2 style={{ margin: 0 }}>{item.name}</h2>
//                   <p style={{ margin: '5px 0', color: '#888' }}>
//                     ₹
//                     {(
//                       (item.price ? item.price : item.defaultPrice) / 100
//                     ).toFixed(2)}
//                   </p>
//                   <div style={{ display: 'flex', alignItems: 'center' }}>
//                     <button
//                       onClick={() => handleDecrement(item.id)}
//                       style={{
//                         padding: '5px 10px',
//                         backgroundColor: '#ff6347',
//                         color: '#fff',
//                         border: 'none',
//                         borderRadius: '5px',
//                         cursor: 'pointer',
//                         marginRight: '10px',
//                       }}
//                     >
//                       -
//                     </button>
//                     <span>{item.quantity}</span>
//                     <button
//                       onClick={() => handleIncrement(item.id)}
//                       style={{
//                         padding: '5px 10px',
//                         backgroundColor: '#ff6347',
//                         color: '#fff',
//                         border: 'none',
//                         borderRadius: '5px',
//                         cursor: 'pointer',
//                         marginLeft: '10px',
//                       }}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => handleRemove(item.id)}
//                   style={{
//                     padding: '10px 15px',
//                     backgroundColor: '#ff6347',
//                     color: '#fff',
//                     border: 'none',
//                     borderRadius: '5px',
//                     cursor: 'pointer',
//                   }}
//                 >
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//         {cartItems.length > 0 && (
//           <div style={{ textAlign: 'right', marginTop: '20px' }}>
//             <h2>Total: ₹{getTotal()}</h2>
//             <button
//               style={{
//                 padding: '10px 20px',
//                 backgroundColor: '#ff6347',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: '5px',
//                 cursor: 'pointer',
//               }}
//             >
//               Checkout
//             </button>
//           </div>
//         )}
//     {
//       totalQuantity>0?    <div style={{ textAlign: 'center', marginTop: '20px' }}>
//           <h2>Total Items: {totalQuantity}</h2>
//         </div>:<div style={{ textAlign: 'center', marginTop: '20px' }}>
//           <h2>No Items in Cart</h2>
//         </div>
//     }
//       </div>
//     </div>
//   );
// };

// export default Cart;




import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const getTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const price = item.price ? item.price : item.defaultPrice;
        return total + (price / 100) * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-5 text-gray-800 flex items-center justify-center">
      <div className="max-w-3xl w-full mx-auto border border-gray-300 rounded-lg p-5 bg-gradient-to-r from-white to-gray-100 shadow-lg">
        <h1 className="text-center text-orange-500 text-4xl mb-5">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-lg text-center">Your cart is empty</p>
        ) : (
          <ul className="list-none p-0">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b border-gray-300 py-3"
              >
                <div>
                  <h2 className="m-0 text-xl">{item.name}</h2>
                  <p className="my-2 text-gray-600">
                    ₹
                    {(
                      (item.price ? item.price : item.defaultPrice) / 100
                    ).toFixed(2)}
                  </p>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleDecrement(item.id)}
                      className="px-3 py-1 bg-orange-500 text-white rounded mr-2"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item.id)}
                      className="px-3 py-1 bg-orange-500 text-white rounded ml-2"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="px-3 py-2 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        {cartItems.length > 0 && (
          <div className="text-right mt-5">
            <h2 className="text-xl">Total: ₹{getTotal()}</h2>
            <button
              onClick={handleCheckout}
              className="px-5 py-2 bg-green-500 text-white rounded mt-3"
            >
              Checkout
            </button>
          </div>
        )}
        {totalQuantity > 0 ? (
          <div className="text-center mt-5">
            <h2 className="text-lg">Total Items: {totalQuantity}</h2>
          </div>
        ) : (
          <div className="text-center mt-5">
            <h2 className="text-lg">No Items in Cart</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;