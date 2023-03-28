/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { Fragment } from 'react';
import Container from '@/src/shared/layouts/Container';
import Navbar from '@/src/shared/components/Navbar';
import { dropdownItems, navItems } from '../../demo/layouts/navbar';
import { useAuthSignIn } from '@/src/shared/hooks/useAuthSignIn';
const SignIn: React.FC = () => {
  const {
    email,
    password,
    emailError,
    passwordError,
    handleSubmitEvent,
    handleEmailChangeEvent,
    handlePasswordChangeEvent
  } = useAuthSignIn();

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
            <form onSubmit={handleSubmitEvent}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className={`border rounded py-2 px-3 w-full ${
                    emailError && 'border-red-500'
                  }`}
                  type="email"
                  id="email"
                  placeholder="E-mail"
                  value={email || ''}
                  onChange={handleEmailChangeEvent}
                />
                {emailError && (
                  <p className="text-red-500 mt-1">{emailError}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className={`border rounded py-2 px-3 w-full ${
                    passwordError && 'border-red-500'
                  }`}
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password || ''}
                  onChange={handlePasswordChangeEvent}
                />
                {passwordError && (
                  <p className="text-red-500 mt-1">{passwordError}</p>
                )}
              </div>
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
