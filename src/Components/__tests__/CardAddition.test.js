import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RestaurantDetails from '../ResturantDetails';
import MOCK_DATA from '../mocks/resDetailsMock.json';
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA),
  })
);
it('should load Resturant Menu', async () => {
  React.act(async () => {
    render(
      <BrowserRouter>
        <RestaurantDetails />
      </BrowserRouter>
    );
  });
});
