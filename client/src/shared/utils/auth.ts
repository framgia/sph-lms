export const isSignedIn = (): boolean =>
  typeof localStorage !== 'undefined' &&
  localStorage.getItem('signedIn') === 'true';

export const getUserToken = (): string | null => {
  if (
    typeof localStorage !== 'undefined' &&
    localStorage.getItem('user_token') !== undefined
  ) {
    return localStorage.getItem('user_token');
  } else {
    return null;
  }
};

export const getUserFullName = (): string | null => {
  if (
    typeof localStorage !== 'undefined' &&
    localStorage.getItem('user_token') !== undefined
  ) {
    return localStorage.getItem('user_full_name');
  } else {
    return null;
  }
};
