import axios from 'axios';

const api = axios.create({
  baseURL: 'https://quickcard-io.herokuapp.com/api/v1/',
});

export default api;
