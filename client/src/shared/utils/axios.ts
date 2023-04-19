import type { AxiosResponse } from 'axios';

export const isRequestOk = (res: AxiosResponse): boolean => {
  return res.status === 200;
};

export const isTokenInvalid = (res: AxiosResponse): boolean => {
  return res.status === 401;
};

export const is404 = (res: AxiosResponse): boolean => {
  return res.status === 404;
};
