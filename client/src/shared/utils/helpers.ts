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
  const regex =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return regex.test(link);
};

export const objectToFormData = (obj: Record<string, any>): FormData => {
  const formData = new FormData();

  for (const key in obj) {
    const value = obj[key];

    if (key === 'image' && (value === null || typeof value === 'string')) {
      continue;
    }

    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        let newValue = value[i];
        if (key === 'lessons') {
          const { id, ...rest } = value[i];
          newValue = rest;
        }
        formData.append(key, JSON.stringify(newValue));
      }
    } else formData.append(key, value);
  }

  return formData;
};
