const isPlainObject = require('lodash/isPlainObject');

function flattenObject(obj) {
  const flatten = {};

  Object.keys(obj).forEach((o) => {
    if (Object.prototype.hasOwnProperty.call(obj, o) && isPlainObject(obj[o])) {
      const subObj = flattenObject(obj[o]);

      Object.keys(subObj).forEach((so) => {
        if (Object.prototype.hasOwnProperty.call(subObj, so)) {
          flatten[`${o}.${so}`] = subObj[so];
        }
      });
    } else {
      flatten[o] = obj[o];
    }
  });

  return flatten;
}

module.exports = flattenObject;
