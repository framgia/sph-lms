/* eslint-disable @typescript-eslint/no-floating-promises */
import API from '@/src/apis';
import { useRouter } from 'next/router';
import {
  getUserToken,
  isTokenInvalid,
  removeLocalStorage,
  setLocalStorage
} from '../utils';
import { useEffect } from 'react';

export const useAuthMiddleware = (): void => {
  const router = useRouter();

  useEffect(() => {
    const token = getUserToken();

    if (token !== null) {
      const fetchData = async (): Promise<void> => {
        try {
          const user = await API.get('/auth/user');
          setLocalStorage(user);
        } catch (error: any) {
          console.log(error);
          if (isTokenInvalid(error.response)) {
            removeLocalStorage();
            router.reload();
          }
        }
      };

      fetchData();

      if (router.asPath === '/' || router.asPath === '/auth/sign-in') {
        router.push('/home');
      }
    } else if (router.asPath !== '/' && router.asPath !== '/auth/sign-in' && router.asPath !== '/auth/old') { //! Remove `router.asPath !== '/auth/old'` after google sign in integration
      router.push('/');
    }
  }, [router]);
};
