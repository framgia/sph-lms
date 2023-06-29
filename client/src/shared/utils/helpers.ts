/* eslint-disable @typescript-eslint/naming-convention */

export const MAX_FILE_SIZE = 3145728; // 3MB

export const validFileExtensions = {
  image: ['jpg', 'png', 'jpeg', 'webp'],
};

export const isValidFileType = (fileName: string, fileType: string): boolean => {
  return (
    !!fileName &&
    validFileExtensions[fileType as keyof typeof validFileExtensions].includes(
      fileName.split('.').pop() as string
    )
  );
};

const publicRoutes = ['/auth/sign-in', '/404', '/500'];

export const isPublicRoute = (path: string): boolean => {
  return publicRoutes.some((route) => route === path);
};

export const getCookie = (cookieName: string): string | undefined => {
  const cookieArray = document.cookie.split(';');

  for (const cookie of cookieArray) {
    let cookieString = cookie;

    while (cookieString.charAt(0) === ' ') {
      cookieString = cookieString.substring(1, cookieString.length);
    }
    if (cookieString.indexOf(cookieName + '=') === 0) {
      return cookieString.substring(cookieName.length + 1, cookieString.length);
    }
  }

  return undefined;
};

export const isAuthorized = (is_trainer: boolean, pathname: string): boolean => {
  const slug = is_trainer ? 'trainer' : 'trainee';
  const regex = new RegExp(`^/(${slug}.+)`);
  return regex.test(pathname);
};

export const isYoutubeLink = (link: string): boolean => {
  return link.startsWith('https://www.youtube.com');
};
