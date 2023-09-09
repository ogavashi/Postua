import { parseCookies, setCookie } from 'nookies';

export const themeCookie = {
  set: (locale: string) => setCookie(null, 'POSTUA_THEME', locale, { path: '/' }),
  get: () => parseCookies()['POSTUA_THEME'],
};
