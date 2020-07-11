import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import Container from '../styles/Container';
import Button from '../styles/Button';

const Card = styled(Container)`
  width: 360px;
  flex-direction: column;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.25) 0 0 10px;
  padding: 25px 40px;
  font-family: inherit;
`;

const Form = styled(Container)`
  flex-direction: column;
  margin: 8px auto;
`;

const Input = styled.input`
  margin-bottom: 16px;
`;

const SignIn: React.FC<{ signup: () => void }> = ({ signup }) => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  return (
    <Container style={{ height: '100vh' }}>
      <Card>
        <h1>Login</h1>
        <Form>
          <Input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <Button info bold>
            Sign in
          </Button>
        </Form>
        <Button outline bold onClick={() => signup()}>
          Sign up
        </Button>
      </Card>
    </Container>
  );
};

export default SignIn;
