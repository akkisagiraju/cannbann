import React from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import PrivateRoute from './PrivateRoute';
import Home from '../pages/Home';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <PrivateRoute path="/home" component={Home} />
    </BrowserRouter>
  );
};

export default Routes;
