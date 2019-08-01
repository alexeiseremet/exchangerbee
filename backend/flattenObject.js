const _isPlainObject = require('lodash/isPlainObject');

function flattenObject(obj) {
  let flatten = {};

  for (let o in obj) {
    if (obj.hasOwnProperty(o) && _isPlainObject(obj[o])) {
      let subObj = flattenObject(obj[o]);

      for (let so in subObj) {
        if (subObj.hasOwnProperty(so)) {
          flatten[o + '.' + so] = subObj[so];
        }
      }
    } else {
      flatten[o] = obj[o];
    }
  }

  return flatten;
}

module.exports = flattenObject;
