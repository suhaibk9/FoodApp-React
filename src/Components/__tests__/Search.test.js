import Body from '../body';
import React, { Component } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import this to use custom matchers
import { BrowserRouter } from 'react-router-dom';
import MOCK_DATA from '../mocks/restListDataMock.json';
import { act } from 'react-dom/test-utils';
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve(
        data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
      ),
  })
);
it('renders the body component', async () => {
  await React.act(async () => {
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    );
  });
  const searchBox = screen.getByTestId('search-input');
  fireEvent.change(searchBox, { target: { value: 'Pizza' } });
  const cards = screen.getAllByTestId('res-card');
  expect(cards.length).toBeGreaterThan(0);
});
it('Render Top Reated Restaurants', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    );
  });
  const select = screen.getByTestId('sort-select');
  fireEvent.change(select, { target: { value: 'highRate' } });
  const cards = screen.getAllByTestId('res-card');
  expect(cards.length).toBeGreaterThan(0);
});

describe('Tests description', () => {
  //beforeAll accepts a callback and that callback runs before all the tests
  beforeAll(() => {});
  //beforeEach accepts a callback and that callback runs before each test
  beforeEach(() => {});
  //afterEach accepts a callback and that callback runs after each test
  afterEach(() => {});
  //afterAll accepts a callback and that callback runs after all the tests
  afterAll(() => {});
  it('Test1', () => {});
  it('Test2', () => {});
  //beforeAll will run before both Test1 and Test2.
  //beforeEach will run before each test, so before Test1 and before Test2. Basically twice.
  //afterEach will run after each test, so after Test1 and after Test2. Basically twice.
  //afterAll will run after both Test1 and Test2.
});
