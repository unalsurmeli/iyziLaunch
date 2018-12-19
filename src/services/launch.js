import axios from 'axios';
import { URI_LAUNCHES } from './api';

export default axios.create({
  baseURL: `${URI_LAUNCHES}`
  //,headers:{}
});
