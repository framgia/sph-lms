export const isSignedIn = (): boolean =>
  typeof localStorage !== 'undefined' &&
  localStorage.getItem('signedIn') === 'false';
