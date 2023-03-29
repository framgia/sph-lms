import API from '@/src/apis';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getUserToken } from '../utils';

export const useAuthMiddleware = (): any => {
  const router = useRouter();

  // we can modify this later for role specific routes
  // we can also add middleware for logout functionality
  if (getUserToken() !== null) {
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
  } else {
    useEffect(() => {
      if (router.asPath === '/home') {
        router.push('/');
      }
    }, []);
  }
};
