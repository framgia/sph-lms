import React, { Fragment } from 'react';
import Container from '@/src/shared/layouts/Container';
import Navbar from '@/src/shared/components/Navbar';
import { dropdownItems, navItems } from '../../demo/layouts/navbar';
import { useAuthSignIn } from '@/src/shared/hooks/useAuthSignIn';
import RFInputField from '@/src/shared/components/ReactForm/RFInputField';

const SignIn: React.FC = () => {
  const { onSubmit, handleSubmit, register, errors } = useAuthSignIn();

  return (
    <Fragment>
      <Navbar navItems={navItems} dropdownItems={dropdownItems} />
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <Container>
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-auto">
            <h1 className="flex justify-center text-3xl font-medium mb-4 mb-5 text-sky-800">
              Sign in
            </h1>
            <hr className="mb-5 pb-8" />
            <form onSubmit={handleSubmit(onSubmit)}>
              <RFInputField
                label="Email"
                {...register('email', { required: true, pattern: /@/ })}
                error={
                  errors.email !== undefined &&
                  'This field is required and must be an email address.'
                }
              />
              <RFInputField
                label="Password"
                type="password"
                {...register('password', { required: true })}
                error={
                  errors.password !== undefined && 'This field is required'
                }
              />
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mt-5">
                Log in
              </button>
            </form>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

export default SignIn;
