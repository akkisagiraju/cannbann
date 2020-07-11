import React from 'react';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';

const Auth: React.FC = () => {
  const [auth, setAuth] = React.useState<string>('signin');

  const signin = (): void => setAuth('signin');
  const signup = (): void => setAuth('signup');

  if (auth === 'signup') {
    return <SignUp signin={signin} />;
  }

  return <SignIn signup={signup} />;
};

export default Auth;
