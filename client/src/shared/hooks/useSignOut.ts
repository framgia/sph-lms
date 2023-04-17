/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  alertError,
  alertSuccess,
  getUserToken,
  removeLocalStorage
} from '@/src/shared/utils';
import { useRouter } from 'next/router';
import axios from 'axios';

export const useSignOut = (): any => {
  const router = useRouter();
  const onSignOutEvent = async () => {
    try {
      const token = getUserToken();
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/sign-out`,
        null,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );
      removeLocalStorage();
      router.reload();
      alertSuccess('Logout Successful');
    } catch (error) {
      console.error('Error logging out:', error);
      alertError('Logout Unsucessful');
    }
  };
  return {
    onSignOutEvent
  };
};
