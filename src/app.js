import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import Header from './Components/header';
import Body from './Components/body';



const App = () => {
  return (
    <div className="app">
      {/* Header Body Footer */}
      <Header />
      <Body />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

//https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_L
