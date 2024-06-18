import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import Cart from '../Cart';
import {
  removeItem,
  incrementQuantity,
  decrementQuantity,
} from '../../utils/cartSlice';

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockStore = configureMockStore([]);

describe('Cart Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      cart: {
        items: [
          {
            id: '1',
            name: 'Test Item',
            price: 100,
            quantity: 2,
          },
        ],
        totalQuantity: 2,
      },
    });

    store.dispatch = jest.fn();
  });

  test('renders empty cart message when no items are in the cart', () => {
    store = mockStore({
      cart: {
        items: [],
        totalQuantity: 0,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  test('renders cart items correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('₹1.00')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('increments item quantity', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText('+'));

    expect(store.dispatch).toHaveBeenCalledWith(incrementQuantity('1'));
  });

  test('decrements item quantity', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText('-'));

    expect(store.dispatch).toHaveBeenCalledWith(decrementQuantity('1'));
  });

  test('removes item from the cart', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText(/remove/i));

    expect(store.dispatch).toHaveBeenCalledWith(removeItem('1'));
  });

  test('navigates to checkout page', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText(/checkout/i));

    expect(mockNavigate).toHaveBeenCalledWith('/checkout');
  });

  test('displays total items and total price correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/total items: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/total: ₹2.00/i)).toBeInTheDocument();
  });
});
