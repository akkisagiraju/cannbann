import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';

const Routes = () => {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Route path="/home" component={Home} />
      </BrowserRouter>
    </>
  );
};

export default Routes;
