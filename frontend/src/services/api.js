import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
  // baseURL: 'http://177.159.242.229:8080/',
});

export default api;
