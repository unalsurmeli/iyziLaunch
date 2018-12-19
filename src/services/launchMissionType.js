import axios from 'axios';
import { URI_LAUNCHES_MISSION_TYPE } from './api';

export default axios.create({
  baseURL: `${URI_LAUNCHES_MISSION_TYPE}`
  //,headers:{}
});
