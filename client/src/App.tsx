import React from 'react';
import { hot } from 'react-hot-loader/root';
import Auth from './routes/AuthRoutes';
import Routes from './routes/AppRoutes';
import useAuth from './hooks/useAuth';

const App = () => {
  const { user } = useAuth();
  console.log(user);

  if (user.token) {
    return <Routes />;
  }
  return <Auth />;
};

export default App;

// export default hot(App);
