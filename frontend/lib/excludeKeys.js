import {
  omit as _omit,
  isArray as _isArray,
  isObject as _isObject,
  isPlainObject as _isPlainObject,
  mapValues as _mapValues,
} from 'lodash';

const mapValuesDeep = (obj, unsetValues) => {
  if (_isArray(obj)) {
    return obj.map(innerObj => {
      const clearedVal = _omit(innerObj, unsetValues);
      return mapValuesDeep(clearedVal, unsetValues);
    })
  }

  if (_isObject(obj)) {
    return _mapValues(obj, val => {
      const clearedVal = _isPlainObject(val) ? _omit(val, unsetValues) : val;
      return mapValuesDeep(clearedVal, unsetValues);
    })
  }

  return obj;
};

export default (obj, values) => {
  const clearedObj = _omit(obj, values);
  return mapValuesDeep(clearedObj, values);
}
