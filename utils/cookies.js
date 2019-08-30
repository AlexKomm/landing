import { parseCookies } from 'nookies';

export const getSessionCookie = ctx => {
  const cookies = parseCookies(ctx);

  const sessionCookie = Object.keys(cookies).reduce((value, cookieName) => {
    if (cookieName.indexOf('SESS') === 0) {
      return `${cookieName}=${cookies[cookieName]}`;
    }

    return value;
  }, '');

  return sessionCookie;
};

export default { getSessionCookie };
