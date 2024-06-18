import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="bg-gradient-to-r from-white to-gray-100 p-10 rounded-lg shadow-lg max-w-2xl w-full text-center">
        <h1 className="text-red-500 text-4xl font-bold mb-5">Payment Failed</h1>
        <p className="text-lg mb-4">
          Unfortunately, your payment could not be processed. Please try again.
        </p>
        <button
          onClick={() => navigate('/checkout')}
          className="px-5 py-3 bg-orange-500 text-white rounded-lg font-semibold mt-5 hover:bg-orange-600 transition duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;
