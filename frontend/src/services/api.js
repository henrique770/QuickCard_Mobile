import axios from 'axios';

const api = axios.create({
  baseURL: 'http://api-quickcard-io.umbler.net/api/v1',
});

export default api;
