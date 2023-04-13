/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useForm, type SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import {
  type AuthFormInput,
  alertError,
  alertSuccess
} from '@/src/shared/utils';
import { useRouter } from 'next/router';

export const useAuthSignIn = (): any => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthFormInput>();

  const onSubmit: SubmitHandler<AuthFormInput> = async (
    data: AuthFormInput
  ): Promise<void> => {
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/sign-in`,
        data
      );
      localStorage.setItem('user_token', result.data.token);
      localStorage.setItem('signedIn', 'true');
      router.reload();
      alertSuccess('Login Successful');
    } catch (error) {
      console.log(error);

      alertError('Wrong Credentials');
    }
  };

  return {
    onSubmit,
    handleSubmit,
    register,
    errors
  };
};
