import { useEffect } from 'react';
import Router from 'next/router';

export const useConfirmBeforeLeave = (
  unsavedChanges: boolean,
  message = 'Changes you made may not be saved, are you sure you want to leave?'
): void => {
  useEffect(() => {
    const routeChangeStart = (url: string): void => {
      if (Router.asPath !== url && unsavedChanges && !confirm(message)) {
        Router.events.emit('routeChangeError');
        void Router.replace(Router, Router.asPath);
        /* eslint-disable @typescript-eslint/no-throw-literal */
        throw 'Abort route change. Please ignore this error.';
      }
    };

    const beforeunload = (e: BeforeUnloadEvent): string | undefined => {
      if (unsavedChanges) {
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', beforeunload);
    Router.events.on('routeChangeStart', routeChangeStart);

    return () => {
      window.removeEventListener('beforeunload', beforeunload);
      Router.events.off('routeChangeStart', routeChangeStart);
    };
  }, [unsavedChanges]);
};
