import axios from 'axios';

const api = axios.create({
  baseURL: 'http://177.17.243.187:3000/api/v1',
});

export default api;
