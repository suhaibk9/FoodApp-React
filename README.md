# FoodApp - A React-Based Food Ordering Platform

**FoodApp** is a modern, responsive web application built with React that allows users to browse, select, and order food from their favorite restaurants. The app leverages a user-friendly interface and state-of-the-art technologies to deliver a seamless online food ordering experience.

## Key Features

- **Restaurant Browsing**: Users can explore a wide variety of restaurants with detailed menus.
- **Real-Time Cart Management**: Add, remove, and modify items in the cart with real-time updates.
- **Checkout Process**: A streamlined checkout process that includes user information capture and delivery options.
- **Order Summary**: Detailed order summary and confirmation screen post-checkout. Confetti appears on the success page to celebrate a successful order.
- **Payment Integration**: Seamless payment processing using Stripe.
- **Responsive Design**: Ensures optimal user experience on both desktop and mobile devices.
- **State Management**: Utilizes Redux for efficient state management across the application.
- **Testing**: Includes unit testing with Jest to ensure code reliability.
- **Search and Sort**: On the home page, users can search for restaurants by name, filter by highest-rated restaurants (4+ rating), and sort by rating both high to low and low to high.

## Technologies Used

- **React**: For building the user interface.
- **Redux**: For state management.
- **React Router**: For client-side routing.
- **Tailwind CSS**: For styling and responsive design.
- **Parcel**: As the application bundler.
- **Vercel**: For deployment and hosting.
- **Stripe**: For payment processing.
- **Jest**: For unit testing.

## Routing

- `/` - Home Page of the app where it lists all restaurants.
- `/restaurant/:restaurantid` - When clicking on the restaurant on the home page it will take you to this page where all items sold by the restaurant are listed.
- `/cart` - After adding items you can go to the cart where all your added items will be listed and you will be given the option to remove the item and also change the quantity.
- `/checkout` - After the cart, enter your details and see the items you have ordered.
- `/success` - After clicking on place order in the checkout page you will be routed to the Stripe payment page, then if payment is successful you will be routed to the success page.
- `/payment-failed` - If payment failed, you will be routed to the payment failed page.

## File Structure

```plaintext
FoodApp-React/
├── dist/
├── node_modules/
├── src/
│   ├── Components/
│   │   ├── About.js
│   │   ├── Cart.js
│   │   ├── Checkout.js
│   │   ├── ...
│   │   └── __tests__/
│   │       ├── Cart.test.js
│   │       ├── Contact.test.js
│   ├── utils/
│   │   ├── UserContext.js
│   │   ├── appStore.js
│   │   ├── cartSlice.js
│   │   ├── ...
│   ├── app.js
├── index.css
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vercel.json
└── README.md
```

## Screenshots

### Home Page
<img width="1430" alt="image" src="https://github.com/suhaibk9/FoodApp-React/assets/19365397/48074b59-fdb1-46d2-bf29-8b1eb7d18e7f">


### Restaurant Page with All Accordions Closed
<img width="1439" alt="image" src="https://github.com/suhaibk9/FoodApp-React/assets/19365397/30c08c8a-5877-4ddb-8597-91251de59274">


### Restaurant Page with Accordion Opened and One Item Added to Cart
<img width="1440" alt="image" src="https://github.com/suhaibk9/FoodApp-React/assets/19365397/93ba5a0c-e440-487b-aab6-20403f97af05">


### Cart Page
<img width="1437" alt="image" src="https://github.com/suhaibk9/FoodApp-React/assets/19365397/ac4141a5-b682-4031-b67a-ac43184e2dd2">


### Checkout Page
<img width="1274" alt="image" src="https://github.com/suhaibk9/FoodApp-React/assets/19365397/f5b4b7da-b2c3-4469-9c63-c1d883858373">


### Stripe Payment Page
<img width="900" alt="image" src="https://github.com/suhaibk9/FoodApp-React/assets/19365397/b934087f-93d2-49d8-ba88-d436817b542c">


### Payment Success Page
<img width="1288" alt="image" src="https://github.com/suhaibk9/FoodApp-React/assets/19365397/ffbaaead-4925-495a-a398-8e7e75d8d98d">

(Confetti appears on the success page.)

## Links

- **Live URL**: [FoodApp](https://foodapp-react-peach.vercel.app/)
- **LinkedIn**: [Suhaib Khan](https://www.linkedin.com/in/suhaibk9/)
- **Email**: [suhaib0900@gmail.com](mailto:suhaib0900@gmail.com)

Enjoy your FoodApp experience!
