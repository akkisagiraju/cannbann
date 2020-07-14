import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Container from '../styles/Container';
import Button from '../styles/Button';
import useAuth, { UserObject } from '../hooks/useAuth';
import Loader from '../styles/Loader';

const Card = styled(Container)`
  width: 320px;
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

const SignIn: React.FC = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const { saveUser } = useAuth();
  const history = useHistory();

  const resetForm = (): void => {
    setEmail('');
    setPassword('');
  };

  const signinSuccess = (user: UserObject): void => {
    setIsLoading(false);
    saveUser(user);
    setErrorMessage('');
    history.push('/home');
  };

  const signinFail = (error: string): void => {
    setIsLoading(false);
    setErrorMessage(error);
    resetForm();
  };

  const signinHandler = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await axios.post('/auth/signin', { email, password });
      const user = response.data as UserObject;
      signinSuccess(user);
    } catch (error) {
      signinFail(error.response.data.message);
    }
  };

  return (
    <Container style={{ height: '100vh' }}>
      <Card>
        <h1>Login</h1>
        <Form>
          <Input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          {!isLoading ? (
            <Button bold onClick={signinHandler}>
              Sign in
            </Button>
          ) : (
            <Loader primary />
          )}
        </Form>
        <div>
          Don't have an account?
          <Button outline bold onClick={() => history.push('/signup')}>
            Sign up
          </Button>
        </div>
        <p style={{ color: '#B71C1C' }}>{errorMessage ? errorMessage : ''}</p>
      </Card>
    </Container>
  );
};

export default SignIn;
