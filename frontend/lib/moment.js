import momentjs from 'moment'
import { locale } from '../server.config'

// Set the default locale.
momentjs.locale(locale);

export const moment = momentjs;

/**
 * Convert month from num (0-11) to string (01-12).
 *
 * @param index Index of month.
 * @returns {string} Month value as string.
 */
export const monthToString = index => {
  let value = index + 1;
  if (value < 10) value = `0${value}`;

  return value;
};

/**
 * Convert month from string (01-12) to num (0-11).
 *
 * @param str Month value as string.
 * @returns {number} Index of month.
 */
export const monthToIndex = str => (+str - 1);

/**
 * Convert date from Timestamp to input[type=date] format or
 * create new Date (start of day).
 *
 * @returns {string} Date in YYYY-MM-DD format.
 */
export const inputDate = (date = new Date()) => (
  moment(+date).utcOffset(0).startOf('day').format('YYYY-MM-DD')
);

/**
 * Convert date from Timestamp to locale format or
 * create new Date (start of day).
 *
 * @returns {string} Date in locale format.
 */
export const localeDate = (date = new Date()) => (
  moment(+date).utcOffset(0).format('DD MMM YYYY')
);


/**
 * Get today date in Timestamp format.
 *
 * @returns {string} Today in UNIX format.
 */
export const today = () => `${moment().utcOffset(0).startOf('day').valueOf()}`;
