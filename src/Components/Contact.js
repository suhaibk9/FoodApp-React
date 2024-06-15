import React from 'react';

const Contact = () => {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        lineHeight: '1.6',
        color: '#333',
      }}
    >
      <h1 style={{ textAlign: 'center', color: '#ff6347' }}>Contact Us</h1>
      <p style={{ fontSize: '18px' }}>
        We'd love to hear from you! Whether you have a question about our menu,
        need assistance with an order, or just want to provide feedback, feel
        free to reach out to us.
      </p>
      <h2 style={{ color: '#ff6347' }}>Get in Touch</h2>
      <p style={{ fontSize: '18px' }}>
        You can contact us through any of the following methods:
      </p>
      <ul style={{ fontSize: '18px' }}>
        <li>
          <strong>Email:</strong>{' '}
          <a href="mailto:support@foodapp.com" style={{ color: '#ff6347' }}>
            support@foodapp.com
          </a>
        </li>
        <li>
          <strong>Phone:</strong>{' '}
          <a href="tel:+1234567890" style={{ color: '#ff6347' }}>
            +1 (234) 567-890
          </a>
        </li>
        <li>
          <strong>Address:</strong> 123 Food Street, Culinary City, FL 56789
        </li>
      </ul>
      <h2 style={{ color: '#ff6347' }}>Business Hours</h2>
      <p style={{ fontSize: '18px' }}>
        We are open from Monday to Saturday, 9 AM to 9 PM. We are closed on
        Sundays.
      </p>
      <h2 style={{ color: '#ff6347' }}>Follow Us</h2>
      <p style={{ fontSize: '18px' }}>
        Stay connected with us through our social media channels:
      </p>
      <ul style={{ fontSize: '18px' }}>
        <li>
          <a href="https://facebook.com/foodapp" style={{ color: '#ff6347' }}>
            Facebook
          </a>
        </li>
        <li>
          <a href="https://twitter.com/foodapp" style={{ color: '#ff6347' }}>
            Twitter
          </a>
        </li>
        <li>
          <a href="https://instagram.com/foodapp" style={{ color: '#ff6347' }}>
            Instagram
          </a>
        </li>
      </ul>
      <p style={{ fontSize: '18px' }}>We look forward to hearing from you!</p>
      <p style={{ fontSize: '18px', textAlign: 'center' }}>
        <strong>The FoodApp Team</strong>
      </p>
    </div>
  );
};

export default Contact;
