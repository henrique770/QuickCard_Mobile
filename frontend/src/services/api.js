import axios from 'axios';

const api = axios.create({
  baseURL: 'http://191.33.145.98:3000/api/v1',
});

export default api;
