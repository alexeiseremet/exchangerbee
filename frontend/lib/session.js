const Cookies = require('js-cookie');
const JWtoken = require('jsonwebtoken');

const AUTH_SECRET = process.env.JWT_SECRET || 'browser';
const AUTH_COOKIE_NAME = 'xeUserData';

/**
 * Set cookies from the browser.
 *
 * @param {string} key Cookie name.
 * @param {string} value Cookie value.
 * @param {number} day Cookie life time.
 */
const setCookie = (key, value, day = 1) => {
  if (process.browser) {
    Cookies.set(key, value, {
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
  const cookieByKey = (
    rawCookie.split(';').find((c) => c.trim().startsWith(`${key}=`))
  );

  if (!cookieByKey) {
    return undefined;
  }

  return cookieByKey.split('=')[1];
};

/**
 * Remove cookies from the browser.
 *
 * @param {string} key Cookie name.
 */
const removeCookie = (key) => (
  process.browser && Cookies.remove(key)
);

/**
 * Get cookies from the browser or the server.
 *
 * @param {string} key Cookie name.
 * @param {Object} req Received server request.
 * @returns {string} Return cookie.
 */
const getCookie = (key, req) => (
  process.browser
    ? Cookies.get(key)
    : getCookieFromServer(key, req)
);

/**
 * Load User data from Cookie.
 *
 * @param {Object} req Received server request.
 * @returns Object} User data.
 */
const getUserCookie = (req = null) => {
  const userJwt = getCookie(AUTH_COOKIE_NAME, req);

  if (userJwt) {
    return JWtoken.verify(userJwt, AUTH_SECRET);
  }

  return undefined;
};

/**
 * Save User data into Cookie.
 *
 * @param {Object} data User data to save.
 */
const setUserCookie = (data) => {
  const dataJwt = JWtoken.sign(data, AUTH_SECRET, { expiresIn: '30d' });
  setCookie(AUTH_COOKIE_NAME, dataJwt, 30);
};

/**
 * Update User Cookie data.
 *
 * @param {Object} newUserData Updated user data.
 */
const updateUserCookie = (newUserData) => {
  const userData = { ...getUserCookie() };

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

  setUserCookie(userData);
  // Reload page after cookie update.
  if (process.browser) {
    window.location.reload();
  }

  return undefined;
};

/**
 * Remove User Cookie.
 */
const removeUserCookie = () => {
  removeCookie(AUTH_COOKIE_NAME);
  // Reload page after logout.
  if (process.browser) {
    window.location.reload();
  }

  return undefined;
};

const isUserLogged = (req) => {
  const userJwt = getCookie(AUTH_COOKIE_NAME, req);
  let isLogged = false;

  try {
    isLogged = !!userJwt && JWtoken.verify(userJwt, AUTH_SECRET);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  return isLogged;
};

module.exports = {
  setCookie,
  getCookie,
  removeCookie,
  setUserCookie,
  getUserCookie,
  updateUserCookie,
  removeUserCookie,
  isUserLogged,
};
