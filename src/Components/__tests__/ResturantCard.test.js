import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import this to use custom matchers
import { BrowserRouter } from 'react-router-dom';
import RestaurantCard, { withVegLabel } from '../resturantCard';
import { CDN_URL } from '../../utils/constants';
import mockRestaurant from '../mocks/resCardMock.json';

// Mocking the CDN_URL
jest.mock('../../utils/constants', () => ({
  CDN_URL: 'https://mockcdn.com/',
}));

describe('RestaurantCard Component', () => {
  test('renders restaurant card with correct data', () => {
    render(
      <BrowserRouter>
        <RestaurantCard restaurant={mockRestaurant} />
      </BrowserRouter>
    );

    const imageUrl = `${CDN_URL}${mockRestaurant.cloudinaryImageId}`;

    expect(screen.getByAltText('Restaurant Logo')).toHaveAttribute(
      'src',
      imageUrl
    );
    expect(screen.getByText(mockRestaurant.name)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockRestaurant.avgRatingString} stars`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockRestaurant.cuisines.join(', '))
    ).toBeInTheDocument();
    expect(screen.getByText(mockRestaurant.costForTwo)).toBeInTheDocument();
  });

  test('navigates to correct URL on click', () => {
    render(
      <BrowserRouter>
        <RestaurantCard restaurant={mockRestaurant} />
      </BrowserRouter>
    );

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      `/resturant/${mockRestaurant.id}`
    );
  });
});

describe('withVegLabel HOC', () => {
  const VegRestaurantCard = withVegLabel(RestaurantCard);

  test('renders Veg label when restaurant is vegetarian', () => {
    const vegRestaurant = {
      ...mockRestaurant,
      veg: true,
    };

    render(
      <BrowserRouter>
        <VegRestaurantCard restaurant={vegRestaurant} />
      </BrowserRouter>
    );

    expect(screen.getByText('Veg')).toBeInTheDocument();
  });

  test('does not render Veg label when restaurant is not vegetarian', () => {
    const nonVegRestaurant = {
      ...mockRestaurant,
      veg: false,
    };

    render(
      <BrowserRouter>
        <VegRestaurantCard restaurant={nonVegRestaurant} />
      </BrowserRouter>
    );

    expect(screen.queryByText('Veg')).not.toBeInTheDocument();
  });

  test('renders restaurant card correctly inside HOC', () => {
    render(
      <BrowserRouter>
        <VegRestaurantCard restaurant={mockRestaurant} />
      </BrowserRouter>
    );

    const imageUrl = `${CDN_URL}${mockRestaurant.cloudinaryImageId}`;

    expect(screen.getByAltText('Restaurant Logo')).toHaveAttribute(
      'src',
      imageUrl
    );
    expect(screen.getByText(mockRestaurant.name)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockRestaurant.avgRatingString} stars`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockRestaurant.cuisines.join(', '))
    ).toBeInTheDocument();
    expect(screen.getByText(mockRestaurant.costForTwo)).toBeInTheDocument();
  });
});
