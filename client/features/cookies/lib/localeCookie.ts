import { parseCookies, setCookie } from 'nookies';

export const localeCookie = {
  set: (locale: string) => setCookie(null, 'NEXT_LOCALE', locale, { path: '/' }),
  get: () => parseCookies()['NEXT_LOCALE'],
};
