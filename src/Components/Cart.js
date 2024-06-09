import React, { useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Pizza', price: 12.99, quantity: 1 },
    { id: 2, name: 'Burger', price: 8.99, quantity: 2 },
    { id: 3, name: 'Pasta', price: 10.99, quantity: 1 },
  ]);

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  const getTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        color: '#333',
      }}
    >
      <h1 style={{ textAlign: 'center', color: '#ff6347' }}>Your Cart</h1>
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          border: '1px solid #e7e7e7',
          borderRadius: '5px',
          padding: '20px',
          backgroundColor: '#fff',
        }}
      >
        {cartItems.length === 0 ? (
          <p style={{ fontSize: '18px', textAlign: 'center' }}>
            Your cart is empty
          </p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {cartItems.map((item) => (
              <li
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid #e7e7e7',
                  padding: '10px 0',
                }}
              >
                <div>
                  <h2 style={{ margin: 0 }}>{item.name}</h2>
                  <p style={{ margin: '5px 0', color: '#888' }}>
                    ${item.price.toFixed(2)}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label
                      htmlFor={`quantity-${item.id}`}
                      style={{ marginRight: '10px' }}
                    >
                      Quantity:
                    </label>
                    <input
                      id={`quantity-${item.id}`}
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                      style={{
                        width: '50px',
                        padding: '5px',
                        textAlign: 'center',
                        border: '1px solid #e7e7e7',
                        borderRadius: '5px',
                      }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  style={{
                    padding: '10px 15px',
                    backgroundColor: '#ff6347',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        {cartItems.length > 0 && (
          <div style={{ textAlign: 'right', marginTop: '20px' }}>
            <h2>Total: ${getTotal()}</h2>
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: '#ff6347',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
