import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.6:3000/api/v1/',
  //baseURL: 'https://quickcard-io.herokuapp.com/api/v1/',
});

export default api;
