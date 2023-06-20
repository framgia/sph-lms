import { useSession } from 'next-auth/react';
import { type FC, Fragment, type ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import { isPublicRoute } from '../shared/utils/helpers';
import Spinner from '../shared/components/Spinner';

interface AuthMiddlewareProps {
  children: ReactElement;
}

const AuthMiddleware: FC<AuthMiddlewareProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const { pathname, push } = useRouter();

  useEffect(() => {
    if (status !== 'loading' && !session && !isPublicRoute(pathname)) {
      void push('/auth/sign-in');
    }
  }, [session, status, pathname]);

  if (!session && !isPublicRoute(pathname)) return <Spinner />;

  return <Fragment>{children}</Fragment>;
};

export default AuthMiddleware;
