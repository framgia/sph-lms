/* eslint-disable @typescript-eslint/no-namespace */
import API from '@/src/apis';
import jwt from 'jsonwebtoken';

export const isSignedIn = (): boolean =>
  typeof localStorage !== 'undefined' && localStorage.getItem('signedIn') === 'true';

export const getUserToken = (): string | null => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('user_token') !== undefined) {
    return localStorage.getItem('user_token');
  } else {
    return null;
  }
};

export const getUserFullName = (): string | null => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('user_token') !== undefined) {
    return localStorage.getItem('user_full_name');
  } else {
    return null;
  }
};

export namespace JwtUtils {
  export const isJwtExpired = (token: string): boolean => {
    const currentTime = Math.round(Date.now() / 1000 + 60);
    const decoded = jwt.decode(token);

    if (decoded instanceof Object) {
      if ('exp' in decoded) {
        const adjustedExpiry = decoded.exp;

        if ((adjustedExpiry as number) < currentTime) {
          return true;
        }
        return false;
      }
    }
    return true;
  };
}

export namespace NextAuthUtils {
  export const refreshAuthToken = async function (
    accessToken: string,
    refreshToken: string
  ): Promise<any[]> {
    try {
      const response = await API.post('api/auth/google/', {
        access: accessToken,
        refresh: refreshToken,
      });

      if ('error' in response) {
        throw new Error('Something went wrong');
      }

      const { access, refresh } = response.data;

      return [access, refresh];
    } catch {
      return [null, null];
    }
  };
}
