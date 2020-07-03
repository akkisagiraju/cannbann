import React from 'react';
import Button from '../components/Button';
import Card from '../components/Card';

const SignIn = () => {
  return (
    <div>
      <Card>
        <h1>Login to Trello</h1>
        <Button info bold>
          Sign in
        </Button>
      </Card>
    </div>
  );
};

export default SignIn;
