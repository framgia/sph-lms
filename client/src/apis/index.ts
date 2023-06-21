/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: {
    Accept: 'application/json',
  },
});

export default API;
