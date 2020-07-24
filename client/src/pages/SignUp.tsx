import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import axios from '../config/axios';
import { Container } from '../styles/Container';
import { Button, TextButton } from '../styles/Button';
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

const SignUp: React.FC = () => {
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const history = useHistory();

  const resetForm = (): void => {
    setName('');
    setEmail('');
    setPassword('');
  };

  const signupFail = (error: string): void => {
    setIsLoading(false);
    setErrorMessage(error);
    resetForm();
  };

  const signupSuccess = (): void => {
    setIsLoading(false);
    setErrorMessage('');
    resetForm();
    // make the user sign in
    history.push('/');
  };

  const signupHandler = async (): Promise<void> => {
    setIsLoading(true);
    const user = {
      name,
      email,
      password
    };
    try {
      await axios.post('/auth/signup', user);
      signupSuccess();
    } catch (error) {
      signupFail(error.response.data.message);
    }
  };

  return (
    <Container style={{ height: '100vh' }}>
      <Card>
        <h1>Create an account</h1>
        <Form>
          <Input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
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
            <Button bold onClick={signupHandler}>
              Sign up
            </Button>
          ) : (
            <Loader primary />
          )}
        </Form>
        <div style={{ marginTop: 12 }}>
          Already have an account?
          <TextButton onClick={() => history.push('/')}>Sign in</TextButton>
        </div>
        <p style={{ color: '#B71C1C' }}>{errorMessage ? errorMessage : ''}</p>
      </Card>
    </Container>
  );
};

export default SignUp;
