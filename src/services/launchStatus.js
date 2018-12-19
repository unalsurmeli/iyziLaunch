import axios from 'axios';
import { URI_LAUNCHES_STATUS } from './api';

export default axios.create({
  baseURL: `${URI_LAUNCHES_STATUS}`
  //,headers:{}
});
