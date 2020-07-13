import axios from 'axios';

const user = JSON.parse(window.localStorage.getItem('user') as string);

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.common = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${user.token}`
};

export default axios;
