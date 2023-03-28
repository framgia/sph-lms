/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios from 'axios';
import { getUserToken } from '@/src/shared/utils';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    Authorization: `Token ${getUserToken() ?? ''}`
  }
});

export default API;
