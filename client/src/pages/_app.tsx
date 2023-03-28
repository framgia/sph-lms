import React, { Fragment } from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useAuthMiddleware } from '@/src/shared/hooks/useAuthMiddleware';

const App: React.FunctionComponent<AppProps> = ({
  Component,
  pageProps
}: AppProps) => {
  useAuthMiddleware();

  return (
    <Fragment>
      <Component {...pageProps} />
      <ToastContainer />
    </Fragment>
  );
};

export default App;
