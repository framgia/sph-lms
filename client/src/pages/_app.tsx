import React, { Fragment } from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Navbar from '../shared/components/Navbar';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { store } from '@/src/redux/store';
import { SessionProvider } from 'next-auth/react';
import { isPublicRoute } from '../shared/utils/helpers';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const App: React.FunctionComponent<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  const { pathname } = useRouter();

  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <AuthMiddleware>
          <Fragment>
            {!isPublicRoute(pathname) && <Navbar />}
            <Component {...pageProps} />
          </Fragment>
        </AuthMiddleware>
      </SessionProvider>
      <ToastContainer />
    </Provider>
  );
};

export default App;
