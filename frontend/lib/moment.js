import dayjsMod from 'dayjs';
import dayjsPluginUTC from 'dayjs/plugin/utc';
import enLocale from 'dayjs/locale/en';
import roLocale from 'dayjs/locale/ro';
import ruLocale from 'dayjs/locale/ru';
import ukLocale from 'dayjs/locale/uk';
import { locale, utcOffset } from '../server.config';

const localDateFiles = {
  en: locale === 'en' && enLocale,
  ro: locale === 'ro' && roLocale,
  ru: locale === 'ru' && ruLocale,
  uk: locale === 'uk' && ukLocale,
};

// Set the default locale & timezone.
dayjsMod.extend(dayjsPluginUTC);
dayjsMod.locale(localDateFiles[locale]);

const dayjs = (date) => {
  const dateValue = +date || dayjsMod().utcOffset(utcOffset);
  return dayjsMod(dateValue);
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
