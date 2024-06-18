import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col justify-center items-center p-5">
      <div className="bg-gradient-to-r from-white to-gray-100 p-10 rounded-lg shadow-lg max-w-xl text-center">
        <h1 className="text-6xl text-red-700 mb-5">Oops!</h1>
        <h2 className="text-2xl text-red-700 mb-3">Something went wrong</h2>
        <p className="text-lg text-gray-800 mb-5">
          We encountered an unexpected error. Please try again later.
        </p>
        {error && (
          <div className="bg-red-100 p-5 rounded-lg text-left">
            <h3 className="text-xl text-red-700 mb-2">Error Details:</h3>
            <p className="text-md text-gray-800">
              {error.statusText || error.message}
            </p>
          </div>
        )}
        <a
          href="/"
          className="mt-8 inline-block px-5 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
