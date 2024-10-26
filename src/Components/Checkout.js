import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, setOrderSummary } from '../utils/cartSlice';
import { useNavigate } from 'react-router-dom';
import { Payment_URL } from '../utils/constants';

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const cartRestaurantName = useSelector((state) => state.cart.restaurantName);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [delivery, setDelivery] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const price = item.price ? item.price : item.defaultPrice;
        return total + (price / 100) * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const totalCost = (parseFloat(getTotal()) + delivery).toFixed(2);

  const handlePlaceOrder = async () => {
    if (!name || !number || !address) {
      alert(
        'We need your Name, Phone Number, and Address for delivery. Please fill in the details.'
      );
      return;
    }

    setIsSubmitting(true);
    const totalAmountInPaise = parseFloat(totalCost) * 100;
    const summary = {
      restaurantName: cartRestaurantName,
      items: cartItems,
      totalQuantity: totalQuantity,
      deliveryCost: delivery,
      totalCost: totalCost,
    };
    dispatch(setOrderSummary(summary));
    localStorage.setItem('orderSummary', JSON.stringify(summary));

    try {
      const response = await fetch(Payment_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          totalAmount: totalAmountInPaise,
        }),
      });
      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error('Error while creating checkout session', err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-5 text-gray-800 flex items-center justify-center">
      <div className="max-w-3xl w-full mx-auto border border-gray-300 rounded-lg p-5 bg-gradient-to-r from-white to-gray-100 shadow-lg">
        <h1 className="text-center text-orange-500 text-4xl mb-5">Checkout</h1>
        {cartItems.length === 0 ? (
          <p className="text-lg text-center">Your cart is empty</p>
        ) : (
          <div>
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
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <label className="block mb-2">
                Name:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    const input = e.target.value;
                    if (/^[a-zA-Z\s]*$/.test(input)) {
                      // allows only alphabets and spaces
                      setName(input);
                    }
                  }}
                  className="block w-full p-2 mt-1 border border-gray-300 rounded"
                  disabled={isSubmitting}
                />
              </label>

              <label className="block mb-2">
                Phone Number:
                <input
                  type="text"
                  value={number}
                  onChange={(e) => {
                    const input = e.target.value;
                    if (/^\d*$/.test(input)) {
                      // allows only digits
                      setNumber(input);
                    }
                  }}
                  className="block w-full p-2 mt-1 border border-gray-300 rounded"
                  disabled={isSubmitting}
                />
              </label>
              <label className="block mb-2">
                Address:
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="block w-full p-2 mt-1 border border-gray-300 rounded"
                  disabled={isSubmitting}
                />
              </label>
              <div className="mb-4">
                <label className="mr-4">
                  <input
                    type="radio"
                    value={30}
                    checked={delivery === 30}
                    onChange={(e) => setDelivery(Number(e.target.value))}
                    className="mx-1"
                    disabled={isSubmitting}
                  />
                  Standard Delivery (₹30)
                </label>
                <label>
                  <input
                    type="radio"
                    value={50}
                    checked={delivery === 50}
                    onChange={(e) => setDelivery(Number(e.target.value))}
                    className="mx-1"
                    disabled={isSubmitting}
                  />
                  Express Delivery (₹50)
                </label>
              </div>
            </div>
            <div className="text-right mt-5">
              <h2>Item Total: ₹{getTotal()}</h2>
              <h2>Delivery: ₹{delivery}</h2>
              <h2>Total: ₹{totalCost}</h2>
            </div>
            <button
              onClick={handlePlaceOrder}
              className={`block w-full px-5 py-3 ${
                isSubmitting ? 'bg-gray-400' : 'bg-orange-500'
              } text-white rounded mt-5`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
