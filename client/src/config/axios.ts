import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.common = {
  'Content-Type': 'application/json'
};

export default axios;
