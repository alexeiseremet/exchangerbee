import cookie from 'js-cookie';
import jwtoken from 'jsonwebtoken';

export const AUTH_SECRET = 'browser';
export const AUTH_COOKIE_NAME = 'userData';

/**
 * Set cookies from the browser.
 *
 * @param {string} key Cookie name.
 * @param {string} value Cookie value.
 * @param {number} day Cookie life time.
 */
export const setCookie = (key, value, day = 1) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: day,
      path: '/',
    });
  }
};

/**
 * Function that extract cookie from server.
 *
 * @param {string} key Cookie name.
 * @param {Object} req Received server request.
 * @returns {string} Return cookie.
 */
const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie;

  rawCookie.split(';').find((c) => c.trim().startsWith(`${key}=`));

  if (!rawCookie) {
    return undefined;
  }

  return rawCookie.split('=')[1];
};

/**
 * Remove cookies from the browser.
 *
 * @param {string} key Cookie name.
 */
export const removeCookie = (key) => (
  process.browser && cookie.remove(key)
);

/**
 * Get cookies from the browser or the server.
 *
 * @param {string} key Cookie name.
 * @param {Object} req Received server request.
 * @returns {string} Return cookie.
 */
export const getCookie = (key, req) => (process.browser
  ? cookie.get(key)
  : getCookieFromServer(key, req));

/**
 * Load User data from Cookie.
 *
 * @param {Object} req Received server request.
 * @returns Object} User data.
 */
export const loadUserCookie = (req = null) => {
  const userJwt = getCookie(AUTH_COOKIE_NAME, req);

  if (userJwt) {
    return jwtoken.verify(userJwt, AUTH_SECRET);
  }

  return undefined;
};

/**
 * Save User data into Cookie.
 *
 * @param {Object} data User data to save.
 */
export const saveUserCookie = (data) => {
  const dataJwt = jwtoken.sign(data, AUTH_SECRET, { expiresIn: '30d' });
  setCookie(AUTH_COOKIE_NAME, dataJwt, 30);
};

/**
 * Update User Cookie data.
 *
 * @param {Object} newUserData Updated user data.
 */
export const updateUserCookie = (newUserData) => {
  const userData = { ...loadUserCookie() };

  try {
    Object.keys(newUserData).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(userData.user, key)) {
        userData.user[key] = newUserData[key];
      }
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  saveUserCookie({ jwt: userData.jwt, user: userData.user });
  // Reload page after cookie update.
  if (process.browser) {
    window.location.reload();
  }

  return undefined;
};

/**
 * Remove User Cookie.
 */
export const removeUserCookie = () => {
  removeCookie(AUTH_COOKIE_NAME);
  // Reload page after logout.
  if (process.browser) {
    window.location.reload();
  }

  return undefined;
};

export const isUserLogged = (req) => {
  const userJwt = getCookie(AUTH_COOKIE_NAME, req);
  let isLogged = false;

  try {
    isLogged = !!userJwt && jwtoken.verify(userJwt, AUTH_SECRET);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  return isLogged;
};
