import React, { lazy,Suspense } from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import Header from './Components/header';
import Body from './Components/body';
import About from './Components/About';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Contact from './Components/Contact';
import ErrorPage from './Components/ErrorPage';
import Cart from './Components/Cart';
import RestaurantDetails from './Components/ResturantDetails';
const Cart = lazy(() => import('./Components/Cart'));
const About = lazy(() => import('./Components/About'));
const App = () => {
  return (
    <div className="app">
      {/* Header Body Footer */}
      <Header />
      <Outlet />
    </div>
  );
};
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Body />,
      },
      {
        path: '/about',
        element: <Suspense fallback={<div>Loading...</div>}><About /></Suspense>,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/cart',
        element: <Suspense fallback={<div>Loading...</div>}><Cart /></Suspense>,
      },
      {
        path: '/resturant/:id',
        element: <RestaurantDetails />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);

//https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_L
