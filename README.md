
# FoodApp - A React-Based Food Ordering Platform

**FoodApp** is a modern, responsive web application built with React that allows users to browse, select, and order food from their favorite restaurants. The app leverages a user-friendly interface and state-of-the-art technologies to deliver a seamless online food ordering experience.

## Key Features

- **Restaurant Browsing**: Users can explore a wide variety of restaurants with detailed menus.
- **Real-Time Cart Management**: Add, remove, and modify items in the cart with real-time updates.
- **Checkout Process**: A streamlined checkout process that includes user information capture and delivery options.
- **Order Summary**: Detailed order summary and confirmation screen post-checkout.
- **Payment Integration**: Seamless payment processing using Stripe.
- **Responsive Design**: Ensures optimal user experience on both desktop and mobile devices.
- **State Management**: Utilizes Redux for efficient state management across the application.
- **Testing**: Includes unit testing with Jest to ensure code reliability.

## Technologies Used

- **React**: For building the user interface.
- **Redux**: For state management.
- **React Router**: For client-side routing.
- **Tailwind CSS**: For styling and responsive design.
- **Parcel**: As the application bundler.
- **Vercel**: For deployment and hosting.
- **Stripe**: For payment processing.
- **Jest**: For unit testing.

## Installation

To get a local copy up and running, follow these simple steps:

1. **Clone the repository**
   ```sh
   git clone https://github.com/suhaibk9/FoodApp-React.git
   cd FoodApp-React
   ```

2. **Install NPM packages**
   ```sh
   npm install
   ```

3. **Run the application**
   ```sh
   npm start
   ```

## Deployment

This project is deployed using Vercel. Ensure that your build command is set to:
```sh
npm run build
```

And your start command is set to:
```sh
npm start
```

## Live Demo

Check out the live demo of the project [here](https://foodapp-react-peach.vercel.app/).

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
│   │   ├── Contact.js
│   │   ├── ErrorPage.js
│   │   ├── Header.js
│   │   ├── ResturantDetails.js
│   │   ├── Success.js
│   │   ├── body.js
│   │   ├── resturantCard.js
│   │   ├── Shimmer.js
│   │   ├── __tests__/
│   │   │   ├── CardAddition.test.js
│   │   │   ├── Cart.test.js
│   │   │   ├── Contact.test.js
│   │   │   ├── ResturantCard.test.js
│   │   │   ├── Search.test.js
│   │   ├── mocks/
│   ├── utils/
│   │   ├── UserContext.js
│   │   ├── appStore.js
│   │   ├── cartSlice.js
│   │   ├── constants.js
│   │   ├── useOnelineStatus.js
│   │   ├── useResturantMenu.js
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

## Usage

1. **Browse Restaurants**: Start by exploring the list of available restaurants.
2. **Add to Cart**: Select items to add to your cart. You can adjust the quantity as needed.
3. **Checkout**: Proceed to the checkout page, fill in your delivery details, and choose a delivery option.
4. **Order Summary**: Review your order summary and confirm the order.
5. **Payment**: Redirect to Stripe for secure payment processing.

## Testing

The application includes unit tests to ensure code reliability. Run the tests using:

```sh
npm run test
```

## Contact

Suhaib Khan - [LinkedIn](https://www.linkedin.com/in/suhaibk9/) - suhaib0900@gmail.com

Hosted Link on Vercel: [https://foodapp-react-peach.vercel.app/](https://foodapp-react-peach.vercel.app/)

Project Link: [https://github.com/suhaibk9/FoodApp-React](https://github.com/suhaibk9/FoodApp-React)
