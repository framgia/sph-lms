/* eslint-disable @typescript-eslint/no-floating-promises */
import API from '@/src/apis';
import { useRouter } from 'next/router';
import { getUserToken } from '../utils';
import { useEffect } from 'react';

export const useAuthMiddleware = (): void => {
  const router = useRouter();

  useEffect(() => {
    const token = getUserToken();

    if (token !== null) {
      const fetchData = async (): Promise<void> => {
        try {
          const user = await API.get('/auth/user');
          localStorage.setItem('user_full_name', user.data.full_name);
          localStorage.setItem('user_username', user.data.username);
          localStorage.setItem('user_email', user.data.email);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();

      if (router.asPath === '/' || router.asPath === '/auth/sign-in') {
        router.push('/home');
      }
    } else if (router.asPath !== '/' && router.asPath !== '/auth/sign-in') {
      router.push('/');
    }
  }, [router]);
};