import dayjsMod from 'dayjs';
import dayjsPluginUTC from 'dayjs/plugin/utc';
import { locale, utcOffset } from '../server.config';

const localDateFiles = {
  en: locale === 'en' && require('dayjs/locale/en'),
  ro: locale === 'ro' && require('dayjs/locale/ro'),
  ru: locale === 'ru' && require('dayjs/locale/ru'),
  uk: locale === 'uk' && require('dayjs/locale/uk'),
};

// Set the default locale & timezone.
dayjsMod.extend(dayjsPluginUTC);
dayjsMod.locale(localDateFiles[locale]);

const dayjs = (date = new Date()) => dayjsMod(+date).utcOffset(utcOffset);

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
const inputDate = (date) => (
  dayjs(date).startOf('day').format('YYYY-MM-DD')
);

/**
 * Convert date from Timestamp to locale format or
 * create new Date (start of day).
 *
 * @returns {string} Date in locale format.
 */
const localeDate = (date) => (
  dayjs(date).format('DD MMM YYYY')
);

/**
 * Get today date in Timestamp format.
 *
 * @returns {string} Today in UNIX format.
 */
const today = () => `${dayjs().startOf('day').valueOf()}`;

/**
 * Substract day in Timestamp format.
 *
 * @returns {string} Date in UNIX format.
 */
const xDaysAgo = (x = 1) => `${dayjs().subtract(x, 'days').startOf('day').valueOf()}`;

export {
  dayjs,
  monthToString,
  monthToIndex,
  inputDate,
  localeDate,
  today,
  xDaysAgo,
};
