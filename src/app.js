import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { useEffect, useState } from 'react';
import Header from './Components/header';
import Body from './Components/body';
import About from './Components/About';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Contact from './Components/Contact';
import ErrorPage from './Components/ErrorPage';
import Cart from './Components/Cart';
import RestaurantDetails from './Components/ResturantDetails';
import UserContext from './utils/UserContext';
import { useContext } from 'react';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Checkout from './Components/Checkout';
import Success from './Components/Success';
import PaymentFailed from './Components/PaymentFailed';
// const Cart = lazy(() => import('./Components/Cart'));
// const About = lazy(() => import('./Components/About'));
const App = () => {
  const dd = useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = useState('Sk');
  {
    /**
     TO USE THIS
    import { useContext } from 'react';
    import UserContext from '../utils/UserContext';
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);  
    Now just use loggedInUser and setLoggedInUser in your component.
     */
  }
  return (
    <Provider store={appStore}>
      {/* <UserContext.Provider
        value={{ loggedInUser: loggedInUser, setLoggedInUser: setLoggedInUser }}
      > */}
        <div className="app">
          {/* Header Body Footer */}

          <Header />
          <Outlet />
        </div>
      {/* </UserContext.Provider> */}
    </Provider>
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
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/resturant/:id',
        element: <RestaurantDetails />,
      },
      {
        path:'/checkout',
        element:<Checkout/>
      },
      {
        path:'/success',
        element:<Success/>
      },
      {
        path:'/payement-failed',
        element:<PaymentFailed/>
      }
    ],
    errorElement: <ErrorPage />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);

//https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_L
