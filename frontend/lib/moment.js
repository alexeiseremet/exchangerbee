import dayjsMod from 'dayjs';
import dayjsPluginUTC from 'dayjs/plugin/utc';
// import 'dayjs/locale/en';
import 'dayjs/locale/ro';
import 'dayjs/locale/ru';
// import 'dayjs/locale/uk';
import { locale, utcOffset } from '../server.config';

// Set the default locale & timezone.
dayjsMod.extend(dayjsPluginUTC);
dayjsMod.locale(locale);

const dayjs = (date, lng = locale) => {
  const dateAsNumber = typeof date === 'string' ? +date : date;
  const dateValue = date ? dateAsNumber : dayjsMod().utcOffset(utcOffset);
  return dayjsMod(dateValue).locale(lng);
};

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
 * create new Date.
 *
 * @returns {string} Date in YYYY-MM-DD format.
 */
const inputDate = (date, lng) => (
  dayjs(date, lng).format('YYYY-MM-DD')
);

/**
 * Convert date from Timestamp to locale format or
 * create new Date.
 *
 * @returns {string} Date in locale format.
 */
const localeDate = (date, lng) => (
  dayjs(date, lng).format('DD MMM YYYY')
);

/**
 * Get today date in Timestamp format.
 *
 * @returns {string} Today in UNIX format.
 */
const today = (lng) => dayjs(null, lng).format('YYYY-MM-DD');

/**
 * Substract day in Timestamp format.
 *
 * @returns {string} Date in UNIX format.
 */
const xDaysAgo = (x = 1, lng) => dayjs(null, lng).subtract(x, 'days').format('YYYY-MM-DD');

export {
  dayjs,
  monthToString,
  monthToIndex,
  inputDate,
  localeDate,
  today,
  xDaysAgo,
};
