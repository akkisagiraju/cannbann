import React from 'react';
import { hot } from 'react-hot-loader/root';
import Auth from './components/Auth';
import Routes from './routes/Routes';
import useAuth from './hooks/useAuth';

const App = () => {
  const { user } = useAuth();

  if (user.token) {
    return <Routes />;
  }
  return <Auth />;
};

export default hot(App);
