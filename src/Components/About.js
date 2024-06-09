import React from 'react';

const About = () => {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        lineHeight: '1.6',
        color: '#333',
      }}
    >
      <h1 style={{ textAlign: 'center', color: '#ff6347' }}>About Us</h1>
      <p style={{ fontSize: '18px' }}>
        Welcome to <span style={{ fontWeight: 'bold' }}>FoodApp</span>, your
        number one source for all things delicious! We are dedicated to giving
        you the very best of food, with a focus on quality, customer service,
        and uniqueness.
      </p>
      <p style={{ fontSize: '18px' }}>
        Founded in 2024, <span style={{ fontWeight: 'bold' }}>FoodApp</span> has
        come a long way from its beginnings in a small kitchen. When we first
        started out, our passion for providing the best food experience drove us
        to do intense research and gave us the impetus to turn hard work and
        inspiration into a booming online food ordering service. We now serve
        customers all over the city and are thrilled to be a part of the
        eco-friendly, fair trade wing of the food industry.
      </p>
      <p style={{ fontSize: '18px' }}>
        We believe in delivering not just food, but an experience that brings
        joy and comfort. Our chefs use the finest ingredients to prepare
        mouth-watering dishes that will tantalize your taste buds and leave you
        craving for more. From the freshest salads to the heartiest meals, we
        have something for everyone.
      </p>
      <p style={{ fontSize: '18px' }}>
        At <span style={{ fontWeight: 'bold' }}>FoodApp</span>, we are committed
        to maintaining the highest standards of hygiene and safety. We have
        implemented strict protocols to ensure that every meal you order is
        prepared and delivered with the utmost care.
      </p>
      <p style={{ fontSize: '18px' }}>
        We hope you enjoy our food as much as we enjoy offering it to you. If
        you have any questions or comments, please don't hesitate to contact us.
      </p>
      <p style={{ fontSize: '18px', textAlign: 'center' }}>
        Sincerely,
        <br />
        <span style={{ fontWeight: 'bold' }}>The FoodApp Team</span>
      </p>
    </div>
  );
};

export default About;
