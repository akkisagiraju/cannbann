import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Navbar from '../components/Navbar';

const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  if (!Component) return null;

  const { user } = useAuth();
  if (!user.token) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Navbar />
      <Route {...rest} render={(props) => <Component {...props} />} />
    </>
  );
};

export default PrivateRoute;
