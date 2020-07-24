import React from 'react';

export interface UserObject {
  name: String;
  email: String;
  token: String;
}

interface UseAuth {
  user: UserObject;
  saveUser: (user: UserObject) => void;
  logout: () => void;
}

const useAuth = (): UseAuth => {
  const [user, setUser] = React.useState(() => {
    try {
      const item = window.localStorage.getItem('user') as string;
      // if the item is an empty string, return empty object
      return item ? JSON.parse(item) : {};
    } catch (error) {
      // if there is an error, return empty object
      console.log(error);
      return {};
    }
  });

  const saveUser = (userObject: UserObject): void => {
    setUser(userObject);
    const item = JSON.stringify(userObject);
    window.localStorage.setItem('user', item);
  };

  const logout = (): void => {
    setUser({});
    window.localStorage.removeItem('user');
  };

  return { user, saveUser, logout };
};

export default useAuth;
