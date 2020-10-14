import axios from 'axios';
import * as ConstantsBusiness from '~/constants/ConstantsBusiness'

const api = axios.create({
  baseURL: ConstantsBusiness.Url,
});

export default api;
