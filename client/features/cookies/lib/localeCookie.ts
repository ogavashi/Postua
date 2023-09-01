import { parseCookies, setCookie } from 'nookies';

export const localeCookie = {
  set: (locale: string) => setCookie(null, 'NEXT_LOCALE', locale),
  get: () => parseCookies()['NEXT_LOCALE'],
};
