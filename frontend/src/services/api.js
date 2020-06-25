import axios from 'axios';

const api = axios.create({
  baseURL: 'http://177.159.255.212:3000/api/v1',
});

export default api;
