import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

let user;

try {
  user = JSON.parse(window.localStorage.getItem('user') as string);
  axios.defaults.headers.common = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user.token}`
  };
} catch (error) {
  user = {};
  axios.defaults.headers.common = {
    'Content-Type': 'application/json'
  };
}

export default axios;
