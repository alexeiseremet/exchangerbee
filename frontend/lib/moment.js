import momentjs from 'moment-timezone';
import { locale, timezone } from '../server.config';

// Set the default locale & timezone.
momentjs.locale(locale);
momentjs.tz.setDefault(timezone);

const moment = momentjs;

/**
 * Convert month from num (0-11) to string (01-12).
 *
 * @param index Index of month.
 * @returns {string} Month value as string.
 */
const monthToString = (index) => {
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
const monthToIndex = (str) => (+str - 1);

/**
 * Convert date from Timestamp to input[type=date] format or
 * create new Date (start of day).
 *
 * @returns {string} Date in YYYY-MM-DD format.
 */
const inputDate = (date = moment()) => (
  moment(+date).startOf('day').format('YYYY-MM-DD')
);

/**
 * Convert date from Timestamp to locale format or
 * create new Date (start of day).
 *
 * @returns {string} Date in locale format.
 */
const localeDate = (date = moment()) => (
  moment(+date).format('DD MMM YYYY')
);

/**
 * Get today date in Timestamp format.
 *
 * @returns {string} Today in UNIX format.
 */
const today = () => `${moment().startOf('day').valueOf()}`;

/**
 * Substract day in Timestamp format.
 *
 * @returns {string} Date in UNIX format.
 */
const xDaysAgo = (x = 1) => `${moment().subtract(x, 'days').startOf('day').valueOf()}`;

export {
  moment,
  monthToString,
  monthToIndex,
  inputDate,
  localeDate,
  today,
  xDaysAgo,
};
