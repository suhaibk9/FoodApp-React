import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

const Success = () => {
  const orderSummary = useSelector((state) => state.cart.orderSummary);
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const [isConfettiRunning, setIsConfettiRunning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConfettiRunning(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  if (!orderSummary) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="bg-gradient-to-r from-white to-gray-100 p-10 rounded-lg shadow-lg max-w-2xl w-full text-center">
          <h1 className="text-red-500 text-4xl font-bold mb-5">Oops!</h1>
          <p className="text-lg mb-4">
            No order summary found. Please place an order first.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-5 py-3 bg-orange-500 text-white rounded-lg font-semibold mt-5 hover:bg-orange-600 transition duration-300"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center">
      {isConfettiRunning && <Confetti width={width} height={height} />}
      <div className="bg-gradient-to-r from-white to-gray-100 p-10 rounded-lg shadow-lg max-w-2xl w-full text-center">
        <h1 className="text-orange-500 text-4xl font-bold mb-5">
          Thank You for Your Order!
        </h1>
        <p className="text-lg mb-4">
          Your order from{' '}
          <span className="font-semibold">{orderSummary.restaurantName}</span>{' '}
          has been placed successfully.
        </p>
        <p className="font-bold text-xl mb-4">Order Summary:</p>
        <ul className="list-none p-0 text-left mb-4">
          {orderSummary.items.map((item) => (
            <li key={item.id} className="my-2">
              {item.name} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
        <div className="text-left mb-4">
          <p className="my-2">
            <strong>Total Items:</strong> {orderSummary.totalQuantity}
          </p>
          <p className="my-2">
            <strong>Delivery:</strong> ₹{orderSummary.deliveryCost}
          </p>
          <p className="my-2">
            <strong>Total Cost:</strong> ₹{orderSummary.totalCost}
          </p>
        </div>
        <p className="text-lg mb-4">
          Your order will be delivered in 30 minutes.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-5 py-3 bg-orange-500 text-white rounded-lg font-semibold mt-5 hover:bg-orange-600 transition duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Success;
