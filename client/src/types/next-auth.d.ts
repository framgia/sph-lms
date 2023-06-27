/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { type Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session extends Session {
    user: {
      id: number;
      first_name: string;
      last_name: string;
      name: string;
      email: string;
      image: string | null;
      trainer_id: null | number;
      is_trainer: boolean;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends JWT, Session {}
}
