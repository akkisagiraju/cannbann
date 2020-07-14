import React from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';

const Auth: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Redirect to="/" />
    </BrowserRouter>
  );
};

export default Auth;
