export const removeLocalStorage = (): void => {
  localStorage.removeItem('user_token');
  localStorage.removeItem('user_full_name');
  localStorage.removeItem('user_username');
  localStorage.removeItem('user_email');
  localStorage.setItem('signedIn', 'false');
};

export const setLocalStorage = (data: any): void => {
  localStorage.setItem('signedIn', 'true');

  if (data.data.token !== undefined) {
    localStorage.setItem('user_token', data.data.token);
  }

  if (data.data.email !== undefined) {
    localStorage.setItem('user_full_name', data.data.full_name);
    localStorage.setItem('user_username', data.data.username);
    localStorage.setItem('user_email', data.data.email);
  }
};
