/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { alertError, alertSuccess } from '@/src/shared/utils';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useAuthSignIn = (): any => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | undefined>('');
  const [passwordError, setPasswordError] = useState<string | undefined>('');

  const handleSubmitEvent = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!email) {
      setEmailError('Email cannot be empty.');
    }
    if (!password) {
      setPasswordError('Password cannot be empty.');
    }
    if (email && password) {
      const postData = {
        username: email,
        password: password
      };

      try {
        const result = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/sign-in`,
          postData
        );
        localStorage.setItem('user_token', result.data.token);
        localStorage.setItem('signedIn', 'true');
        router.reload();
        alertSuccess('Login Successful');
      } catch (error) {
        console.log(error);

        alertError('Wrong Credentials');
      }
    }
  };

  const handleEmailChangeEvent = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handlePasswordChangeEvent = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  return {
    email,
    password,
    emailError,
    passwordError,
    handleSubmitEvent,
    handleEmailChangeEvent,
    handlePasswordChangeEvent
  };
};
