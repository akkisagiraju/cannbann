import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import PrivateRoute from './PrivateRoute';
import Home from '../pages/Home';
import Board from '../pages/Board';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/board/:id" component={Board} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
