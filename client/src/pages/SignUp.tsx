import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import axios from '../config/axios';
import Container from '../styles/Container';
import Button from '../styles/Button';
import Loader from '../styles/Loader';

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

const SignUp: React.FC<{ signin: () => void }> = ({ signin }) => {
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const resetForm = (): void => {
    setName('');
    setEmail('');
    setPassword('');
  };

  const signupHandler = async (): Promise<void> => {
    const user = {
      name,
      email,
      password
    };
    try {
      const response = await axios.post('/auth/signup', user);
      console.log(response);
    } catch (error) {
      console.log(error.message);
      resetForm();
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
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
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
          <Button info bold onClick={signupHandler}>
            Sign up
          </Button>
        </Form>
        <Button outline bold onClick={() => signin()}>
          Already have an account? Sign in
        </Button>
        <Loader primary />
      </Card>
    </Container>
  );
};

export default SignUp;
