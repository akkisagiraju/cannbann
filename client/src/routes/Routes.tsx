import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import SignIn from '../views/SignIn';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={SignIn} />
    </BrowserRouter>
  );
};

export default Routes;
