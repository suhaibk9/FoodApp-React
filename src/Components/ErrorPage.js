import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.log('error', error);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8d7da',
        color: '#721c24',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Oops!</h1>
      <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>
        Something went wrong
      </h2>
      <p style={{ fontSize: '18px', maxWidth: '600px' }}>
        We encountered an unexpected error. Please try again later.
      </p>
      {error && (
        <div
          style={{
            marginTop: '20px',
            backgroundColor: '#f5c6cb',
            padding: '15px',
            borderRadius: '5px',
            maxWidth: '600px',
            wordWrap: 'break-word',
          }}
        >
          <h3 style={{ fontSize: '20px' }}>Error Details:</h3>
          <p style={{ fontSize: '16px' }}>
            {error.statusText || error.message}
          </p>
        </div>
      )}
      <a
        href="/"
        style={{
          marginTop: '30px',
          padding: '10px 20px',
          backgroundColor: '#f5c6cb',
          color: '#721c24',
          textDecoration: 'none',
          borderRadius: '5px',
        }}
      >
        Go to Homepage
      </a>
    </div>
  );
};

export default ErrorPage;
