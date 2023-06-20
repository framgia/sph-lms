/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/space-before-function-paren */

import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import type { AuthenticatedUser } from '@/src/shared/utils/interface';
import { JwtUtils, NextAuthUtils } from '@/src/shared/utils';
import API from '@/src/apis';

export const settings = (req: NextApiRequest, res: NextApiResponse) => ({
  pages: {
    signIn: '/auth/sign-in',
  },
  session: {
    maxAge: 24 * 60 * 60,
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          prompt: 'consent',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }: { user: AuthenticatedUser; token: any; account: any }) {
      if (user) {
        if (account?.provider === 'google') {
          const { id_token } = account;
          if (!/^[A-Za-z0-9._%+-]+@sun-asterisk.com$/.test(user?.email ?? '')) {
            const error = { error: 'Email does not match Sun Asterisk domain name' };
            return error;
          }

          try {
            const response = await API.post('api/auth/google/', { access_token: id_token });
            user = { ...user, ...response.data.user };

            if (response) {
              const cookies = response.headers['set-cookie'];
              res.setHeader('Set-Cookie', cookies as string[]);

              const { access, refresh } = response.data;

              token = {
                ...token,
                accessToken: access,
                refreshToken: refresh,
                user,
              };

              return token;
            }
          } catch (err) {
            return null;
          }
        }
      }

      if (token && JwtUtils.isJwtExpired(token?.accessToken as string)) {
        const [newAccessToken, newRefreshToken] = await NextAuthUtils.refreshAuthToken(
          token.refreshToken,
          token.refreshToken
        );

        if (newAccessToken && newRefreshToken) {
          token = {
            ...token,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000 + 2 * 60 * 60),
          };

          return token;
        }

        return {
          ...token,
          exp: 0,
        };
      }

      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token.error) {
        return token.error;
      }

      session.accessToken = token?.accessToken;
      session.user = token?.user;

      if (!session) {
        res.redirect('/auth/sign-in');
      }

      return session;
    },
  },
});

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, settings(req, res));
