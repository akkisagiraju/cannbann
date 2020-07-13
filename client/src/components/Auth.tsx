import React from 'react';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';

const Auth: React.FC = () => {
  const [authView, setAuthView] = React.useState<string>('signin');

  const switchToSignin = (): void => setAuthView('signin');
  const switchToSignup = (): void => setAuthView('signup');

  if (authView === 'signup') {
    return <SignUp switchToSignin={switchToSignin} />;
  }

  return <SignIn switchToSignup={switchToSignup} />;
};

export default Auth;
