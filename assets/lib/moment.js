import momentjs from 'moment'
import { locale } from 'Root/server.config'

// Set the default locale.
momentjs.locale(locale)

export const moment = momentjs

/**
 * Convert month from num (0-11) to string (01-12).
 *
 * @param index Index of month.
 * @returns {string} Month value as string.
 */
export const monthToString = index => {
  let value = index + 1
  if (value < 10) value = `0${value}`
  return value
}

/**
 * Convert month from string (01-12) to num (0-11).
 *
 * @param str Month value as string.
 * @returns {number} Index of month.
 */
export const monthToIndex = str => (+str - 1)
