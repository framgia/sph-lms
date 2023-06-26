import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAuthorized } from './shared/utils/helpers';

export const middleware = async (request: NextRequest): Promise<NextResponse | undefined> => {
  const session = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  const isTrainer = session?.user?.is_trainer ?? false;

  if (session && !isAuthorized(isTrainer, pathname)) {
    return NextResponse.redirect(new URL('/404', request.url));
  }
};

export const config = {
  matcher: ['/trainer/:path*', '/trainee/:path*'],
};
