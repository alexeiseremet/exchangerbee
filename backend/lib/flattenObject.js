const isPlainObject = require('lodash/isPlainObject');

const flattenObject = (obj) => {
  const flatten = {};

  if (obj) {
    Object.keys(obj).forEach((key) => {
      if (isPlainObject(obj[key])) {
        const subObj = flattenObject(obj[key]);

        Object.keys(subObj).forEach((soKey) => {
          flatten[`${key}.${soKey}`] = subObj[soKey];
        });
      } else {
        flatten[key] = obj[key];
      }
    });
  }

  return flatten;
};

module.exports = flattenObject;
